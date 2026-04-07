import { Type, Static } from '@sinclair/typebox';

/**
 * Braver Frontend API (Ofys Integration)
 * Type definitions for the frontend API exposed by Braver
 */

import { ParticipantStatus, ParticipantPermission, Gender } from './common.js';

// ============================================================================
// Authentication Types
// ============================================================================

export const CreateBraverToken = Type.Object({
  ofysClientId: Type.Optional(
    Type.String({
      description:
        "Si l'utilisateur est dans plusieurs cliniques, il faut préciser la clinique dans laquelle il est connecté",
    }),
  ),
});
export type CreateBraverToken = Static<typeof CreateBraverToken>;

export const BraverToken = Type.Object({
  access_token: Type.String({
    description: 'JWT émis par Braver à utiliser pour les appels suivants',
  }),
  token_type: Type.Optional(Type.Literal('Bearer', { default: 'Bearer' })),
  expires_in: Type.Integer({
    description: 'Durée de validité du token en secondes',
  }),
});
export type BraverToken = Static<typeof BraverToken>;

// ============================================================================
// Participant & Location Types
// ============================================================================

export const PracticeLocation = Type.Object({
  id: Type.String(),
  nom: Type.String({
    description:
      'Nom du lieu en français si disponible, sinon la première traduction disponible',
  }),
  noms: Type.Record(Type.String(), Type.String(), {
    description: 'Noms localisés du lieu.',
  }),
  typeLieu: Type.String(),
  adresse: Type.Optional(Type.String()),
  longitude: Type.Optional(Type.Number()),
  latitude: Type.Optional(Type.Number()),
});
export type PracticeLocation = Static<typeof PracticeLocation>;

export const ParticipantType = Type.Union([
  Type.Literal('professionnel'),
  Type.Literal('clinique'),
  Type.Literal('systeme'),
]);
export type ParticipantType = Static<typeof ParticipantType>;

export const Participant = Type.Object({
  id: Type.String(),
  type: ParticipantType,
  status: Type.Optional(ParticipantStatus),
  nomAffiche: Type.String(),
  profession: Type.Optional(Type.String()),
  permissions: Type.Optional(Type.Array(ParticipantPermission)),
  lieu: Type.Optional(PracticeLocation),
});
export type Participant = Static<typeof Participant>;

// ============================================================================
// Patient Types
// ============================================================================

export const PatientMini = Type.Object({
  ofysPatientId: Type.Optional(Type.String()),
  prenom: Type.String(),
  nom: Type.String(),
  sexeNaissance: Type.Optional(Gender),
  dateNaissance: Type.Optional(Type.String({ format: 'date' })),
  nam: Type.Optional(Type.String()),
});
export type PatientMini = Static<typeof PatientMini>;

// ============================================================================
// Message Types
// ============================================================================

export const Attachment = Type.Object({
  id: Type.String(),
  nomFichier: Type.String(),
  typeMime: Type.String(),
  tailleOctets: Type.Integer(),
  urlTelechargement: Type.String({ format: 'uri' }),
});
export type Attachment = Static<typeof Attachment>;

export const MessageFormat = Type.Union([
  Type.Literal('texte'),
  Type.Literal('markdown'),
]);
export type MessageFormat = Static<typeof MessageFormat>;

export const MessageContent = Type.Object({
  texte: Type.String(),
  format: Type.Optional(MessageFormat),
});
export type MessageContent = Static<typeof MessageContent>;

export const MessageWithContent = Type.Object({
  id: Type.String(),
  sequenceId: Type.Integer({
    description: 'Ordre strict des messages dans le fil',
  }),
  auteur: Participant,
  type: Type.Literal('contenu'),
  contenu: MessageContent,
  creeAt: Type.String({ format: 'date-time' }),
  nonLu: Type.Boolean(),
});
export type MessageWithContent = Static<typeof MessageWithContent>;

export const MessageWithAttachment = Type.Object({
  id: Type.String(),
  sequenceId: Type.Integer({
    description: 'Ordre strict des messages dans le fil',
  }),
  auteur: Participant,
  type: Type.Literal('pieceJointe'),
  pieceJointe: Attachment,
  creeAt: Type.String({ format: 'date-time' }),
  nonLu: Type.Boolean(),
});
export type MessageWithAttachment = Static<typeof MessageWithAttachment>;

export const Message = Type.Union([MessageWithContent, MessageWithAttachment], {
  description:
    'Message retourné par GET /fil/{id}. Contient soit du contenu texte, soit une pièce jointe, mais pas les deux.',
});
export type Message = Static<typeof Message>;

