/**
 * Braver API Type Definitions
 * 
 * This package exports TypeScript type definitions for both the Braver Backend
 * and Frontend APIs used in the Ofys integration.
 * 
 * Usage:
 * ```typescript
 * import { User, Patient, Client } from './types/backend';
 * import { Thread, Message, Profession } from './types/frontend';
 * import { Gender, UUID, isUUID } from './types/common';
 * ```
 */

// ============================================================================
// Backend API Exports
// ============================================================================

export type {
  UserCreate,
  UserUpdate,
  User,
  PatientCreate,
  PatientUpdate,
  Patient,
  PracticeLocationCreate,
  PracticeLocation,
  ClientCreate,
  Client,
  ApiError,
} from './backend';

// ============================================================================
// Frontend API Exports
// ============================================================================

export type {
  BraverToken,
  ActiveThreadStats,
  ThreadList,
  Thread,
  ThreadUpdate,
  ThreadCreate,
  ThreadParticipantRef,
  Participant,
  PracticeLocation as FrontendPracticeLocation,
  PatientMini,
  Message,
  MessageContent,
  Attachment,
  ProfessionalProfile,
  ClinicProfile,
  Profession,
  LocationType,
} from './frontend';

// ============================================================================
// Common Types & Utilities Exports
// ============================================================================

export type {
  Gender,
  ProfessionType,
  ParticipantType,
  MessageFormat,
  ISOCountryCode,
  UUID,
} from './common';

export {
  GENDER_VALUES,
  GENDER_LABELS_FR,
  GENDER_LABELS_EN,
  PROFESSION_TYPES,
  PROFESSION_TYPE_LABELS_FR,
  PROFESSION_TYPE_LABELS_EN,
  PARTICIPANT_TYPES,
  PARTICIPANT_TYPE_LABELS_FR,
  PARTICIPANT_TYPE_LABELS_EN,
  MESSAGE_FORMATS,
  MESSAGE_FORMAT_LABELS_FR,
  MESSAGE_FORMAT_LABELS_EN,
  ISO_COUNTRY_CODES,
  isUUID,
  asUUID,
} from './common';

