"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiError = exports.ISO_COUNTRY_CODES = exports.ISOCountryCode = exports.MESSAGE_FORMAT_LABELS_EN = exports.MESSAGE_FORMAT_LABELS_FR = exports.MESSAGE_FORMATS = exports.MessageFormat = exports.PARTICIPANT_PERMISSION_LABELS_EN = exports.PARTICIPANT_PERMISSION_LABELS_FR = exports.PARTICIPANT_PERMISSIONS = exports.ParticipantPermission = exports.PARTICIPANT_STATUS_LABELS_EN = exports.PARTICIPANT_STATUS_LABELS_FR = exports.PARTICIPANT_STATUSES = exports.ParticipantStatus = exports.PARTICIPANT_TYPE_LABELS_EN = exports.PARTICIPANT_TYPE_LABELS_FR = exports.PARTICIPANT_TYPES = exports.ParticipantType = exports.PROFESSION_TYPE_LABELS_EN = exports.PROFESSION_TYPE_LABELS_FR = exports.PROFESSION_TYPES = exports.ProfessionType = exports.GENDER_LABELS_EN = exports.GENDER_LABELS_FR = exports.GENDER_VALUES = exports.Gender = exports.Nullable = void 0;
exports.isUUID = isUUID;
exports.asUUID = asUUID;
const typebox_1 = require("@sinclair/typebox");
const Nullable = (schema) => typebox_1.Type.Union([schema, typebox_1.Type.Null()]);
exports.Nullable = Nullable;
/**
 * Common types shared across Braver APIs
 */
// ============================================================================
// Gender/Sexe Types
// ============================================================================
exports.Gender = typebox_1.Type.Union([
    typebox_1.Type.Literal('M'),
    typebox_1.Type.Literal('F'),
    typebox_1.Type.Literal('O'),
    typebox_1.Type.Literal('NA'),
]);
exports.GENDER_VALUES = ['M', 'F', 'O', 'NA'];
/**
 * Gender labels in French
 */
exports.GENDER_LABELS_FR = {
    M: 'Masculin',
    F: 'Féminin',
    O: 'Autre/Neutre',
    NA: 'Non applicable',
};
/**
 * Gender labels in English
 */
exports.GENDER_LABELS_EN = {
    M: 'Masculine',
    F: 'Feminine',
    O: 'Other/Neutral',
    NA: 'Not applicable',
};
// ============================================================================
// Profession Types
// ============================================================================
exports.ProfessionType = typebox_1.Type.Union([
    typebox_1.Type.Literal('clinique_sans_licence'),
    typebox_1.Type.Literal('clinique_licencie'),
    typebox_1.Type.Literal('non_clinique'),
]);
exports.PROFESSION_TYPES = [
    'clinique_sans_licence',
    'clinique_licencie',
    'non_clinique',
];
/**
 * Profession type labels in French
 */
exports.PROFESSION_TYPE_LABELS_FR = {
    clinique_sans_licence: 'Clinique sans licence',
    clinique_licencie: 'Clinique licencié',
    non_clinique: 'Non-clinique',
};
/**
 * Profession type labels in English
 */
exports.PROFESSION_TYPE_LABELS_EN = {
    clinique_sans_licence: 'Unlicensed clinician',
    clinique_licencie: 'Licensed clinician',
    non_clinique: 'Non-clinical',
};
// ============================================================================
// Participant Types
// ============================================================================
exports.ParticipantType = typebox_1.Type.Union([
    typebox_1.Type.Literal('professionnel'),
    typebox_1.Type.Literal('clinique'),
    typebox_1.Type.Literal('systeme'),
]);
exports.PARTICIPANT_TYPES = [
    'professionnel',
    'clinique',
    'systeme',
];
/**
 * Participant type labels in French
 */
exports.PARTICIPANT_TYPE_LABELS_FR = {
    professionnel: 'Professionnel',
    clinique: 'Clinique',
    systeme: 'Système',
};
/**
 * Participant type labels in English
 */
