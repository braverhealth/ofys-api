import { Static, TSchema } from '@sinclair/typebox';
export declare const Nullable: <T extends TSchema>(schema: T) => import("@sinclair/typebox").TUnion<[T, import("@sinclair/typebox").TNull]>;
/**
 * Common types shared across Braver APIs
 */
export declare const Gender: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"M">, import("@sinclair/typebox").TLiteral<"F">, import("@sinclair/typebox").TLiteral<"O">, import("@sinclair/typebox").TLiteral<"NA">]>;
export type Gender = Static<typeof Gender>;
export declare const GENDER_VALUES: readonly Gender[];
/**
 * Gender labels in French
 */
export declare const GENDER_LABELS_FR: {
    [K in Gender]: string;
};
/**
 * Gender labels in English
 */
export declare const GENDER_LABELS_EN: {
    [K in Gender]: string;
};
export declare const ProfessionType: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"clinique_sans_licence">, import("@sinclair/typebox").TLiteral<"clinique_licencie">, import("@sinclair/typebox").TLiteral<"non_clinique">]>;
export type ProfessionType = Static<typeof ProfessionType>;
export declare const PROFESSION_TYPES: readonly ProfessionType[];
/**
 * Profession type labels in French
 */
export declare const PROFESSION_TYPE_LABELS_FR: {
    [K in ProfessionType]: string;
};
/**
 * Profession type labels in English
 */
export declare const PROFESSION_TYPE_LABELS_EN: {
    [K in ProfessionType]: string;
};
export declare const ParticipantType: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"professionnel">, import("@sinclair/typebox").TLiteral<"clinique">, import("@sinclair/typebox").TLiteral<"systeme">]>;
export type ParticipantType = Static<typeof ParticipantType>;
export declare const PARTICIPANT_TYPES: readonly ParticipantType[];
/**
 * Participant type labels in French
 */
export declare const PARTICIPANT_TYPE_LABELS_FR: {
    [K in ParticipantType]: string;
};
/**
 * Participant type labels in English
 */
export declare const PARTICIPANT_TYPE_LABELS_EN: {
    [K in ParticipantType]: string;
};
export declare const ParticipantStatus: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"pending">, import("@sinclair/typebox").TLiteral<"active">, import("@sinclair/typebox").TLiteral<"left">]>;
export type ParticipantStatus = Static<typeof ParticipantStatus>;
export declare const PARTICIPANT_STATUSES: readonly ParticipantStatus[];
/**
 * Participant status labels in French
 */
export declare const PARTICIPANT_STATUS_LABELS_FR: {
    [K in ParticipantStatus]: string;
};
/**
 * Participant status labels in English
 */
export declare const PARTICIPANT_STATUS_LABELS_EN: {
    [K in ParticipantStatus]: string;
};
export declare const ParticipantPermission: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"read_only">, import("@sinclair/typebox").TLiteral<"reactions_only">, import("@sinclair/typebox").TLiteral<"messages_only">, import("@sinclair/typebox").TLiteral<"full">]>;
export type ParticipantPermission = Static<typeof ParticipantPermission>;
export declare const PARTICIPANT_PERMISSIONS: readonly ParticipantPermission[];
/**
 * Participant permission labels in French
 */
export declare const PARTICIPANT_PERMISSION_LABELS_FR: Record<ParticipantPermission, string>;
/**
 * Participant permission labels in English
 */
export declare const PARTICIPANT_PERMISSION_LABELS_EN: Record<ParticipantPermission, string>;
export declare const MessageFormat: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"texte">, import("@sinclair/typebox").TLiteral<"markdown">]>;
export type MessageFormat = Static<typeof MessageFormat>;
export declare const MESSAGE_FORMATS: readonly MessageFormat[];
/**
 * Message format labels in French
 */
export declare const MESSAGE_FORMAT_LABELS_FR: {
    [K in MessageFormat]: string;
};
/**
 * Message format labels in English
 */
export declare const MESSAGE_FORMAT_LABELS_EN: {
    [K in MessageFormat]: string;
};
export declare const ISOCountryCode: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"CA">, import("@sinclair/typebox").TLiteral<"US">]>;
export type ISOCountryCode = Static<typeof ISOCountryCode>;
export declare const ISO_COUNTRY_CODES: {
    [K in ISOCountryCode]: string;
};
/**
 * Represents a UUID string (format: uuid)
 */
export type UUID = string & {
    readonly __brand: 'UUID';
};
/**
 * Type guard to check if a string is a valid UUID
 */
export declare function isUUID(value: string): value is UUID;
/**
 * Create a branded UUID type from a string (use with caution - no validation)
 */
export declare function asUUID(value: string): UUID;
export declare const ApiError: import("@sinclair/typebox").TObject<{
    error: import("@sinclair/typebox").TObject<{
        code: import("@sinclair/typebox").TString;
        message: import("@sinclair/typebox").TString;
        details: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TRecord<import("@sinclair/typebox").TString, import("@sinclair/typebox").TAny>>;
        timestamp: import("@sinclair/typebox").TString;
        traceId: import("@sinclair/typebox").TString;
    }>;
}>;
export type ApiError = Static<typeof ApiError>;
