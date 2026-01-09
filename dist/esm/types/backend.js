"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Client = exports.ClientCreate = exports.PracticeLocation = exports.PracticeLocationUpdate = exports.PracticeLocationCreate = exports.Patient = exports.PatientUpdate = exports.PatientCreate = exports.User = exports.UserUpdate = exports.UserCreate = void 0;
const typebox_1 = require("@sinclair/typebox");
const common_js_1 = require("./common.js");
/**
 * Braver Backend API – Provisionnement et Patients
 * Type definitions for the backend API consumed by Ofys
 */
// ============================================================================
// User Types
// ============================================================================
exports.UserCreate = typebox_1.Type.Object({
    id: typebox_1.Type.String({ description: 'Identifiant Ofys' }),
    prenom: typebox_1.Type.String(),
    nom: typebox_1.Type.String(),
    courriel: typebox_1.Type.Optional((0, common_js_1.Nullable)(typebox_1.Type.String())),
    genre: typebox_1.Type.Optional((0, common_js_1.Nullable)(common_js_1.Gender)),
    professions: typebox_1.Type.Array(typebox_1.Type.String()),
    numeroPratique: typebox_1.Type.String({
        description: 'Numéro de pratique (ex. numéro de licence)',
    }),
    lieuxPratiqueIds: typebox_1.Type.Array(typebox_1.Type.String(), {
        description: 'Liste des IDs Ofys des lieux de pratique associés à cet utilisateur',
    }),
});
exports.UserUpdate = typebox_1.Type.Partial(typebox_1.Type.Object({
    prenom: typebox_1.Type.String(),
    nom: typebox_1.Type.String(),
    courriel: (0, common_js_1.Nullable)(typebox_1.Type.String()),
    genre: (0, common_js_1.Nullable)(common_js_1.Gender),
    professions: typebox_1.Type.Array(typebox_1.Type.String()),
    lieuxPratiqueIds: typebox_1.Type.Array(typebox_1.Type.String(), {
        description: 'Liste des IDs Ofys des lieux de pratique associés à cet utilisateur',
    }),
}));
exports.User = exports.UserCreate;
// ============================================================================
// Patient Types
// ============================================================================
exports.PatientCreate = typebox_1.Type.Object({
    id: typebox_1.Type.String({ description: 'Identifiant Ofys' }),
    prenom: typebox_1.Type.String(),
    nom: typebox_1.Type.String(),
    sexeNaissance: typebox_1.Type.Optional((0, common_js_1.Nullable)(common_js_1.Gender)),
    dateNaissance: typebox_1.Type.String({ format: 'date' }),
    nam: typebox_1.Type.String({ description: "Numéro d'assurance maladie" }),
});
exports.PatientUpdate = typebox_1.Type.Partial(typebox_1.Type.Object({
    prenom: typebox_1.Type.String(),
    nom: typebox_1.Type.String(),
    sexeActuel: (0, common_js_1.Nullable)(common_js_1.Gender),
    courriel: (0, common_js_1.Nullable)(typebox_1.Type.String()),
    nam: typebox_1.Type.String({ description: "Ne change qu'exceptionnellement" }),
}));
exports.Patient = typebox_1.Type.Intersect([
    exports.PatientCreate,
    typebox_1.Type.Object({
        braverPatientId: typebox_1.Type.String({
            description: 'Identifiant unique du patient côté Braver',
        }),
    }),
]);
// ============================================================================
// Client & Practice Location Types
// ============================================================================
exports.PracticeLocationCreate = typebox_1.Type.Object({
    nom: typebox_1.Type.String({ description: 'Nom du lieu de pratique' }),
    typeLieu: typebox_1.Type.String({
        format: 'uuid',
        description: "UUID du type de lieu (voir GET /typesLieux dans l'API frontend)",
    }),
    rue: typebox_1.Type.Optional((0, common_js_1.Nullable)(typebox_1.Type.String({ description: 'Numéro et nom de la rue' }))),
    codePostal: typebox_1.Type.Optional((0, common_js_1.Nullable)(typebox_1.Type.String())),
    ville: typebox_1.Type.Optional((0, common_js_1.Nullable)(typebox_1.Type.String())),
    pays: typebox_1.Type.Optional((0, common_js_1.Nullable)(common_js_1.ISOCountryCode)),
    longitude: typebox_1.Type.Optional((0, common_js_1.Nullable)(typebox_1.Type.Number())),
    latitude: typebox_1.Type.Optional((0, common_js_1.Nullable)(typebox_1.Type.Number())),
});
exports.PracticeLocationUpdate = typebox_1.Type.Partial(exports.PracticeLocationCreate);
exports.PracticeLocation = typebox_1.Type.Intersect([
    exports.PracticeLocationCreate,
    typebox_1.Type.Object({
        braverWorkplaceId: typebox_1.Type.String({
            description: 'Identifiant unique du lieu côté Braver',
        }),
    }),
]);
exports.ClientCreate = typebox_1.Type.Object({
    id: typebox_1.Type.String({ description: 'Identifiant unique du client côté Ofys' }),
    nom: typebox_1.Type.String({ description: 'Nom de la clinique/organisation' }),
    lieux: typebox_1.Type.Optional(typebox_1.Type.Array(exports.PracticeLocationCreate)),
});
exports.Client = typebox_1.Type.Intersect([
    exports.ClientCreate,
    typebox_1.Type.Object({
        braverOrganizationId: typebox_1.Type.String({
            description: 'Identifiant unique du client côté Braver',
        }),
    }),
]);
