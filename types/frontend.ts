/**
 * Braver Frontend API (Ofys Integration)
 * Type definitions for the frontend API exposed by Braver
 */

// ============================================================================
// Authentication Types
// ============================================================================

export interface BraverToken {
  /** JWT token issued by Braver */
  token: string;
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

export interface ThreadList {
  threads: Thread[];
  page: number;
  pageSize: number;
  total: number;
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
}

export interface ThreadUpdate {
  /** Marque tous les messages jusqu'à ce sequenceId comme lus */
  marquerLuJusquaSequenceId?: number;
  /** Marque le fil globalement comme non lu */
  marquerNonLu?: boolean;
  /** Mettre en sourdine pour N secondes */
  mettreEnSourdinePourSecondes?: number;
  /** Associer le numéro de dossier local Ofys */
  associerOfysPatientId?: string;
  /** Fermer le fil */
  fermer?: boolean;
  /** Quitter le fil sans le fermer */
  quitterSansFermer?: boolean;
}

export interface ThreadCreate {
  titre: string;
  participants: ThreadParticipantRef[];
  contenuInitial?: MessageContent;
  ofysPatientId?: string | null;
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
  nomAffiche: string;
  /** UUID de la profession (voir GET /professions). Applicable uniquement si type=professionnel. */
  profession?: string | null;
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

export interface Message {
  id: string;
  /** Ordre strict des messages dans le fil */
  sequenceId: number;
  auteur: Participant;
  contenu: MessageContent;
  piecesJointes: Attachment[];
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

