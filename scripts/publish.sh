#!/bin/bash
set -e

# Usage: ./scripts/publish.sh [tag-name] [--rc] [--bump patch|minor|major]
#
# Examples:
#   ./scripts/publish.sh                       # Publish current version with branch name as tag
#   ./scripts/publish.sh main                  # Publish current version with "main" tag
#   ./scripts/publish.sh feature-xyz --rc      # Publish RC version (0.0.5-rc.abc1234) with "feature-xyz" tag
#   ./scripts/publish.sh --rc                  # Publish RC version with branch name as tag
#   ./scripts/publish.sh main --bump patch     # Bump patch version, commit, push, and publish with "main" tag

TAG_NAME=""
RC_MODE=false
BUMP_TYPE=""

# Parse arguments
while [[ $# -gt 0 ]]; do
  case $1 in
    --rc|--release-candidate)
      RC_MODE=true
      shift
      ;;
    --bump)
      BUMP_TYPE="$2"
      if [[ ! "$BUMP_TYPE" =~ ^(patch|minor|major)$ ]]; then
        echo "❌ Error: --bump must be followed by patch, minor, or major"
        exit 1
      fi
      shift 2
      ;;
    *)
      TAG_NAME="$1"
      shift
      ;;
  esac
done

# Validate: can't use both --rc and --bump
if [ "$RC_MODE" = true ] && [ -n "$BUMP_TYPE" ]; then
  echo "❌ Error: Cannot use --rc and --bump together"
  exit 1
fi

# Check for uncommitted changes (skip in CI)
if [ -z "$CI" ]; then
  if [ -n "$(git status --porcelain)" ]; then
    echo "❌ Error: You have uncommitted changes."
    echo ""
    git status --short
    echo ""
    echo "Please commit or stash your changes before publishing."
    exit 1
  fi
fi

# Get the current version from package.json
CURRENT_VERSION=$(node -p "require('./package.json').version")

# Determine tag name if not provided
if [ -z "$TAG_NAME" ]; then
  if [ -n "$GITHUB_HEAD_REF" ]; then
    # PR: use source branch
    TAG_NAME=$(echo "$GITHUB_HEAD_REF" | sed 's/[^a-zA-Z0-9.-]/-/g')
  elif [ -n "$GITHUB_REF_NAME" ]; then
    # Push: use target branch
    TAG_NAME=$(echo "$GITHUB_REF_NAME" | sed 's/[^a-zA-Z0-9.-]/-/g')
  else
    # Local: use current branch
    TAG_NAME=$(git rev-parse --abbrev-ref HEAD | sed 's/[^a-zA-Z0-9.-]/-/g')
  fi
fi

# Determine version to publish
if [ -n "$BUMP_TYPE" ]; then
  # Bump version, commit, and tag
  echo "Bumping $BUMP_TYPE version..."
  npm version "$BUMP_TYPE" -m "chore: release %s"
  PUBLISH_VERSION=$(node -p "require('./package.json').version")

  # Push the commit and tag
  echo "Pushing version commit and tag..."
  git push --follow-tags
elif [ "$RC_MODE" = true ]; then
  # Extract base version (remove any existing prerelease suffix)
  BASE_VERSION=$(echo "$CURRENT_VERSION" | sed 's/-.*$//')
  SHORT_HASH=$(git rev-parse --short HEAD)
  PUBLISH_VERSION="${BASE_VERSION}-rc.${SHORT_HASH}"
else
  PUBLISH_VERSION="$CURRENT_VERSION"
fi

echo ""
echo "Version: $PUBLISH_VERSION"
echo "Tag: $TAG_NAME"
echo "Bump: ${BUMP_TYPE:-none}"
echo "RC Mode: $RC_MODE"
echo ""

# Update package.json version if different (for RC mode)
if [ "$RC_MODE" = true ]; then
  npm version "$PUBLISH_VERSION" --no-git-tag-version
fi

# Build the package (skip if already built in CI)
if [ -z "$CI" ]; then
  npm run build
fi

# Function to restore package.json (only locally, only for RC mode)
restore_package_json() {
  if [ -z "$CI" ] && [ "$RC_MODE" = true ]; then
    echo ""
    npm version "$CURRENT_VERSION" --no-git-tag-version --allow-same-version
    echo "Restored package.json to version $CURRENT_VERSION"
  fi
}

# Ensure we restore package.json on exit (success or failure)
trap restore_package_json EXIT

# Publish
npm publish --tag "$TAG_NAME"

echo ""
echo "✅ Published @braver/ofys-api@$PUBLISH_VERSION"
echo ""
echo "To install this version:"
echo "  npm install @braver/ofys-api@$PUBLISH_VERSION"
echo "  npm install @braver/ofys-api@$TAG_NAME"

