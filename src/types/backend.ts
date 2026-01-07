import { Static, Type } from '@sinclair/typebox';
import { Gender, ISOCountryCode, Nullable } from './common.js';

/**
 * Braver Backend API – Provisionnement et Patients
 * Type definitions for the backend API consumed by Ofys
 */

// ============================================================================
// User Types
// ============================================================================

export const UserCreate = Type.Object({
  id: Type.String({ description: 'Identifiant Ofys' }),
  prenom: Type.String(),
  nom: Type.String(),
  courriel: Type.Optional(Nullable(Type.String())),
  genre: Type.Optional(Nullable(Gender)),
  professions: Type.Array(Type.String()),
  numeroPratique: Type.String({
    description: 'Numéro de pratique (ex. numéro de licence)',
  }),
  lieuxPratiqueIds: Type.Array(Type.String(), {
    description:
      'Liste des IDs Ofys des lieux de pratique associés à cet utilisateur',
  }),
});
export type UserCreate = Static<typeof UserCreate>;

export const UserUpdate = Type.Partial(
  Type.Object({
    prenom: Type.String(),
    nom: Type.String(),
    courriel: Nullable(Type.String()),
    genre: Nullable(Gender),
    professions: Type.Array(Type.String()),
    lieuxPratiqueIds: Type.Array(Type.String(), {
      description:
        'Liste des IDs Ofys des lieux de pratique associés à cet utilisateur',
    }),
  }),
);
export type UserUpdate = Static<typeof UserUpdate>;

export const User = UserCreate;
export type User = Static<typeof User>;

// ============================================================================
// Patient Types
// ============================================================================

export const PatientCreate = Type.Object({
  id: Type.String({ description: 'Identifiant Ofys' }),
  prenom: Type.String(),
  nom: Type.String(),
  sexeNaissance: Type.Optional(Nullable(Gender)),
  dateNaissance: Type.String({ format: 'date' }),
  nam: Type.String({ description: "Numéro d'assurance maladie" }),
});
export type PatientCreate = Static<typeof PatientCreate>;

export const PatientUpdate = Type.Partial(
  Type.Object({
    prenom: Type.String(),
    nom: Type.String(),
    sexeActuel: Nullable(Gender),
    courriel: Nullable(Type.String()),
    nam: Type.String({ description: "Ne change qu'exceptionnellement" }),
  }),
);
export type PatientUpdate = Static<typeof PatientUpdate>;

export const Patient = Type.Intersect([
  PatientCreate,
  Type.Object({
    braverPatientId: Type.String({
      description: 'Identifiant unique du patient côté Braver',
    }),
  }),
]);
export type Patient = Static<typeof Patient>;

// ============================================================================
// Client & Practice Location Types
// ============================================================================

export const PracticeLocationCreate = Type.Object({
  nom: Type.String({ description: 'Nom du lieu de pratique' }),
  typeLieu: Type.String({
    format: 'uuid',
    description:
      "UUID du type de lieu (voir GET /typesLieux dans l'API frontend)",
  }),
  rue: Type.Optional(
    Nullable(Type.String({ description: 'Numéro et nom de la rue' })),
  ),
  codePostal: Type.Optional(Nullable(Type.String())),
  ville: Type.Optional(Nullable(Type.String())),
  pays: Type.Optional(Nullable(ISOCountryCode)),
  longitude: Type.Optional(Nullable(Type.Number())),
  latitude: Type.Optional(Nullable(Type.Number())),
});
export type PracticeLocationCreate = Static<typeof PracticeLocationCreate>;

export const PracticeLocationUpdate = Type.Partial(PracticeLocationCreate);

export const PracticeLocation = Type.Intersect([
  PracticeLocationCreate,
  Type.Object({
    braverWorkplaceId: Type.String({
      description: 'Identifiant unique du lieu côté Braver',
    }),
  }),
]);
export type PracticeLocation = Static<typeof PracticeLocation>;

export const ClientCreate = Type.Object({
  id: Type.String({ description: 'Identifiant unique du client côté Ofys' }),
  nom: Type.String({ description: 'Nom de la clinique/organisation' }),
  lieux: Type.Optional(Type.Array(PracticeLocationCreate)),
});
export type ClientCreate = Static<typeof ClientCreate>;

export const Client = Type.Intersect([
  ClientCreate,
  Type.Object({
    braverOrganizationId: Type.String({
      description: 'Identifiant unique du client côté Braver',
    }),
  }),
]);
export type Client = Static<typeof Client>;
