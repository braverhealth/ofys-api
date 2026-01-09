import { Type } from '@sinclair/typebox';
export const Nullable = (schema) => Type.Union([schema, Type.Null()]);
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
export const GENDER_VALUES = ['M', 'F', 'O', 'NA'];
/**
 * Gender labels in French
 */
export const GENDER_LABELS_FR = {
    M: 'Masculin',
    F: 'Féminin',
    O: 'Autre/Neutre',
    NA: 'Non applicable',
};
/**
 * Gender labels in English
 */
export const GENDER_LABELS_EN = {
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
export const PROFESSION_TYPES = [
    'clinique_sans_licence',
    'clinique_licencie',
    'non_clinique',
];
/**
 * Profession type labels in French
 */
export const PROFESSION_TYPE_LABELS_FR = {
    clinique_sans_licence: 'Clinique sans licence',
    clinique_licencie: 'Clinique licencié',
    non_clinique: 'Non-clinique',
};
/**
 * Profession type labels in English
 */
export const PROFESSION_TYPE_LABELS_EN = {
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
export const PARTICIPANT_TYPES = [
    'professionnel',
    'clinique',
    'systeme',
];
/**
 * Participant type labels in French
 */
export const PARTICIPANT_TYPE_LABELS_FR = {
    professionnel: 'Professionnel',
    clinique: 'Clinique',
    systeme: 'Système',
};
/**
 * Participant type labels in English
 */
export const PARTICIPANT_TYPE_LABELS_EN = {
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
export const PARTICIPANT_STATUSES = [
    'pending',
    'active',
    'left',
];
/**
 * Participant status labels in French
 */
export const PARTICIPANT_STATUS_LABELS_FR = {
    pending: 'En attente',
    active: 'Actif',
    left: 'Parti',
};
/**
 * Participant status labels in English
 */
export const PARTICIPANT_STATUS_LABELS_EN = {
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
export const PARTICIPANT_PERMISSIONS = [
    'read_only',
    'reactions_only',
    'messages_only',
    'full',
];
/**
 * Participant permission labels in French
 */
export const PARTICIPANT_PERMISSION_LABELS_FR = {
    read_only: 'Lecture seule',
    reactions_only: 'Réactions uniquement',
    messages_only: 'Messages uniquement',
    full: 'Accès complet',
};
/**
 * Participant permission labels in English
 */
export const PARTICIPANT_PERMISSION_LABELS_EN = {
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
export const MESSAGE_FORMATS = [
    'texte',
    'markdown',
];
/**
 * Message format labels in French
 */
export const MESSAGE_FORMAT_LABELS_FR = {
    texte: 'Texte brut',
    markdown: 'Markdown',
};
/**
 * Message format labels in English
 */
export const MESSAGE_FORMAT_LABELS_EN = {
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
export const ISO_COUNTRY_CODES = {
    CA: 'Canada',
    US: 'United States',
};
/**
 * Type guard to check if a string is a valid UUID
 */
export function isUUID(value) {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    return uuidRegex.test(value);
}
/**
 * Create a branded UUID type from a string (use with caution - no validation)
 */
export function asUUID(value) {
    return value;
}
// ============================================================================
// API Types
// ============================================================================
export const ApiError = Type.Object({
    error: Type.Object({
        code: Type.String({
            description: "Code d'erreur machine-readable (ex. USER_ALREADY_EXISTS, PATIENT_NOT_FOUND)",
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
