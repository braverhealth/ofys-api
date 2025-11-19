/**
 * Braver Frontend API (Ofys Integration)
 * Type definitions for the frontend API exposed by Braver
 */

import { ParticipantStatus, ParticipantPermission } from './common';

// ============================================================================
// Error Types
// ============================================================================

export interface ApiError {
  error: {
    /** Machine-readable error code (ex. AUTH_TOKEN_EXPIRED, VALIDATION_REQUIRED_FIELD) */
    code: string;
    /** Human-readable error message */
    message: string;
    /** Additional error-specific details */
    details?: Record<string, any>;
    /** ISO 8601 timestamp of the error */
    timestamp: string;
    /** Unique identifier for tracing the error in production */
    traceId: string;
  };
}

// ============================================================================
// Authentication Types
// ============================================================================

export interface BraverToken {
  /** JWT token issued by Braver */
  token: string;
  /** Token expiration time in seconds (typically 86400 for 24 hours) */
  expiresIn?: number;
}

// ============================================================================
// Thread Types
// ============================================================================

export interface ActiveThreadStats {
  /** Nombre de fils actifs (ouverts) */
  nbFilsActifs: number;
  /** Nombre total de messages non lus */
  nbMessagesNonLus: number;
}

export interface ThreadListResponse {
  /** Liste des fils actifs résumés (du plus récent au plus ancien) */
  threads: ThreadSummary[];
  /** Indique s'il y a d'autres fils à récupérer */
  hasMore: boolean;
  /** ID du dernier fil pour la prochaine requête (null si hasMore=false) */
  nextCursor: string | null;
}

export interface ThreadSummary {
  id: string;
  titre: string;
  participants: Participant[];
  lieux: PracticeLocation[];
  patient?: PatientMini | null;
  estFerme: boolean;
  enSourdineJusqua?: string | null; // ISO 8601 date-time
  ofysPatientId?: string | null;
  /** Nombre de messages non lus dans ce fil */
  nbMessagesNonLus: number;
  /** Résumé IA de la discussion depuis le début (markdown) */
  resumeDepuisDebut?: string | null;
  /** Résumé IA de la discussion depuis la dernière interaction (markdown) */
  resumeDepuisDerniereInteraction?: string | null;
}

export interface Thread {
  id: string;
  titre: string;
  participants: Participant[];
  patient?: PatientMini;
  messages: Message[];
  nbMessages: number;
  nbMessagesNonLus: number;
  estFerme: boolean;
  enSourdineJusqua?: string | null; // ISO 8601 date-time
  ofysPatientId?: string | null;
  braverPatientId?: string | null;
  /** Résumé IA de la discussion depuis le début (markdown) */
  resumeDepuisDebut?: string | null;
  /** Résumé IA de la discussion depuis la dernière interaction (markdown) */
  resumeDepuisDerniereInteraction?: string | null;
}

export interface ThreadUpdate {
  /** Marque tous les messages jusqu'à ce sequenceId comme lus */
  marquerLuJusquaSequenceId?: number;
  /** Marque le fil globalement comme non lu */
  marquerNonLu?: boolean;
  /** Mettre en sourdine pour N secondes */
  mettreEnSourdinePourSecondes?: number;
  /** Associer un patient Ofys au fil avec ses détails complets */
  associerPatient?: PatientCreateForThread;
  /** Fermer le fil */
  fermer?: boolean;
  /** Quitter le fil sans le fermer */
  quitterSansFermer?: boolean;
}

export interface PatientDetails {
  /** Identifiant Ofys du patient */
  id: string;
  prenom: string;
  nom: string;
  /** Sexe à la naissance */
  sexeNaissance?: 'M' | 'F' | 'O' | 'NA' | null;
  /** Date de naissance (format ISO 8601) */
  dateNaissance?: string | null;
  /** Numéro d'assurance maladie */
  nam?: string | null;
}

export interface PatientCreateForThread {
  /** Identifiant Ofys du patient */
  id: string;
  prenom: string;
  nom: string;
  /** Sexe à la naissance */
  sexeNaissance?: 'M' | 'F' | 'O' | 'NA' | null;
  /** Date de naissance (format ISO 8601) */
  dateNaissance: string;
  /** Numéro d'assurance maladie */
  nam: string;
}

export interface ThreadCreate {
  titre: string;
  participants: ThreadParticipantRef[];
  contenuInitial?: MessageContent;
  /** Détails complets du patient Ofys associé au fil */
  patient?: PatientCreateForThread;
  braverPatientId?: string | null;
  piecesJointes?: Attachment[];
}

export interface ThreadParticipantRef {
  professionnelId?: string | null;
  cliniqueId?: string | null;
}

// ============================================================================
// Participant & Location Types
// ============================================================================

export interface Participant {
  id: string;
  type: 'professionnel' | 'clinique' | 'systeme';
  /** Status of the participant in the discussion */
  status?: ParticipantStatus;
  nomAffiche: string;
  /** UUID de la profession (voir GET /professions). Applicable uniquement si type=professionnel. */
  profession?: string | null;
  /** Permissions of the participant in the discussion */
  permissions?: ParticipantPermission[];
  lieu?: PracticeLocation;
}

