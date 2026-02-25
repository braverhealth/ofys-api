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
  tokenId: Type.String({ description: 'Token utilisateur signé' }),
  ofysId: Type.String({
    description:
      'Identifiant Ofys. Doit correspondre au claim user_ofys_id du token',
  }),
  prenom: Type.String(),
  nom: Type.String(),
  genre: Type.Optional(Nullable(Gender)),
  courrielPrincipal: Type.Optional(
    Nullable(
      Type.String({
        description:
          'Courriel principal. Doit être dans le claim verified_emails du token',
      }),
    ),
  ),
  professions: Type.Array(
    Type.Object({
      professionBraverId: Type.String(),
      numeroPratique: Type.String(),
    }),
  ),
  lieuxPratiqueOfysIds: Type.Array(Type.String(), {
    description:
      'Liste des IDs Ofys des lieux de pratique associés à cet utilisateur',
  }),
});
export type UserCreate = Static<typeof UserCreate>;

export const UserUpdate = Type.Object({
  tokenId: Type.String({
    description:
      "Token utilisateur signé. L'utilisateur identifié par ce token sera mis à jour",
  }),
  prenom: Type.String(),
  nom: Type.String(),
  genre: Type.Optional(Nullable(Gender)),
  courrielPrincipal: Type.Optional(Nullable(Type.String())),
  professions: Type.Array(
    Type.Object({
      professionBraverId: Type.String(),
      numeroPratique: Type.String(),
    }),
    { description: "Permet d'ajouter des professions" },
  ),
  lieuxPratiqueOfysIds: Type.Array(Type.String(), {
    description: "Permet d'ajouter des lieux de pratique",
  }),
});
export type UserUpdate = Static<typeof UserUpdate>;

export const User = Type.Object({
  braverUserId: Type.String({
    description: "Identifiant unique de l'utilisateur côté Braver",
  }),
});
export type User = Static<typeof User>;

// ============================================================================
// Patient Types
// ============================================================================

export const PatientCreate = Type.Object({
  ofysId: Type.String({ description: 'Identifiant Ofys' }),
  prenom: Type.String(),
  nom: Type.String(),
  sexeNaissance: Type.Optional(Nullable(Gender)),
  dateNaissance: Type.String({ format: 'date' }),
  courriel: Type.Optional(Nullable(Type.String())),
  nam: Type.String({ description: "Numéro d'assurance maladie" }),
});
export type PatientCreate = Static<typeof PatientCreate>;

export const PatientUpdate = Type.Partial(
  Type.Object({
    prenom: Type.Optional(Type.String()),
    nom: Type.Optional(Type.String()),
    sexeNaissance: Type.Optional(Nullable(Gender)),
    dateNaissance: Type.String({ format: 'date' }),
    courriel: Type.Optional(Nullable(Type.String())),
    nam: Type.String({ description: "Ne change qu'exceptionnellement" }),
  }),
);
export type PatientUpdate = Static<typeof PatientUpdate>;

export const Patient = Type.Object({
  braverPatientId: Type.String({
    description: 'Identifiant unique du patient côté Braver',
  }),
});
export type Patient = Static<typeof Patient>;

// ============================================================================
// Client & Practice Location Types
// ============================================================================

export const PracticeLocationInfo = Type.Object({
  rue: Type.String({ description: 'Numéro et nom de la rue' }),
  codePostal: Type.String(),
  ville: Type.String(),
  pays: ISOCountryCode,
  longitude: Type.Optional(Nullable(Type.Number())),
  latitude: Type.Optional(Nullable(Type.Number())),
});
export type PracticeLocationInfo = Static<typeof PracticeLocationInfo>;

export const PracticeLocationCreate = Type.Intersect([
  Type.Object({
    ofysId: Type.String({ description: 'Identifiant Ofys' }),
    nom: Type.String({ description: 'Nom du lieu de pratique' }),
    typeLieuBraverId: Type.String({
      description:
        "UUID du type de lieu (voir GET /typesLieux dans l'API frontend)",
    }),
  }),
  PracticeLocationInfo,
]);
export type PracticeLocationCreate = Static<typeof PracticeLocationCreate>;

export const PracticeLocationUpdate = Type.Object({
  nom: Type.Optional(
    Nullable(Type.String({ description: 'Nom du lieu de pratique' })),
  ),
  typeLieuBraverId: Type.Optional(
    Nullable(
      Type.String({
        description:
          "UUID du type de lieu (voir GET /typesLieux dans l'API frontend)",
      }),
    ),
  ),
  adresse: Type.Optional(Nullable(PracticeLocationInfo)),
});
export type PracticeLocationUpdate = Static<typeof PracticeLocationUpdate>;

export const PracticeLocation = Type.Object({
  braverWorkplaceId: Type.String({
    description: 'Identifiant unique du lieu côté Braver',
  }),
});
export type PracticeLocation = Static<typeof PracticeLocation>;

export const ClientCreate = Type.Object({
  ofysId: Type.String({
    description: 'Identifiant unique du client côté Ofys',
  }),
  nom: Type.String({ description: 'Nom de la clinique/organisation' }),
  lieux: Type.Optional(Type.Array(PracticeLocationCreate)),
});
export type ClientCreate = Static<typeof ClientCreate>;

export const Client = Type.Object({
  braverOrganizationId: Type.String({
    description: 'Identifiant unique du client côté Braver',
  }),
  braverWorkplaceIds: Type.Array(Type.String(), {
    description:
      'Identifiants uniques des lieux côté Braver, dans le même ordre que lors de la création',
  }),
});
export type Client = Static<typeof Client>;
