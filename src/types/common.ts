import { Static, TSchema, Type } from '@sinclair/typebox';
import { FormatRegistry } from '@sinclair/typebox';

// ============================================================================
// Format Registration
// ============================================================================

const UUID_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;
const DATE_TIME_REGEX =
  /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})?$/;
const URI_REGEX = /^[a-zA-Z][a-zA-Z0-9+.-]*:/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Registers custom TypeBox formats for validation.
 * Call this function once at application startup before using TypeBox validation.
 *
 * Registered formats:
 * - `uuid`: UUID v4 format (e.g., "550e8400-e29b-41d4-a716-446655440000")
 * - `date`: ISO 8601 date format (e.g., "2024-01-15")
 * - `date-time`: ISO 8601 date-time format (e.g., "2024-01-15T10:30:00Z")
 * - `uri`: URI format (e.g., "https://example.com")
 * - `email`: Email format (e.g., "user@example.com")
 * - `byte`: Base64 encoded string
 */
export function registerTypes(): void {
  // UUID format
  if (!FormatRegistry.Has('uuid')) {
    FormatRegistry.Set('uuid', (value) => UUID_REGEX.test(value));
  }

  // ISO 8601 date format (YYYY-MM-DD)
  if (!FormatRegistry.Has('date')) {
    FormatRegistry.Set('date', (value) => {
      if (!DATE_REGEX.test(value)) return false;
      const date = new Date(value);
      return !isNaN(date.getTime());
    });
  }

  // ISO 8601 date-time format
  if (!FormatRegistry.Has('date-time')) {
    FormatRegistry.Set('date-time', (value) => {
      if (!DATE_TIME_REGEX.test(value)) return false;
      const date = new Date(value);
      return !isNaN(date.getTime());
    });
  }

  // URI format
  if (!FormatRegistry.Has('uri')) {
    FormatRegistry.Set('uri', (value) => URI_REGEX.test(value));
  }

  // Email format
  if (!FormatRegistry.Has('email')) {
    FormatRegistry.Set('email', (value) => EMAIL_REGEX.test(value));
  }

  // Base64 encoded string (byte format)
  if (!FormatRegistry.Has('byte')) {
    FormatRegistry.Set('byte', (value) => {
      try {
        // Check if string is valid base64
        return /^[A-Za-z0-9+/]*={0,2}$/.test(value) && value.length % 4 === 0;
      } catch {
        return false;
      }
    });
  }
}

export const Nullable = <T extends TSchema>(schema: T) =>
  Type.Union([schema, Type.Null()]);

/**
 * Common types shared across Braver APIs
 */

// ============================================================================
// Gender/Sexe Types
// ============================================================================

export const Gender = Type.Union([
  Type.Literal('M'),
  Type.Literal('F'),
  Type.Literal('O'),
  Type.Literal('NA'),
]);
export type Gender = Static<typeof Gender>;

export const GENDER_VALUES: readonly Gender[] = ['M', 'F', 'O', 'NA'] as const;

/**
 * Gender labels in French
 */
export const GENDER_LABELS_FR: { [K in Gender]: string } = {
  M: 'Masculin',
  F: 'Féminin',
  O: 'Autre/Neutre',
  NA: 'Non applicable',
};

/**
 * Gender labels in English
 */
export const GENDER_LABELS_EN: { [K in Gender]: string } = {
  M: 'Masculine',
  F: 'Feminine',
  O: 'Other/Neutral',
  NA: 'Not applicable',
};

// ============================================================================
// Profession Types
// ============================================================================

export const ProfessionType = Type.Union([
  Type.Literal('clinique_sans_licence'),
  Type.Literal('clinique_licencie'),
  Type.Literal('non_clinique'),
]);
export type ProfessionType = Static<typeof ProfessionType>;

export const PROFESSION_TYPES: readonly ProfessionType[] = [
  'clinique_sans_licence',
  'clinique_licencie',
  'non_clinique',
] as const;

/**
 * Profession type labels in French
 */
export const PROFESSION_TYPE_LABELS_FR: { [K in ProfessionType]: string } = {
  clinique_sans_licence: 'Clinique sans licence',
  clinique_licencie: 'Clinique licencié',
  non_clinique: 'Non-clinique',
};

/**
 * Profession type labels in English
 */
export const PROFESSION_TYPE_LABELS_EN: { [K in ProfessionType]: string } = {
  clinique_sans_licence: 'Unlicensed clinician',
  clinique_licencie: 'Licensed clinician',
  non_clinique: 'Non-clinical',
};

// ============================================================================
// Participant Types
// ============================================================================

export const ParticipantType = Type.Union([
  Type.Literal('professionnel'),
  Type.Literal('clinique'),
  Type.Literal('systeme'),
]);
export type ParticipantType = Static<typeof ParticipantType>;

export const PARTICIPANT_TYPES: readonly ParticipantType[] = [
  'professionnel',
  'clinique',
  'systeme',
] as const;

