/**
 * Common types shared across Braver APIs
 */

// ============================================================================
// Gender/Sexe Types
// ============================================================================

export type Gender = 'M' | 'F' | 'O' | 'NA';

export const GENDER_VALUES = ['M', 'F', 'O', 'NA'] as const;

/**
 * Gender labels in French
 */
export const GENDER_LABELS_FR: Record<Gender, string> = {
  M: 'Masculin',
  F: 'Féminin',
  O: 'Autre/Neutre',
  NA: 'Non applicable',
};

/**
 * Gender labels in English
 */
export const GENDER_LABELS_EN: Record<Gender, string> = {
  M: 'Masculine',
  F: 'Feminine',
  O: 'Other/Neutral',
  NA: 'Not applicable',
};

// ============================================================================
// Profession Types
// ============================================================================

export type ProfessionType = 'clinique_sans_licence' | 'clinique_licencie' | 'non_clinique';

export const PROFESSION_TYPES = ['clinique_sans_licence', 'clinique_licencie', 'non_clinique'] as const;

/**
 * Profession type labels in French
 */
export const PROFESSION_TYPE_LABELS_FR: Record<ProfessionType, string> = {
  clinique_sans_licence: 'Clinique sans licence',
  clinique_licencie: 'Clinique licencié',
  non_clinique: 'Non-clinique',
};

/**
 * Profession type labels in English
 */
export const PROFESSION_TYPE_LABELS_EN: Record<ProfessionType, string> = {
  clinique_sans_licence: 'Unlicensed clinician',
  clinique_licencie: 'Licensed clinician',
  non_clinique: 'Non-clinical',
};

// ============================================================================
// Participant Types
// ============================================================================

export type ParticipantType = 'professionnel' | 'clinique' | 'systeme';

export const PARTICIPANT_TYPES = ['professionnel', 'clinique', 'systeme'] as const;

/**
 * Participant type labels in French
 */
export const PARTICIPANT_TYPE_LABELS_FR: Record<ParticipantType, string> = {
  professionnel: 'Professionnel',
  clinique: 'Clinique',
  systeme: 'Système',
};

/**
 * Participant type labels in English
 */
export const PARTICIPANT_TYPE_LABELS_EN: Record<ParticipantType, string> = {
  professionnel: 'Professional',
  clinique: 'Clinic',
  systeme: 'System',
};

// ============================================================================
// Participant Status Types
// ============================================================================

export type ParticipantStatus = 'pending' | 'active' | 'left';

export const PARTICIPANT_STATUSES = ['pending', 'active', 'left'] as const;

/**
 * Participant status labels in French
 */
export const PARTICIPANT_STATUS_LABELS_FR: Record<ParticipantStatus, string> = {
  pending: 'En attente',
  active: 'Actif',
  left: 'Parti',
};

/**
 * Participant status labels in English
 */
export const PARTICIPANT_STATUS_LABELS_EN: Record<ParticipantStatus, string> = {
  pending: 'Pending',
  active: 'Active',
  left: 'Left',
};

// ============================================================================
// Participant Permission Types
// ============================================================================

export type ParticipantPermission = 'read_only' | 'reactions_only' | 'messages_only' | 'full';

export const PARTICIPANT_PERMISSIONS = ['read_only', 'reactions_only', 'messages_only', 'full'] as const;

/**
 * Participant permission labels in French
 */
export const PARTICIPANT_PERMISSION_LABELS_FR: Record<ParticipantPermission, string> = {
  read_only: 'Lecture seule',
  reactions_only: 'Réactions uniquement',
  messages_only: 'Messages uniquement',
  full: 'Accès complet',
};

/**
 * Participant permission labels in English
 */
export const PARTICIPANT_PERMISSION_LABELS_EN: Record<ParticipantPermission, string> = {
  read_only: 'Read only',
  reactions_only: 'Reactions only',
  messages_only: 'Messages only',
  full: 'Full access',
};

// ============================================================================
// Message Format Types
// ============================================================================

export type MessageFormat = 'texte' | 'markdown';

export const MESSAGE_FORMATS = ['texte', 'markdown'] as const;

/**
 * Message format labels in French
 */
export const MESSAGE_FORMAT_LABELS_FR: Record<MessageFormat, string> = {
  texte: 'Texte brut',
  markdown: 'Markdown',
};

/**
 * Message format labels in English
 */
export const MESSAGE_FORMAT_LABELS_EN: Record<MessageFormat, string> = {
  texte: 'Plain text',
  markdown: 'Markdown',
};

// ============================================================================
// ISO Country Codes
// ============================================================================

export const ISO_COUNTRY_CODES = {
  CA: 'Canada',
  US: 'United States',
} as const;

export type ISOCountryCode = keyof typeof ISO_COUNTRY_CODES;

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
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  return uuidRegex.test(value);
}

/**
 * Create a branded UUID type from a string (use with caution - no validation)
 */
export function asUUID(value: string): UUID {
  return value as UUID;
}