export const AttachmentCreate = Type.Object({
  nomFichier: Type.String({ description: 'Nom du fichier' }),
  typeMime: Type.String({
    description: 'Type MIME du fichier (ex. application/pdf, image/png)',
  }),
  description: Type.String({
    description: 'Description ou légende du fichier',
  }),
  contenuBase64: Type.Optional(
    Type.String({
      format: 'byte',
      maxLength: 52428800, // 50 MB
      description: `
        Contenu du fichier encodé en base64 (mutuellement exclusif avec urlTelechargement)
        Limite: max 50 MB par fichier en base64 (≈ 37.5 MB de données réelles)
        Limites globales: max 2 GB total par message, max 10 fichiers par message
      `.trim(),
    }),
  ),
  urlTelechargement: Type.Optional(
    Type.String({
      format: 'uri',
      description:
        'URL pour télécharger le fichier (mutuellement exclusif avec contenuBase64)',
    }),
  ),
});
export type AttachmentCreate = Static<typeof AttachmentCreate>;

export const MessageCreate = Type.Object({
  contenu: Type.Optional(MessageContent),
  piecesJointes: Type.Optional(Type.Array(AttachmentCreate)),
});
export type MessageCreate = Static<typeof MessageCreate>;

// ============================================================================
// Thread Types
// ============================================================================

export const ActiveThreadStats = Type.Object({
  nbFilsActifs: Type.Integer({ description: 'Nombre de fils non fermés' }),
  nbFilsNonLus: Type.Integer({
    description: 'Nombre de fils avec un ou plusieurs messages non lus',
  }),
});
export type ActiveThreadStats = Static<typeof ActiveThreadStats>;

export const ThreadSummary = Type.Object({
  braverDiscussionId: Type.String(),
  titre: Type.String(),
  participants: Type.Array(Participant),
  lieux: Type.Array(PracticeLocation),
  patient: Type.Optional(PatientMini),
  estFerme: Type.Boolean({ description: 'Indique si le fil est fermé' }),
  enSourdineJusqua: Type.Optional(
    Type.String({
      format: 'date-time',
      description:
        'Indique jusqu’à quand le fil est en sourdine (null si pas en sourdine)',
    }),
  ),
  ofysPatientId: Type.Optional(
    Type.String({
      description: 'Identifiant Ofys associé si établi',
    }),
  ),
  nbMessagesNonLus: Type.Integer({
    description: 'Nombre de messages non lus dans ce fil',
  }),
  resumeDepuisDebut: Type.Optional(
    Type.String({
      description: 'Résumé IA de la discussion depuis le début (markdown)',
    }),
  ),
  resumeDepuisDerniereInteraction: Type.Optional(
    Type.String({
      description:
        'Résumé IA de la discussion depuis la dernière interaction (markdown)',
    }),
  ),
});
export type ThreadSummary = Static<typeof ThreadSummary>;

export const ThreadListResponse = Type.Object({
  threads: Type.Array(ThreadSummary, {
    description:
      'Liste des fils actifs résumés (du plus récent au plus ancien)',
  }),
  hasMore: Type.Boolean({
    description: 'Indique s’il y a d’autres fils à récupérer',
  }),
  nextCursor: Type.Optional(
    Type.String({
      description:
        'ID du dernier fil pour la prochaine requête (null si hasMore=false)',
    }),
  ),
});
export type ThreadListResponse = Static<typeof ThreadListResponse>;

export const Thread = Type.Object({
  braverDiscussionId: Type.String(),
  titre: Type.String(),
  participants: Type.Array(Participant),
  lieux: Type.Array(PracticeLocation),
  patient: Type.Optional(PatientMini),
  messages: Type.Array(Message),
  nbMessages: Type.Integer({
    description: 'Nombre total de messages dans ce fil',
  }),
  nbMessagesNonLus: Type.Integer({
    description: 'Nombre de messages non lus dans ce fil',
  }),
  estFerme: Type.Boolean({ description: 'Indique si le fil est fermé' }),
  enSourdineJusqua: Type.Optional(
    Type.String({
      format: 'date-time',
      description:
        'Indique jusqu’à quand le fil est en sourdine (null si pas en sourdine)',
    }),
  ),
  ofysPatientId: Type.Optional(
    Type.String({
      description: 'Identifiant Ofys associé si établi',
    }),
  ),
  braverPatientId: Type.Optional(
    Type.String({
      description:
        'Identifiant Braver du patient (si le patient a été créé côté Braver)',
    }),
  ),
  resumeDepuisDebut: Type.Optional(
    Type.String({
      description: 'Résumé IA de la discussion depuis le début (markdown)',
    }),
  ),
  resumeDepuisDerniereInteraction: Type.Optional(
    Type.String({
      description:
        'Résumé IA de la discussion depuis la dernière interaction (markdown)',
    }),
  ),
});
export type Thread = Static<typeof Thread>;