/**
 * Participant type labels in French
 */
export const PARTICIPANT_TYPE_LABELS_FR: { [K in ParticipantType]: string } = {
  professionnel: 'Professionnel',
  clinique: 'Clinique',
  systeme: 'Système',
};

/**
 * Participant type labels in English
 */
export const PARTICIPANT_TYPE_LABELS_EN: { [K in ParticipantType]: string } = {
  professionnel: 'Professional',
  clinique: 'Clinic',
  systeme: 'System',
};

// ============================================================================
// Participant Status Types
// ============================================================================

export const ParticipantStatus = Type.Union([
  Type.Literal('pending'),
  Type.Literal('active'),
  Type.Literal('left'),
]);
export type ParticipantStatus = Static<typeof ParticipantStatus>;

export const PARTICIPANT_STATUSES: readonly ParticipantStatus[] = [
  'pending',
  'active',
  'left',
] as const;

/**
 * Participant status labels in French
 */
export const PARTICIPANT_STATUS_LABELS_FR: {
  [K in ParticipantStatus]: string;
} = {
  pending: 'En attente',
  active: 'Actif',
  left: 'Parti',
};

/**
 * Participant status labels in English
 */
export const PARTICIPANT_STATUS_LABELS_EN: {
  [K in ParticipantStatus]: string;
} = {
  pending: 'Pending',
  active: 'Active',
  left: 'Left',
};

// ============================================================================
// Participant Permission Types
// ============================================================================

export const ParticipantPermission = Type.Union([
  Type.Literal('read_only'),
  Type.Literal('reactions_only'),
  Type.Literal('messages_only'),
  Type.Literal('full'),
]);
export type ParticipantPermission = Static<typeof ParticipantPermission>;

export const PARTICIPANT_PERMISSIONS: readonly ParticipantPermission[] = [
  'read_only',
  'reactions_only',
  'messages_only',
  'full',
] as const;

/**
 * Participant permission labels in French
 */
export const PARTICIPANT_PERMISSION_LABELS_FR: Record<
  ParticipantPermission,
  string
> = {
  read_only: 'Lecture seule',
  reactions_only: 'Réactions uniquement',
  messages_only: 'Messages uniquement',
  full: 'Accès complet',
};

/**
 * Participant permission labels in English
 */
export const PARTICIPANT_PERMISSION_LABELS_EN: Record<
  ParticipantPermission,
  string
> = {
  read_only: 'Read only',
  reactions_only: 'Reactions only',
  messages_only: 'Messages only',
  full: 'Full access',
};

// ============================================================================
// Message Format Types
// ============================================================================

export const MessageFormat = Type.Union([
  Type.Literal('texte'),
  Type.Literal('markdown'),
]);
export type MessageFormat = Static<typeof MessageFormat>;

export const MESSAGE_FORMATS: readonly MessageFormat[] = [
  'texte',
  'markdown',
] as const;

/**
 * Message format labels in French
 */
export const MESSAGE_FORMAT_LABELS_FR: { [K in MessageFormat]: string } = {
  texte: 'Texte brut',
  markdown: 'Markdown',
};

/**
 * Message format labels in English
 */
export const MESSAGE_FORMAT_LABELS_EN: { [K in MessageFormat]: string } = {
  texte: 'Plain text',
  markdown: 'Markdown',
};

// ============================================================================
// ISO Country Codes
// ============================================================================

export const ISOCountryCode = Type.Union([
  Type.Literal('CA'),
  Type.Literal('US'),
]);
export type ISOCountryCode = Static<typeof ISOCountryCode>;

export const ISO_COUNTRY_CODES: { [K in ISOCountryCode]: string } = {
  CA: 'Canada',
  US: 'United States',
} as const;

// ============================================================================
// UUID Type
// ============================================================================

/**
 * Represents a UUID string (format: uuid)
 */
export type UUID = string & { readonly __brand: 'UUID' };

/**
 * Type guard to check if a string is a valid UUID
 */
export function isUUID(value: string): value is UUID {
  return UUID_REGEX.test(value);
}

/**
 * Create a branded UUID type from a string (use with caution - no validation)
 */
export function asUUID(value: string): UUID {
  return value as UUID;
}

// ============================================================================
// API Types
// ============================================================================

export const ApiError = Type.Object({
  error: Type.Object({
    code: Type.String({
      description:
        "Code d'erreur machine-readable (ex. USER_ALREADY_EXISTS, PATIENT_NOT_FOUND)",
    }),
    message: Type.String({
      description: "Message d'erreur lisible par l'humain",
    }),
    details: Type.Optional(Type.Record(Type.String(), Type.Any())),
    timestamp: Type.String({
      format: 'date-time',
      description: "Timestamp ISO 8601 de l'erreur",
    }),
    traceId: Type.String({
      description: "Identifiant unique pour tracer l'erreur en production",
    }),
  }),
});
export type ApiError = Static<typeof ApiError>;