export interface PracticeLocation {
  id: string;
  nom: string;
  /** UUID du type de lieu (voir GET /typesLieux) */
  typeLieu: string;
  adresse: string;
  longitude: number;
  latitude: number;
}

// ============================================================================
// Patient Types
// ============================================================================

export interface PatientMini {
  ofysPatientId?: number | null;
  prenom: string;
  nom: string;
  sexeNaissance?: string | null;
  dateNaissance?: string | null; // ISO 8601 date format
  nam?: string | null;
}

// ============================================================================
// Message Types
// ============================================================================

/**
 * Message returned from GET /fil/{id}
 * Either contains text content OR a single attachment, but not both
 */
export type Message = MessageWithContent | MessageWithAttachment;

export interface MessageWithContent {
  id: string;
  /** Ordre strict des messages dans le fil */
  sequenceId: number;
  auteur: Participant;
  type: 'contenu';
  contenu: MessageContent;
  creeAt: string; // ISO 8601 date-time
  nonLu: boolean;
}

export interface MessageWithAttachment {
  id: string;
  /** Ordre strict des messages dans le fil */
  sequenceId: number;
  auteur: Participant;
  type: 'pieceJointe';
  /** Une seule pièce jointe par message */
  pieceJointe: Attachment;
  creeAt: string; // ISO 8601 date-time
  nonLu: boolean;
}

export interface MessageContent {
  texte: string;
  format?: 'texte' | 'markdown';
}

export interface Attachment {
  id: string;
  nomFichier: string;
  typeMime: string;
  tailleOctets: number;
  urlTelechargement: string;
}

export interface AttachmentCreate {
  /** Nom du fichier */
  nomFichier: string;
  /** Type MIME du fichier (ex. application/pdf, image/png) */
  typeMime: string;
  /** Description ou légende du fichier */
  description: string;
  /**
   * Contenu du fichier encodé en base64 (mutuellement exclusif avec urlTelechargement).
   * Limite: max 50 MB par fichier en base64 (≈ 37.5 MB de données réelles).
   * Limites globales: max 2 GB total par message, max 10 fichiers par message
   */
  contenuBase64?: string | null;
  /** URL pour télécharger le fichier (mutuellement exclusif avec contenuBase64) */
  urlTelechargement?: string | null;
}

export interface MessageCreate {
  /** Contenu textuel (markdown ou texte brut). Optionnel. */
  contenu?: MessageContent | null;
  /** Zéro ou plusieurs pièces jointes. Optionnel. */
  piecesJointes?: AttachmentCreate[];
}

// ============================================================================
// Profile Types
// ============================================================================

export interface ProfessionalProfile {
  id: string;
  nom: string;
  prenom: string;
  profession: string;
  numeroPratique: string;
  lieux: PracticeLocation[];
}

export interface ClinicProfile {
  id: string;
  nom: string;
  /** UUID du type de lieu (voir GET /typesLieux) */
  typeLieu: string;
  lieux: PracticeLocation[];
}

// ============================================================================
// Reference Data Types
// ============================================================================

export interface Profession {
  /** Identifiant unique de la profession */
  id: string;
  /** Type de profession */
  type: 'clinique_sans_licence' | 'clinique_licencie' | 'non_clinique';
  /** Libellés localisés et genrés de la profession */
  labels: {
    fr_M?: string;
    fr_F?: string;
    fr_O?: string;
    en_M?: string;
    en_F?: string;
    en_O?: string;
  };
}

export interface LocationType {
  /** Identifiant unique du type de lieu */
  id: string;
  /** Libellés localisés du type de lieu */
  labels: {
    fr?: string;
    en?: string;
  };
}

// ============================================================================
// WebSocket Message Types
// ============================================================================

/**
 * WebSocket messages received from /fils/activites
 */
export type WebSocketMessage =
  | WebSocketMessageNewThread
  | WebSocketMessageNewMessage
  | WebSocketMessageThreadUpdated
  | WebSocketMessageThreadClosed;

export interface WebSocketMessageNewThread {
  type: 'newThread';
  /** Complete Thread object of the newly created thread */
  thread: Thread;
  /** ISO 8601 timestamp of the event */
  timestamp: string;
}

export interface WebSocketMessageNewMessage {
  type: 'newMessage';
  /** ID of the thread the message belongs to */
  threadId: string;
  /** Message object */
  message: Message;
  /** ISO 8601 timestamp of the event */
  timestamp: string;
}

export interface WebSocketMessageThreadUpdated {
  type: 'threadUpdated';
  /** ID of the updated thread */
  threadId: string;
  /** Complete Thread object with modifications (all fields can be modified) */
  thread: Thread;
  /** ISO 8601 timestamp of the event */
  timestamp: string;
}

export interface WebSocketMessageThreadClosed {
  type: 'threadClosed';
  /** ID of the closed thread */
  threadId: string;
  /** ISO 8601 timestamp of the event */
  timestamp: string;
}