export const PatientCreateForThread = Type.Object(
  {
    ofysPatientId: Type.String({ description: 'Identifiant Ofys du patient' }),
    prenom: Type.String(),
    nom: Type.String(),
    sexeNaissance: Type.Optional(Gender),
    dateNaissance: Type.String({ format: 'date' }),
    nam: Type.String({ description: "Numéro d'assurance maladie" }),
  },
  {
    description:
      'Créer un patient Braver en même temps que la création du fil. Mutuellement exclusif avec ofysPatientId',
  },
);
export type PatientCreateForThread = Static<typeof PatientCreateForThread>;

export const ThreadUpdate = Type.Union([
  Type.Object(
    {
      marquerLuJusquaSequenceId: Type.Integer({
        minimum: 0,
        description: 'Marque tous les messages jusqu’à ce sequenceId comme lus',
      }),
    },
    { title: 'Marquer comme lu jusqu’à ce sequenceId' },
  ),
  Type.Object(
    {
      marquerNonLu: Type.Boolean({
        description: 'Marque le fil globalement comme non lu',
      }),
    },
    { title: 'Marquer comme non lu' },
  ),
  Type.Object(
    {
      mettreEnSourdinePourSecondes: Type.Integer({
        minimum: 0,
        description:
          'Mettre en sourdine pour N secondes (0 pour retirer la sourdine)',
      }),
    },
    { title: 'Mettre en sourdine pour N secondes' },
  ),
  Type.Object(
    {
      associerPatient: Type.Union([PatientCreateForThread, Type.String()], {
        description:
          'Associer un patient existant au fil. Soit son ID Ofys, ou les détails pour un nouveau patient',
      }),
    },
    { title: 'Associer un patient' },
  ),
  Type.Object(
    {
      fermer: Type.Boolean({
        description:
          'Fermer le fil. Doit être "true", un fil ne peut pas être ré-ouvert',
      }),
    },
    { title: 'Fermer le fil' },
  ),
  Type.Object(
    {
      quitterSansFermer: Type.Boolean({
        description: 'Quitter le fil sans le fermer. Doit être "true"',
      }),
    },
    { title: 'Quitter le fil sans le fermer' },
  ),
]);
export type ThreadUpdate = Static<typeof ThreadUpdate>;

export const ThreadParticipantRef = Type.Partial(
  Type.Object({
    professionnelOfysId: Type.String(),
    locationOfysId: Type.String(),
  }),
);
export type ThreadParticipantRef = Static<typeof ThreadParticipantRef>;

export const ThreadCreate = Type.Object({
  ofysId: Type.String({
    description: 'Identifiant Ofys du fil',
  }),
  titre: Type.String(),
  participants: Type.Array(ThreadParticipantRef),
  contenuInitial: Type.Optional(MessageContent),
  patient: Type.Optional(PatientCreateForThread),
  ofysPatientId: Type.Optional(
    Type.String({
      description:
        'Associer un patient existant au fil. Mutuellement exclusif avec patient',
    }),
  ),
  piecesJointes: Type.Optional(Type.Array(Attachment)),
});
export type ThreadCreate = Static<typeof ThreadCreate>;

// ============================================================================
// Profile Types
// ============================================================================

export const ProfessionalProfileProfession = Type.Object({
  id: Type.String(),
  numeroPratique: Type.Optional(Type.String()),
});
export type ProfessionalProfileProfession = Static<
  typeof ProfessionalProfileProfession
>;

export const ProfessionalProfile = Type.Object({
  id: Type.String(),
  nom: Type.String(),
  prenom: Type.String(),
  professions: Type.Array(ProfessionalProfileProfession),
  lieux: Type.Array(PracticeLocation),
});
export type ProfessionalProfile = Static<typeof ProfessionalProfile>;

