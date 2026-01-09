import { BraverToken, ActiveThreadStats, ThreadListResponse, ThreadSummary, Thread, ThreadCreate, ThreadUpdate, ThreadParticipantRef, Participant, PracticeLocation, PatientMini, PatientDetails, PatientCreateForThread, Message, MessageWithContent, MessageWithAttachment, MessageContent, MessageCreate, Attachment, AttachmentCreate, ProfessionalProfile, ClinicProfile, Profession, LocationType, WebSocketMessage, WebSocketMessageNewThread, WebSocketMessageNewMessage, WebSocketMessageThreadUpdated, WebSocketMessageThreadClosed, } from '../types/frontend.js';
import { ApiError } from '../types/common.js';
const INFO_DESCRIPTION = `API exposée par Braver et consommée par Ofys pour la consultation, la création et la gestion des fils de discussion,
la consultation des statistiques sur les fils actifs, la recherche de professionnels et de cliniques,
ainsi qu'un canal WebSocket pour les activités en temps réel liées aux fils.

## Modèle de Sécurité

L'API utilise deux schémas d'authentification JWT:

1. **ofysJwt** (Authentification Ofys):
   - Utilisé UNIQUEMENT pour l'endpoint POST /auth/token
   - JWT signé par Ofys
   - Permet d'obtenir un braverJwt

2. **braverJwt** (Authentification Braver):
   - Utilisé pour TOUS les autres endpoints (sauf /professions et /typesLieux)
   - JWT émis par Braver après échange via POST /auth/token
   - Inclus dans l'en-tête Authorization: Bearer <token>

3. **Endpoints Publics** (pas d'authentification requise):
   - GET /professions
   - GET /typesLieux
   - Ces endpoints retournent des données de référence statiques

Voir chaque endpoint pour son modèle de sécurité spécifique.

## Limites et Pagination

### Fils de Discussion

- **Limite max par requête**: 50 fils
- **Limite par défaut**: 20 fils
- **Pagination**: Basée sur l'ID du dernier fil connu (cursor-based)
- **Ordre**: Du plus récent au plus ancien (par date de création)
- **Utilisation**:
  - Première requête: Pas de paramètre → retourne les 20 fils les plus récents
  - Requête suivante: Passer l'ID du dernier fil reçu → retourne les 20 fils suivants

### Messages

- **Limite max par requête**: 100 messages
- **Limite par défaut**: 50 messages
- **Pagination**: Basée sur \`sequenceId\` avec \`offset\` et \`limit\` (voir GET /fil/{id})
- **Ordre**: Du plus récent au moins récent

### Pièces Jointes

- **Taille max totale par message**: 2 GB
- **Nombre max de fichiers par message**: 10
- **Types MIME autorisés**: Tous sauf les types à risque (.exe, .bat, .com, .cmd, .scr, .vbs, .js, .jar, etc.)

### Recherche

- **Limite max de résultats**: 100 résultats
- **Pagination**: Basée sur \`limit\` et \`offset\`

### Rate Limiting

- À déterminer (voir documentation de déploiement)

## Authentification et Tokens

### Obtention du Token

- **Endpoint**: POST /auth/token
- **Authentification requise**: ofysJwt (JWT signé par Ofys)
- **Réponse**: braverJwt avec \`expires_in\` en secondes

### Durée d'Expiration

- **Token Braver (braverJwt)**: 24 heures (86400 secondes)
- **Refresh**: Un nouveau token peut être obtenu en utilisant le token Ofys que contrôle Ofys
- **Méthode**: Appeler à nouveau POST /auth/token avec un nouveau ofysJwt

### WebSocket

- **Token requis**: braverJwt passé en query parameter lors de la connexion initiale
- **Expiration**: Le token n'expire PAS tant que la connexion WebSocket reste ouverte
- **Reconnexion**: Si la connexion est fermée, un nouveau token doit être obtenu pour se reconnecter

## Idempotence

### Support de l'Idempotency-Key

Tous les endpoints POST et PUT supportent le header standard \`Idempotency-Key\` pour garantir l'idempotence.

**Format**: UUID v4 (ex: \`550e8400-e29b-41d4-a716-446655440000\`)

**Durée de garantie**: 1 heure

**Utilisation**: Inclure le header \`Idempotency-Key\` dans la requête:

\`\`\`
POST /fils
Idempotency-Key: 550e8400-e29b-41d4-a716-446655440000
\`\`\`

**Comportement**:

- Si la même requête est envoyée avec la même \`Idempotency-Key\` dans l'heure, la réponse en cache est retournée
- Évite les doublons en cas de retry réseau ou de clics multiples
- Applicable à: POST /fils, POST /fil/{id}/messages, POST /utilisateurs, POST /patients, etc.

## Statuts et Permissions des Participants

### Statuts des Participants

Chaque participant dans une discussion a un statut qui détermine son accès:

- **pending**: En attente d'activation (invitation envoyée, pas encore acceptée)
- **active**: Participant actif dans la discussion
- **left**: Participant qui a quitté la discussion (perd accès aux messages)

**Comportement lors du départ**:

- Quand un professionnel quitte une clinique, il perd ses accès aux discussions liées au client Ofys
- Ces discussions peuvent être récupérées par la clinique
- Les discussions peuvent être transférées à un autre médecin au besoin

### Permissions des Participants

Chaque participant peut avoir des contraintes qui restreignent ce qu'il peut contribuer:

- **read_only**: Peut lire les messages mais ne peut pas contribuer
- **reactions_only**: Peut ajouter des réactions aux messages uniquement
- **messages_only**: Peut poster des messages mais pas de réactions
- **full**: Accès complet (messages et réactions)

**Exemple**: Un participant peut être en statut "active" avec permission "read_only" pour une discussion spécifique.

## Pièces Jointes

### Limites des Pièces Jointes

- **Taille par fichier en base64**: 50 MB maximum (≈ 37.5 MB de données réelles)
- **Taille totale par message**: 2 GB maximum
- **Nombre de fichiers par message**: 10 fichiers maximum
- **Types MIME autorisés**: Tous les types sauf les types à risque

### Types MIME Interdits

Les types MIME suivants sont interdits pour des raisons de sécurité:
- Exécutables: \`.exe\`, \`.bat\`, \`.com\`, \`.cmd\`, \`.scr\`, \`.vbs\`, \`.js\`, \`.jar\`, \`.msi\`, \`.dll\`, \`.sys\`
- Scripts: \`.ps1\`, \`.sh\`, \`.bash\`, \`.zsh\`, \`.fish\`
- Archives exécutables: \`.zip\` contenant des exécutables, \`.rar\`, \`.7z\` contenant des exécutables
- Autres: \`.app\`, \`.dmg\`, \`.pkg\`, \`.deb\`, \`.rpm\`

### Formats de Transmission

Les pièces jointes peuvent être transmises de deux façons:
1. **Base64**: Contenu encodé en base64 dans le champ \`contenuBase64\`
2. **URL**: Lien de téléchargement dans le champ \`urlTelechargement\`

### Exemple de Requête

\`\`\`json
POST /fil/{id}/messages
{
  "contenu": "Voici le document",
  "format": "texte",
  "attachments": [
    {
      "nomFichier": "rapport.pdf",
      "typeMime": "application/pdf",
      "description": "Rapport médical",
      "contenuBase64": "JVBERi0xLjQKJeLj..."
    }
  ]
}
\`\`\``;
export const schema = {
    openapi: '3.1.0',
    info: {
        title: 'Braver API (Ofys Integration)',
        version: '0.2.2',
        description: INFO_DESCRIPTION,
        contact: {
            name: 'Braver API Team',
            url: 'https://www.braver.net',
            email: 'developers@braver.net',
        },
    },
    servers: [
        { url: '<À préciser prochainement>', description: 'Production' },
        { url: '<À préciser prochainement>', description: 'Sandbox' },
    ],
    tags: [
        { name: 'Authentification' },
        { name: 'Fils' },
        { name: 'Recherche' },
        { name: 'Temps Réel' },
    ],
    security: [{ braverJwt: [] }],
    paths: {
        '/auth/token': {
            post: {
                tags: ['Authentification'],
                summary: "Obtenir un jeton Braver à partir d'un JWT Ofys",
                description: `Ofys appelle cet endpoint en présentant un JWT signé dans Authorization: Bearer <token>.
L'API valide ce jeton et retourne un JWT émis par Braver qui pourra être utilisé pour tous les autres appels de cette API.

**Durée d'expiration**: 24 heures (86400 secondes)

**Refresh**: Pour obtenir un nouveau token après expiration, appeler à nouveau cet endpoint avec un nouveau ofysJwt.

**Sécurité**: Authentification requise (ofysJwt)`,
                operationId: 'exchangeOfysJwtForBraverJwt',
                security: [{ ofysJwt: [] }],
                responses: {
                    '200': {
                        description: 'Jeton Braver émis',
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/BraverToken' },
                            },
                        },
                    },
                    '401': {
                        description: 'JWT Ofys invalide ou expiré',
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/ApiError' },
                                examples: {
                                    tokenExpired: {
                                        value: {
                                            error: {
                                                code: 'AUTH_TOKEN_EXPIRED',
                                                message: 'Le token Ofys a expiré',
                                                timestamp: '2025-11-18T14:32:00Z',
                                                traceId: 'abc-123-def',
                                            },
                                        },
                                    },
                                    tokenInvalid: {
                                        value: {
                                            error: {
                                                code: 'AUTH_TOKEN_INVALID',
                                                message: 'Signature du token invalide',
                                                timestamp: '2025-11-18T14:32:00Z',
                                                traceId: 'abc-123-def',
                                            },
                                        },
                                    },
                                    clinicUnknown: {
                                        value: {
                                            error: {
                                                code: 'AUTH_CLINIC_UNKNOWN',
                                                message: 'Clinic ID non reconnu',
                                                details: { clinicId: 'clinic-999' },
                                                timestamp: '2025-11-18T14:32:00Z',
                                                traceId: 'abc-123-def',
                                            },
                                        },
                                    },
                                    userNotProvisioned: {
                                        value: {
                                            error: {
                                                code: 'AUTH_USER_NOT_PROVISIONED',
                                                message: 'Utilisateur non créé dans Braver',
                                                details: { userId: 'user-123' },
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
            },
        },
        '/fils/actifs/stats': {
            get: {
                tags: ['Fils'],
                summary: 'Statistiques des fils actifs',
                description: `Retourne des compteurs à afficher dans Ofys.
Inclut le nombre de fils actifs (ouverts) et le nombre total de messages non lus.

**Sécurité**: Authentification requise (braverJwt)`,
                operationId: 'getActiveThreadStats',
                responses: {
                    '200': {
                        description: 'Statistiques',
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/ActiveThreadStats' },
                            },
                        },
                    },
                },
            },
        },
        '/fils/actifs': {
            get: {
                tags: ['Fils'],
                summary: 'Lister les fils actifs',
                description: `Retourne les fils actifs (non fermés) avec métadonnées résumées, participants, lieux et infos patient minimales.
Le contenu détaillé (messages) se trouve via GET /fil/{id}.

**Pagination**: Basée sur le curseur (ID du dernier fil connu)
- Première requête: Pas de paramètre \`afterThreadId\` → retourne les N fils les plus récents
- Requête suivante: Passer l'ID du dernier fil reçu → retourne les N fils suivants
- **Ordre**: Du plus récent au plus ancien (par date de création)

**Sécurité**: Authentification requise (braverJwt)`,
                operationId: 'listActiveThreads',
                parameters: [
                    {
                        in: 'query',
                        name: 'afterThreadId',
                        schema: { type: 'string', format: 'uuid' },
                        description: 'Optionnel—ID du dernier fil connu. Si fourni, retourne les fils créés avant celui-ci. Omettez ce paramètre pour obtenir les fils les plus récents.',
                    },
                    {
                        in: 'query',
                        name: 'limit',
                        schema: { type: 'integer', minimum: 1, maximum: 50, default: 20 },
                        description: 'Nombre de fils à retourner (max 50, défaut 20)',
                    },
                ],
                responses: {
                    '200': {
                        description: 'Liste paginée des fils actifs',
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/ThreadListResponse' },
                            },
                        },
                    },
                },
            },
        },
        '/fil/{id}': {
            get: {
                tags: ['Fils'],
                summary: "Détails complets d'un fil (messages et métadonnées)",
                description: '**Sécurité**: Authentification requise (braverJwt)',
                operationId: 'getThread',
                parameters: [
                    { $ref: '#/components/parameters/PathId' },
                    {
                        in: 'query',
                        name: 'offset',
                        schema: { type: 'integer', minimum: 0, default: 0 },
                        description: 'Offset pour la pagination (nombre de messages à sauter)',
                    },
                    {
                        in: 'query',
                        name: 'limit',
                        schema: { type: 'integer', minimum: 1, maximum: 100, default: 50 },
                        description: 'Nombre max de messages à retourner (max 100, défaut 50)',
                    },
                    {
                        in: 'query',
                        name: 'sinceSequenceId',
                        schema: { type: 'integer', minimum: 0 },
                        description: 'Optionnel—récupérer les messages depuis un sequenceId (du plus récent au moins récent)',
                    },
                ],
                responses: {
                    '200': {
                        description: 'Fil',
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/Thread' },
                            },
                        },
                    },
                    '401': {
                        description: 'Non autorisé',
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/ApiError' },
                            },
                        },
                    },
                    '404': {
                        description: 'Fil non trouvé',
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/ApiError' },
                                example: {
                                    error: {
                                        code: 'THREAD_NOT_FOUND',
                                        message: "Le fil avec l'ID 'thread-123' n'existe pas",
                                        details: { threadId: 'thread-123' },
                                        timestamp: '2025-11-18T14:32:00Z',
                                        traceId: 'abc-123-def',
                                    },
                                },
                            },
                        },
                    },
                },
            },
            put: {
                tags: ['Fils'],
                summary: "Mettre à jour l'état du fil",
                description: `Permet de marquer comme lu jusqu'à un sequenceId, marquer globalement comme non lu,
mettre en sourdine pour une durée, associer un patient Ofys, fermer ou quitter le fil.

**Association d'un patient Ofys**:
Lorsque \`associerPatient\` est fourni, la requête doit inclure les détails complets du patient
(id, prenom, nom, sexeNaissance, dateNaissance, nam) comme lors d'une création de patient backend.
C'est souvent à ce moment que Braver prend connaissance du patient pour la première fois.

**Sécurité**: Authentification requise (braverJwt)`,
                operationId: 'updateThread',
                parameters: [{ $ref: '#/components/parameters/PathId' }],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: { $ref: '#/components/schemas/ThreadUpdate' },
                        },
                    },
                },
                responses: {
                    '200': {
                        description: 'Fil mis à jour',
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/Thread' },
                            },
                        },
                    },
                    '400': {
                        description: 'Requête invalide',
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/ApiError' },
                                examples: {
                                    threadClosed: {
                                        value: {
                                            error: {
                                                code: 'VALIDATION_THREAD_CLOSED',
                                                message: 'Tentative de modifier un fil fermé',
                                                details: { threadId: 'thread-123' },
                                                timestamp: '2025-11-18T14:32:00Z',
                                                traceId: 'abc-123-def',
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                    '401': {
                        description: 'Non autorisé',
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/ApiError' },
                            },
                        },
                    },
                    '404': {
                        description: 'Fil non trouvé',
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/ApiError' },
                            },
                        },
                    },
                },
            },
        },
        '/fil/{id}/messages': {
            post: {
                tags: ['Fils'],
                summary: 'Poster un message dans un fil',
                description: `Ajoute un nouveau message au fil avec contenu textuel (texte brut ou markdown)
et zéro ou plusieurs pièces jointes (fichiers en base64 ou URLs).

**Sécurité**: Authentification requise (braverJwt)`,
                operationId: 'postMessage',
                parameters: [
                    { $ref: '#/components/parameters/PathId' },
                    { $ref: '#/components/parameters/IdempotencyKey' },
                ],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: { $ref: '#/components/schemas/MessageCreate' },
                        },
                    },
                },
                responses: {
                    '201': {
                        description: 'Message créé',
                        headers: {
                            Location: { schema: { type: 'string' } },
                        },
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/Message' },
                            },
                        },
                    },
                    '400': {
                        description: 'Requête invalide',
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/ApiError' },
                                examples: {
                                    attachmentTooLarge: {
                                        value: {
                                            error: {
                                                code: 'VALIDATION_ATTACHMENT_TOO_LARGE',
                                                message: 'Taille totale des pièces jointes dépasse 2GB',
                                                details: {
                                                    maxSize: 2147483648,
                                                    currentSize: 2500000000,
                                                },
                                                timestamp: '2025-11-18T14:32:00Z',
                                                traceId: 'abc-123-def',
                                            },
                                        },
                                    },
                                    tooManyAttachments: {
                                        value: {
                                            error: {
                                                code: 'VALIDATION_ATTACHMENT_COUNT_EXCEEDED',
                                                message: 'Maximum 10 pièces jointes par message',
                                                details: { maxCount: 10, currentCount: 15 },
                                                timestamp: '2025-11-18T14:32:00Z',
                                                traceId: 'abc-123-def',
                                            },
                                        },
                                    },
                                    invalidMimeType: {
                                        value: {
                                            error: {
                                                code: 'VALIDATION_ATTACHMENT_INVALID_TYPE',
                                                message: 'Type de fichier non supporté',
                                                details: {
                                                    mimeType: 'application/x-msdownload',
                                                    allowedTypes: [
                                                        'image/*',
                                                        'application/pdf',
                                                        'application/msword',
                                                    ],
                                                },
                                                timestamp: '2025-11-18T14:32:00Z',
                                                traceId: 'abc-123-def',
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                    '401': {
                        description: 'Non autorisé',
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/ApiError' },
                            },
                        },
                    },
                    '404': {
                        description: 'Fil non trouvé',
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/ApiError' },
                            },
                        },
                    },
                },
            },
        },
        '/professions': {
            get: {
                tags: ['Recherche'],
                summary: 'Lister les professions disponibles',
                description: `Retourne la liste de toutes les professions connues par Braver, chacune avec un UUID unique,
des libellés localisés et genrés, ainsi que le type de profession (clinique sans licence, clinique licencié, non-clinique).
Ces IDs sont utilisés dans la recherche de professionnels et l'identification des participants dans les discussions.

**Sécurité**: AUCUNE authentification requise (endpoint public)`,
                operationId: 'listProfessions',
                security: [],
                responses: {
                    '200': {
                        description: 'Liste des professions',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        professions: {
                                            type: 'array',
                                            items: { $ref: '#/components/schemas/Profession' },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
        '/typesLieux': {
            get: {
                tags: ['Recherche'],
                summary: 'Lister les types de lieux disponibles',
                description: `Retourne la liste de tous les types de lieux connus par Braver (cliniques, pharmacies, services hospitaliers, etc.),
chacun avec un UUID unique et des libellés localisés.
Ces IDs sont utilisés dans la recherche de cliniques et l'identification des lieux dans les discussions.

**Sécurité**: AUCUNE authentification requise (endpoint public)`,
                operationId: 'listLocationTypes',
                security: [],
                responses: {
                    '200': {
                        description: 'Liste des types de lieux',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        typesLieux: {
                                            type: 'array',
                                            items: { $ref: '#/components/schemas/LocationType' },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
        '/rechercheDeProfessionnels': {
            get: {
                tags: ['Recherche'],
                summary: 'Rechercher des professionnels',
                description: '**Sécurité**: Authentification requise (braverJwt)',
                operationId: 'searchProfessionals',
                parameters: [
                    {
                        in: 'query',
                        name: 'termes',
                        required: true,
                        schema: { type: 'string' },
                        description: 'Termes séparés par virgules',
                    },
                    {
                        in: 'query',
                        name: 'profession',
                        schema: {
                            type: 'string',
                            description: 'UUID de profession (voir GET /professions)',
                        },
                    },
                    {
                        in: 'query',
                        name: 'longitude',
                        schema: { type: 'number', format: 'double' },
                    },
                    {
                        in: 'query',
                        name: 'latitude',
                        schema: { type: 'number', format: 'double' },
                    },
                    {
                        in: 'query',
                        name: 'limit',
                        schema: { type: 'integer', minimum: 1, maximum: 100, default: 20 },
                        description: 'Nombre max de résultats (max 100, défaut 20)',
                    },
                    {
                        in: 'query',
                        name: 'offset',
                        schema: { type: 'integer', minimum: 0, default: 0 },
                        description: 'Offset pour la pagination',
                    },
                ],
                responses: {
                    '200': {
                        description: 'Résultats',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        results: {
                                            type: 'array',
                                            items: {
                                                $ref: '#/components/schemas/ProfessionalProfile',
                                            },
                                        },
                                        total: {
                                            type: 'integer',
                                            description: 'Nombre total de résultats disponibles',
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
        '/rechercheDeCliniques': {
            get: {
                tags: ['Recherche'],
                summary: 'Rechercher des cliniques',
                description: '**Sécurité**: Authentification requise (braverJwt)',
                operationId: 'searchClinics',
                parameters: [
                    {
                        in: 'query',
                        name: 'termes',
                        required: true,
                        schema: { type: 'string' },
                    },
                    {
                        in: 'query',
                        name: 'typeLieu',
                        schema: {
                            type: 'string',
                            format: 'uuid',
                            description: 'UUID du type de lieu (voir GET /typesLieux)',
                        },
                    },
                    {
                        in: 'query',
                        name: 'longitude',
                        schema: { type: 'number', format: 'double' },
                    },
                    {
                        in: 'query',
                        name: 'latitude',
                        schema: { type: 'number', format: 'double' },
                    },
                    {
                        in: 'query',
                        name: 'limit',
                        schema: { type: 'integer', minimum: 1, maximum: 100, default: 20 },
                        description: 'Nombre max de résultats (max 100, défaut 20)',
                    },
                    {
                        in: 'query',
                        name: 'offset',
                        schema: { type: 'integer', minimum: 0, default: 0 },
                        description: 'Offset pour la pagination',
                    },
                ],
                responses: {
                    '200': {
                        description: 'Résultats',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        results: {
                                            type: 'array',
                                            items: { $ref: '#/components/schemas/ClinicProfile' },
                                        },
                                        total: {
                                            type: 'integer',
                                            description: 'Nombre total de résultats disponibles',
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
        '/fils': {
            post: {
                tags: ['Fils'],
                summary: 'Créer un nouveau fil',
                description: `Crée un fil avec participants (professionnels et/ou cliniques), contenu initial et association patient.

**Association d'un patient Ofys**:
Lorsque \`patient\` est fourni, la requête doit inclure les détails complets du patient
(id, prenom, nom, sexeNaissance, dateNaissance, nam) comme lors d'une création de patient backend.
C'est souvent à ce moment que Braver prend connaissance du patient pour la première fois.

**Sécurité**: Authentification requise (braverJwt)`,
                operationId: 'createThread',
                parameters: [{ $ref: '#/components/parameters/IdempotencyKey' }],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: { $ref: '#/components/schemas/ThreadCreate' },
                        },
                    },
                },
                responses: {
                    '201': {
                        description: 'Fil créé',
                        headers: {
                            Location: {
                                description: 'URL de la ressource nouvellement créée',
                                schema: { type: 'string' },
                            },
                        },
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/Thread' },
                            },
                        },
                    },
                    '400': {
                        description: 'Données invalides',
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/ApiError' },
                                examples: {
                                    missingTitle: {
                                        value: {
                                            error: {
                                                code: 'VALIDATION_REQUIRED_FIELD',
                                                message: "Le champ 'titre' est obligatoire",
                                                details: { field: 'titre' },
                                                timestamp: '2025-11-18T14:32:00Z',
                                                traceId: 'abc-123-def',
                                            },
                                        },
                                    },
                                    invalidParticipant: {
                                        value: {
                                            error: {
                                                code: 'VALIDATION_PARTICIPANT_NOT_FOUND',
                                                message: "Le participant avec l'ID 'prof-123' n'existe pas",
                                                details: {
                                                    participantId: 'prof-123',
                                                    field: 'participants[0].id',
                                                },
                                                timestamp: '2025-11-18T14:32:00Z',
                                                traceId: 'abc-123-def',
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                    '401': {
                        description: 'Non autorisé',
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/ApiError' },
                            },
                        },
                    },
                },
            },
        },
        '/fils/activites': {
            get: {
                tags: ['Temps Réel'],
                summary: 'Établir une connexion WebSocket pour les activités en temps réel',
                description: `Établit une connexion WebSocket pour recevoir en temps réel les événements affectant les fils actifs.

**Sécurité**: Authentification requise (braverJwt)

**Authentification WebSocket**: Le token braverJwt doit être passé en query parameter lors de la connexion initiale.
Exemple: \`wss://api.braver.net/fils/activites?token=<braverJwt>\`

**Expiration du Token**: Le token n'expire PAS tant que la connexion WebSocket reste ouverte.
Si la connexion est fermée, un nouveau token doit être obtenu pour se reconnecter.

**Protocole**: WebSocket standard (wss://)

**Messages reçus**: Chaque message est un objet JSON avec un champ \`type\` qui détermine sa structure.
Les types de messages possibles sont:

- **newThread**: Nouveau fil créé (contient l'objet Thread complet)
- **newMessage**: Nouveau message dans un fil (contient threadId et l'objet Message)
- **threadUpdated**: Fil mis à jour (contient threadId et l'objet Thread mis à jour, tous les champs peuvent être modifiés)
- **threadClosed**: Fil fermé (contient threadId)

Voir le schéma \`WebSocketMessage\` pour la structure détaillée de chaque type.

**Exemples détaillés**: Voir le dossier \`examples/websocket/\` pour des exemples JSON complets couvrant tous les cas d'usage :

- **newThread** : 4 exemples (avec patient, sans patient, avec message initial, avec participant pending)
- **newMessage** : 4 exemples (texte simple, markdown, pièce jointe, système)
- **threadUpdated** : 6 exemples (ajout participant, changement titre, association patient, mise en sourdine, marquage lu, résumés IA)
- **threadClosed** : 1 exemple (fermeture normale)

**Note importante** : Les cliniques ne peuvent pas écrire de messages (permissions read_only uniquement).`,
                operationId: 'getActivitiesSocket',
                responses: {
                    '101': {
                        description: 'Protocol Switch to WebSocket (si upgrade direct)',
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/WebSocketMessage' },
                            },
                        },
                    },
                    '401': { description: 'Non autorisé' },
                },
            },
        },
    },
    components: {
        securitySchemes: {
            braverJwt: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
                description: `JWT émis par Braver suite à l'échange d'un token Ofys via POST /auth/token.
Doit être transmis dans Authorization: Bearer <token> pour tous les appels de cette API,
à l'exception de l'obtention du jeton lui-même.`,
            },
            ofysJwt: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
                description: `JWT émis par Ofys, inclus en Authorization: Bearer <token> lors de l'appel à POST /auth/token.
Claims requis:
- sub: identifiant utilisateur Ofys
- exp, iat: timestamps
- iss: URL identifiant Ofys
- tid: identifiant de la clinique/client
Le token peut aussi être utilisé comme sso_token pour https://app.braver.net/?sso_token=...`,
            },
        },
        parameters: {
            PathId: {
                name: 'id',
                in: 'path',
                required: true,
                schema: { type: 'string' },
                description: 'Identifiant côté Ofys ou Braver selon le contexte',
            },
            IdempotencyKey: {
                name: 'Idempotency-Key',
                in: 'header',
                required: false,
                schema: { type: 'string', format: 'uuid' },
                description: "UUID v4 pour garantir l'idempotence (optionnel, durée 1h)",
            },
        },
        schemas: {
            BraverToken,
            ActiveThreadStats,
            ThreadListResponse,
            ThreadSummary,
            Thread,
            ThreadCreate,
            ThreadUpdate,
            ThreadParticipantRef,
            Participant,
            PracticeLocation,
            PatientMini,
            PatientDetails,
            PatientCreateForThread,
            Message,
            MessageWithContent,
            MessageWithAttachment,
            MessageContent,
            MessageCreate,
            Attachment,
            AttachmentCreate,
            ProfessionalProfile,
            ClinicProfile,
            Profession,
            LocationType,
            WebSocketMessage,
            WebSocketMessageNewThread,
            WebSocketMessageNewMessage,
            WebSocketMessageThreadUpdated,
            WebSocketMessageThreadClosed,
            ApiError,
        },
    },
};