exports.PARTICIPANT_TYPE_LABELS_EN = {
    professionnel: 'Professional',
    clinique: 'Clinic',
    systeme: 'System',
};
// ============================================================================
// Participant Status Types
// ============================================================================
exports.ParticipantStatus = typebox_1.Type.Union([
    typebox_1.Type.Literal('pending'),
    typebox_1.Type.Literal('active'),
    typebox_1.Type.Literal('left'),
]);
exports.PARTICIPANT_STATUSES = [
    'pending',
    'active',
    'left',
];
/**
 * Participant status labels in French
 */
exports.PARTICIPANT_STATUS_LABELS_FR = {
    pending: 'En attente',
    active: 'Actif',
    left: 'Parti',
};
/**
 * Participant status labels in English
 */
exports.PARTICIPANT_STATUS_LABELS_EN = {
    pending: 'Pending',
    active: 'Active',
    left: 'Left',
};
// ============================================================================
// Participant Permission Types
// ============================================================================
exports.ParticipantPermission = typebox_1.Type.Union([
    typebox_1.Type.Literal('read_only'),
    typebox_1.Type.Literal('reactions_only'),
    typebox_1.Type.Literal('messages_only'),
    typebox_1.Type.Literal('full'),
]);
exports.PARTICIPANT_PERMISSIONS = [
    'read_only',
    'reactions_only',
    'messages_only',
    'full',
];
/**
 * Participant permission labels in French
 */
exports.PARTICIPANT_PERMISSION_LABELS_FR = {
    read_only: 'Lecture seule',
    reactions_only: 'Réactions uniquement',
    messages_only: 'Messages uniquement',
    full: 'Accès complet',
};
/**
 * Participant permission labels in English
 */
exports.PARTICIPANT_PERMISSION_LABELS_EN = {
    read_only: 'Read only',
    reactions_only: 'Reactions only',
    messages_only: 'Messages only',
    full: 'Full access',
};
// ============================================================================
// Message Format Types
// ============================================================================
exports.MessageFormat = typebox_1.Type.Union([
    typebox_1.Type.Literal('texte'),
    typebox_1.Type.Literal('markdown'),
]);
exports.MESSAGE_FORMATS = [
    'texte',
    'markdown',
];
/**
 * Message format labels in French
 */
exports.MESSAGE_FORMAT_LABELS_FR = {
    texte: 'Texte brut',
    markdown: 'Markdown',
};
/**
 * Message format labels in English
 */
exports.MESSAGE_FORMAT_LABELS_EN = {
    texte: 'Plain text',
    markdown: 'Markdown',
};
// ============================================================================
// ISO Country Codes
// ============================================================================
exports.ISOCountryCode = typebox_1.Type.Union([
    typebox_1.Type.Literal('CA'),
    typebox_1.Type.Literal('US'),
]);
exports.ISO_COUNTRY_CODES = {
    CA: 'Canada',
    US: 'United States',
};
/**
 * Type guard to check if a string is a valid UUID
 */
function isUUID(value) {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    return uuidRegex.test(value);
}
/**
 * Create a branded UUID type from a string (use with caution - no validation)
 */
function asUUID(value) {
    return value;
}
// ============================================================================
// API Types
// ============================================================================
exports.ApiError = typebox_1.Type.Object({
    error: typebox_1.Type.Object({
        code: typebox_1.Type.String({
            description: "Code d'erreur machine-readable (ex. USER_ALREADY_EXISTS, PATIENT_NOT_FOUND)",
        }),
        message: typebox_1.Type.String({
            description: "Message d'erreur lisible par l'humain",
        }),
        details: typebox_1.Type.Optional(typebox_1.Type.Record(typebox_1.Type.String(), typebox_1.Type.Any())),
        timestamp: typebox_1.Type.String({
            format: 'date-time',
            description: "Timestamp ISO 8601 de l'erreur",
        }),
        traceId: typebox_1.Type.String({
            description: "Identifiant unique pour tracer l'erreur en production",
        }),
    }),
});