export const ProfessionalSearchRequest = Type.Object({
  termes: Type.String({ description: 'Termes séparés par virgules' }),
  profession: Type.Optional(
    Type.String({ description: 'UUID de profession (voir GET /professions)' }),
  ),
  longitude: Type.Optional(Type.Number()),
  latitude: Type.Optional(Type.Number()),
  limit: Type.Optional(
    Type.Integer({
      minimum: 1,
      maximum: 100,
      default: 20,
      description: 'Nombre max de résultats (max 100, défaut 20)',
    }),
  ),
  pageToken: Type.Optional(
    Type.String({
      description:
        'PageToken de la dernière requête (vide pour la première page)',
    }),
  ),
});
export type ProfessionalSearchRequest = Static<
  typeof ProfessionalSearchRequest
>;

export const ProfessionalSearchResponse = Type.Object({
  results: Type.Array(ProfessionalProfile),
  pageToken: Type.String({
    description: 'PageToken pour la prochaine requête',
  }),
});
export type ProfessionalSearchResponse = Static<
  typeof ProfessionalSearchResponse
>;

export const WorkplaceSearchRequest = Type.Object({
  termes: Type.String({ description: 'Termes séparés par virgules' }),
  typeLieu: Type.Optional(
    Type.String({ description: 'UUID de profession (voir GET /professions)' }),
  ),
  longitude: Type.Optional(Type.Number()),
  latitude: Type.Optional(Type.Number()),
});
export type WorkplaceSearchRequest = Static<typeof WorkplaceSearchRequest>;

export const WorkplaceSearchResponse = Type.Object({
  results: Type.Array(PracticeLocation),
});
export type WorkplaceSearchResponse = Static<typeof WorkplaceSearchResponse>;

// ============================================================================
// Reference Data Types
// ============================================================================

export const ProfessionType = Type.Union([
  Type.Literal('clinique_sans_licence'),
  Type.Literal('clinique_licence'),
  Type.Literal('non_clinique'),
]);
export type ProfessionType = Static<typeof ProfessionType>;

export const Profession = Type.Object({
  id: Type.String({
    description: 'Identifiant unique de la profession',
  }),
  type: ProfessionType,
  labels: Type.Partial(
    Type.Object({
      fr_M: Type.String(),
      fr_F: Type.String(),
      fr_O: Type.String(),
      en_M: Type.String(),
      en_F: Type.String(),
      en_O: Type.String(),
    }),
    { description: 'Libellés localisés et genrés de la profession' },
  ),
});
export type Profession = Static<typeof Profession>;

export const LocationType = Type.Object({
  id: Type.String({
    description: 'Identifiant unique du type de lieu',
  }),
  labels: Type.Partial(
    Type.Object({
      fr: Type.String(),
      en: Type.String(),
    }),
    { description: 'Libellés localisés du type de lieu' },
  ),
});
export type LocationType = Static<typeof LocationType>;

export const ProfessionListResponse = Type.Object({
  professions: Type.Array(Profession),
});
export type ProfessionListResponse = Static<typeof ProfessionListResponse>;

export const LocationTypeListResponse = Type.Object({
  typesLieux: Type.Array(LocationType),
});
export type LocationTypeListResponse = Static<typeof LocationTypeListResponse>;

// ============================================================================
// WebSocket Message Types
// ============================================================================

export const WebSocketMessageNewThread = Type.Object({
  type: Type.Literal('newThread'),
  thread: Thread,
  timestamp: Type.String({ format: 'date-time' }),
});
export type WebSocketMessageNewThread = Static<
  typeof WebSocketMessageNewThread
>;

export const WebSocketMessageNewMessage = Type.Object({
  type: Type.Literal('newMessage'),
  threadId: Type.String(),
  message: Message,
  timestamp: Type.String({ format: 'date-time' }),
});
export type WebSocketMessageNewMessage = Static<
  typeof WebSocketMessageNewMessage
>;

export const WebSocketMessageThreadUpdated = Type.Object({
  type: Type.Literal('threadUpdated'),
  threadId: Type.String({ format: 'uuid' }),
  thread: ThreadSummary,
  timestamp: Type.String({ format: 'date-time' }),
});
export type WebSocketMessageThreadUpdated = Static<
  typeof WebSocketMessageThreadUpdated
>;

export const WebSocketMessageThreadClosed = Type.Object({
  type: Type.Literal('threadClosed'),
  threadId: Type.String({ format: 'uuid' }),
  timestamp: Type.String({ format: 'date-time' }),
});
export type WebSocketMessageThreadClosed = Static<
  typeof WebSocketMessageThreadClosed
>;

export const WebSocketMessage = Type.Union([
  WebSocketMessageNewThread,
  WebSocketMessageNewMessage,
  WebSocketMessageThreadUpdated,
  WebSocketMessageThreadClosed,
]);
export type WebSocketMessage = Static<typeof WebSocketMessage>;
