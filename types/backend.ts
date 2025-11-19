/**
 * Braver Backend API – Provisionnement et Patients
 * Type definitions for the backend API consumed by Ofys
 */

// ============================================================================
// User Types
// ============================================================================

export interface UserCreate {
  /** Identifiant Ofys */
  id: string;
  prenom: string;
  nom: string;
  /** Peut être ajouté plus tard au premier login */
  courriel?: string | null;
  genre?: 'M' | 'F' | 'O' | 'NA' | null;
  /** Valeurs fixes à convenir */
  professions: string[];
  /** Issu des données DSQ */
  numeroPratique: string;
}

export interface UserUpdate {
  prenom?: string;
  nom?: string;
  courriel?: string | null;
  genre?: 'M' | 'F' | 'O' | 'NA' | null;
  professions?: string[];
}

export interface User extends UserCreate {}

// ============================================================================
// Patient Types
// ============================================================================

export interface PatientCreate {
  /** Identifiant Ofys */
  id: string;
  prenom: string;
  nom: string;
  /** Sexe à la naissance */
  sexeNaissance?: 'M' | 'F' | 'O' | 'NA' | null;
  dateNaissance: string; // ISO 8601 date format
  /** Numéro d'assurance maladie */
  nam: string;
}

export interface PatientUpdate {
  prenom?: string;
  nom?: string;
  /** Sexe actuel */
  sexeActuel?: 'M' | 'F' | 'O' | 'NA' | null;
  courriel?: string | null;
  /** Ne change qu'exceptionnellement */
  nam?: string;
}

export interface Patient extends PatientCreate {
  /** Identifiant unique du patient côté Braver */
  braverPatientId: string;
}

// ============================================================================
// Client & Practice Location Types
// ============================================================================

export interface PracticeLocationCreate {
  /** Nom du lieu de pratique */
  nom: string;
  /** UUID du type de lieu (voir GET /typesLieux dans l'API frontend) */
  typeLieu: string;
  /** Numéro et nom de la rue */
  rue?: string | null;
  /** Code postal */
  codePostal?: string | null;
  /** Ville/localité */
  ville?: string | null;
  /** Pays (code ISO 3166-1 alpha-2 recommandé, ex. CA, US) */
  pays?: string | null;
  /** Coordonnée géographique */
  longitude?: number | null;
  /** Coordonnée géographique */
  latitude?: number | null;
}

export interface PracticeLocation extends PracticeLocationCreate {
  /** Identifiant unique du lieu côté Braver */
  id: string;
}

export interface ClientCreate {
  /** Identifiant unique du client côté Ofys */
  id: string;
  /** Nom de la clinique/organisation */
  nom: string;
  /** Lieux de pratique associés au client */
  lieux?: PracticeLocationCreate[];
}

export interface Client extends ClientCreate {
  /** Identifiant unique du client côté Braver */
  braverClientId: string;
  lieux?: PracticeLocation[];
}

// ============================================================================
// API Response Types
// ============================================================================

export interface ApiError {
  error: {
    /** Machine-readable error code (ex. USER_ALREADY_EXISTS, PATIENT_NOT_FOUND) */
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

