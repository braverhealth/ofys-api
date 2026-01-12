import type { OpenAPIV3_1 } from 'openapi-types';
import {
  UserCreate,
  UserUpdate,
  User,
  PatientCreate,
  PatientUpdate,
  Patient,
  ClientCreate,
  Client,
  PracticeLocationCreate,
  PracticeLocationUpdate,
  PracticeLocation,
} from '../types/backend.js';
import { ApiError } from '../types/common.js';

export const schema: OpenAPIV3_1.Document = {
  openapi: '3.1.0',
  info: {
    title: 'Braver Backend API – Provisionnement et Patients',
    version: '0.2.2',
    description: `API consommée par le backend d'Ofys pour provisionner les professionnels et synchroniser des patients.

## Modèle de Sécurité

L'API Backend utilise deux schémas d'authentification JWT:

1. **providerJwt** (Fournisseur Ofys):

   - Utilisé UNIQUEMENT pour POST /clients
   - Identifie le fournisseur Ofys (pas une clinique spécifique)
   - Claims: iss, aud, sub (identifiant fournisseur), iat, exp

2. **clinicJwt** (Clinique/Client):

   - Utilisé pour tous les autres endpoints
   - Identifie la clinique/client qui effectue la requête
   - Claims: iss, aud, tid (identifiant clinique), iat, exp

Chaque requête doit inclure un JWT valide dans l'en-tête:
\`\`\`
Authorization: Bearer <JWT>
\`\`\`

Aucun endpoint public. Voir SECURITY.md pour la documentation complète du modèle de sécurité.

## Idempotence

### Support de l'Idempotency-Key

Tous les endpoints POST et PUT supportent le header standard \`Idempotency-Key\` pour garantir l'idempotence.

**Format**: UUID v4 (ex: \`550e8400-e29b-41d4-a716-446655440000\`)

**Durée de garantie**: 1 heure

**Utilisation**: Inclure le header \`Idempotency-Key\` dans la requête:

\`\`\`
POST /clients
Idempotency-Key: 550e8400-e29b-41d4-a716-446655440000
\`\`\`

**Comportement**:

- Si la même requête est envoyée avec la même \`Idempotency-Key\` dans l'heure, la réponse en cache est retournée
- Évite les doublons en cas de retry réseau
- Applicable à: POST /clients, POST /lieux, POST /utilisateurs, POST /patients, PUT /lieu/{id}, PUT /utilisateur/{id}, PUT /patient/{id}`,
  },
  servers: [
    {
      url: '<À préciser prochainement>',
      description: 'Production',
    },
    {
      url: '<À préciser prochainement>',
      description: 'Sandbox',
    },
  ],
  tags: [
    { name: 'Clients' },
    { name: 'Lieux de Pratique' },
    { name: 'Utilisateurs' },
    { name: 'Patients' },
  ],
  security: [{ clinicJwt: [] }],
  paths: {
    '/clients': {
      post: {
        tags: ['Clients'],
        summary: 'Créer un nouveau client',
        description: `Crée un nouveau client (clinique/organisation) avec ses lieux de pratique associés.
Chaque client peut avoir plusieurs lieux de pratique (cliniques, pharmacies, services hospitaliers, etc.).

**Sécurité**: Authentification requise (providerJwt)

Note: Cet endpoint utilise providerJwt (identifiant le fournisseur Ofys) et non clinicJwt,
car le client n'existe pas encore au moment de sa création.`,
        operationId: 'createClient',
        security: [{ providerJwt: [] }],
        parameters: [{ $ref: '#/components/parameters/IdempotencyKey' }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/ClientCreate' },
            },
          },
        },
        responses: {
          '201': {
            description: 'Client créé',
            headers: {
              Location: { schema: { type: 'string' } },
            },
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Client' },
              },
            },
          },
          '400': {
            description: 'Données invalides',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ApiError' },
                example: {
                  error: {
                    code: 'VALIDATION_REQUIRED_FIELD',
                    message: "Le champ 'nom' est obligatoire",
                    details: { field: 'nom' },
                    timestamp: '2025-11-18T14:32:00Z',
                    traceId: 'abc-123-def',
                  },
                },
              },
            },
          },
          '409': {
            description: 'Client existe déjà',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ApiError' },
                example: {
                  error: {
                    code: 'CLIENT_ALREADY_EXISTS',
                    message: "Un client avec l'ID 'clinic-123' existe déjà",
                    details: { clientId: 'clinic-123' },
                    timestamp: '2025-11-18T14:32:00Z',
                    traceId: 'abc-123-def',
                  },
                },
              },
            },
          },
        },
      },
    },
    '/lieux': {
      post: {
        tags: ['Lieux de Pratique'],
        summary: 'Créer un nouveau lieu de pratique',
        description: `Crée un nouveau lieu de pratique pour le client authentifié.

**Sécurité**: Authentification requise (clinicJwt)`,
        operationId: 'createPracticeLocation',
        parameters: [{ $ref: '#/components/parameters/IdempotencyKey' }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/PracticeLocationCreate' },
            },
          },
        },
        responses: {
          '201': {
            description: 'Lieu de pratique créé',
            headers: {
              Location: { schema: { type: 'string' } },
            },
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/PracticeLocation' },
              },
            },
          },
          '400': {
            description: 'Données invalides',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ApiError' },
                example: {
                  error: {
                    code: 'VALIDATION_REQUIRED_FIELD',
                    message: "Le champ 'nom' est obligatoire",
                    details: { field: 'nom' },
                    timestamp: '2025-11-18T14:32:00Z',
                    traceId: 'abc-123-def',
                  },
                },
              },
            },
          },
          '409': {
            description: 'Lieu de pratique existe déjà',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ApiError' },
                example: {
                  error: {
                    code: 'PRACTICE_LOCATION_ALREADY_EXISTS',
                    message:
                      "Un lieu de pratique avec l'ID Ofys 'lieu-123' existe déjà",
                    details: { practiceLocationId: 'lieu-123' },
                    timestamp: '2025-11-18T14:32:00Z',
                    traceId: 'abc-123-def',
                  },
                },
              },
            },
          },
        },
      },
    },
    '/lieu/{id}': {
      put: {
        tags: ['Lieux de Pratique'],
        summary: 'Modifier un lieu de pratique',
        description: `Modifie les informations d'un lieu de pratique existant.

**Sécurité**: Authentification requise (clinicJwt)`,
        operationId: 'updatePracticeLocation',
        parameters: [
          { $ref: '#/components/parameters/PathId' },
          { $ref: '#/components/parameters/IdempotencyKey' },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/PracticeLocationUpdate' },
            },
          },
        },
        responses: {
          '200': {
            description: 'Lieu de pratique modifié',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/PracticeLocation' },
              },
            },
          },
          '400': {
            description: 'Données invalides',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ApiError' },
              },
            },
          },
          '404': {
            description: 'Lieu de pratique non trouvé',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ApiError' },
              },
            },
          },
        },
      },
      delete: {
        tags: ['Lieux de Pratique'],
        summary: 'Supprimer un lieu de pratique',
        description: `Supprime un lieu de pratique. Les utilisateurs associés à ce lieu perdront cette association.

**Sécurité**: Authentification requise (clinicJwt)`,
        operationId: 'deletePracticeLocation',
        parameters: [{ $ref: '#/components/parameters/PathId' }],
        responses: {
          '204': { description: 'Lieu de pratique supprimé' },
          '404': {
            description: 'Lieu de pratique non trouvé',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ApiError' },
              },
            },
          },
        },
      },
    },
    '/utilisateurs': {
      post: {
        tags: ['Utilisateurs'],
        summary: 'Créer un professionnel confirmé (activation DSQ)',
        description: `Notifie Braver qu'un professionnel confirmé (clé DSQ active) doit obtenir un accès.

**Sécurité**: Authentification requise (clinicJwt)`,
        operationId: 'createUser',
        parameters: [{ $ref: '#/components/parameters/IdempotencyKey' }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/UserCreate' },
            },
          },
        },
        responses: {
          '201': {
            description: 'Créé',
            headers: {
              Location: { schema: { type: 'string' } },
            },
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/User' },
              },
            },
          },
          '400': {
            description: 'Données invalides',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ApiError' },
                example: {
                  error: {
                    code: 'VALIDATION_REQUIRED_FIELD',
                    message: "Le champ 'prenom' est obligatoire",
                    details: { field: 'prenom' },
                    timestamp: '2025-11-18T14:32:00Z',
                    traceId: 'abc-123-def',
                  },
                },
              },
            },
          },
          '409': {
            description: 'Utilisateur existe déjà',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ApiError' },
                example: {
                  error: {
                    code: 'USER_ALREADY_EXISTS',
                    message: 'Un utilisateur avec le ID Ofys existe déjà',
                    details: { userId: 'prof-123' },
                    timestamp: '2025-11-18T14:32:00Z',
                    traceId: 'abc-123-def',
                  },
                },
              },
            },
          },
        },
      },
    },
    '/utilisateur/{id}': {
      put: {
        tags: ['Utilisateurs'],
        summary: 'Mettre à jour un professionnel',
        description: '**Sécurité**: Authentification requise (clinicJwt)',
        operationId: 'updateUser',
        parameters: [{ $ref: '#/components/parameters/PathId' }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/UserUpdate' },
            },
          },
        },
        responses: {
          '200': {
            description: 'Mis à jour',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/User' },
              },
            },
          },
          '400': {
            description: 'Données invalides',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ApiError' },
              },
            },
          },
          '404': {
            description: 'Utilisateur introuvable',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ApiError' },
                example: {
                  error: {
                    code: 'USER_NOT_FOUND',
                    message: "L'utilisateur avec l'ID 'prof-123' n'existe pas",
                    details: { userId: 'prof-123' },
                    timestamp: '2025-11-18T14:32:00Z',
                    traceId: 'abc-123-def',
                  },
                },
              },
            },
          },
        },
      },
      delete: {
        tags: ['Utilisateurs'],
        summary: "Désactiver un professionnel (retirer l'accès)",
        description: '**Sécurité**: Authentification requise (clinicJwt)',
        operationId: 'deleteUser',
        parameters: [{ $ref: '#/components/parameters/PathId' }],
        responses: {
          '204': { description: 'Désactivé' },
          '404': {
            description: 'Utilisateur introuvable',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ApiError' },
              },
            },
          },
        },
      },
    },
    '/patients': {
      post: {
        tags: ['Patients'],
        summary: 'Créer un patient (profil démographique minimal confirmé)',
        description: `Envoyer uniquement des dossiers complets (id, prénom, nom, dateNaissance, sexeNaissance, nam).

**Sécurité**: Authentification requise (clinicJwt)`,
        operationId: 'createPatient',
        parameters: [{ $ref: '#/components/parameters/IdempotencyKey' }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/PatientCreate' },
            },
          },
        },
        responses: {
          '201': {
            description: 'Créé',
            headers: {
              Location: { schema: { type: 'string' } },
            },
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Patient' },
              },
            },
          },
          '400': {
            description: 'Données invalides',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ApiError' },
                example: {
                  error: {
                    code: 'VALIDATION_REQUIRED_FIELD',
                    message: "Le champ 'nam' est obligatoire",
                    details: { field: 'nam' },
                    timestamp: '2025-11-18T14:32:00Z',
                    traceId: 'abc-123-def',
                  },
                },
              },
            },
          },
          '409': {
            description: 'Patient existe déjà',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ApiError' },
                example: {
                  error: {
                    code: 'PATIENT_ALREADY_EXISTS',
                    message: "Un patient avec le NAM 'nam-123' existe déjà",
                    details: { nam: 'nam-123' },
                    timestamp: '2025-11-18T14:32:00Z',
                    traceId: 'abc-123-def',
                  },
                },
              },
            },
          },
        },
      },
    },
    '/patient/{id}': {
      put: {
        tags: ['Patients'],
        summary: 'Mettre à jour un patient',
        description: '**Sécurité**: Authentification requise (clinicJwt)',
        operationId: 'updatePatient',
        parameters: [{ $ref: '#/components/parameters/PathId' }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/PatientUpdate' },
            },
          },
        },
        responses: {
          '200': {
            description: 'Mis à jour',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Patient' },
              },
            },
          },
          '400': {
            description: 'Données invalides',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ApiError' },
              },
            },
          },
          '404': {
            description: 'Patient introuvable',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ApiError' },
                example: {
                  error: {
                    code: 'PATIENT_NOT_FOUND',
                    message: "Le patient avec l'ID 'patient-123' n'existe pas",
                    details: { patientId: 'patient-123' },
                    timestamp: '2025-11-18T14:32:00Z',
                    traceId: 'abc-123-def',
                  },
                },
              },
            },
          },
        },
      },
      delete: {
        tags: ['Patients'],
        summary: 'Archiver un patient (décès, désassociation)',
        description: '**Sécurité**: Authentification requise (clinicJwt)',
        operationId: 'deletePatient',
        parameters: [{ $ref: '#/components/parameters/PathId' }],
        responses: {
          '204': { description: 'Archivé' },
          '404': {
            description: 'Patient introuvable',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ApiError' },
              },
            },
          },
        },
      },
    },
  },
  components: {
    securitySchemes: {
      providerJwt: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: `Jeton identifiant le fournisseur Ofys (pour créer des clients).
Utilisé UNIQUEMENT pour POST /clients.
Claims suggérés:
- iss: émetteur Ofys
- aud: "<installation URL à préciser>"
- sub: identifiant du fournisseur Ofys
- iat, exp`,
      },
      clinicJwt: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: `Jeton backend identifiant la clinique (client).
Claims suggérés:
- iss: émetteur Ofys
- aud: "<installation URL à préciser>"
- tid: identifiant clinique/client
- iat, exp`,
      },
    },
    parameters: {
      PathId: {
        name: 'id',
        in: 'path',
        required: true,
        schema: { type: 'string' },
        description:
          "Identifiant Ofys de l'utilisateur/patient/lieu de pratique",
      },
      IdempotencyKey: {
        name: 'Idempotency-Key',
        in: 'header',
        required: false,
        schema: { type: 'string', format: 'uuid' },
        description:
          "UUID v4 pour garantir l'idempotence (optionnel, durée 1h)",
      },
    },
    schemas: {
      UserCreate,
      UserUpdate,
      User,
      PatientCreate,
      PatientUpdate,
      Patient,
      ClientCreate,
      Client,
      PracticeLocationCreate,
      PracticeLocationUpdate,
      PracticeLocation,
      ApiError,
    },
  },
};
