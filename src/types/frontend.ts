import { Type, Static } from '@sinclair/typebox';

/**
 * Braver Frontend API (Ofys Integration)
 * Type definitions for the frontend API exposed by Braver
 */

import {
  ParticipantStatus,
  ParticipantPermission,
  Nullable,
  Gender,
} from './common.js';

// ============================================================================
// Authentication Types
// ============================================================================

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
  nom: Type.String(),
  typeLieu: Type.String({ format: 'uuid' }),
  adresse: Type.String(),
  longitude: Type.Number(),
  latitude: Type.Number(),
});
export type PracticeLocation = Static<typeof PracticeLocation>;

export const ParticipantType = Type.Union([
  Type.Literal('professionnel'),
  Type.Literal('clinique'),
  Type.Literal('systeme'),
]);
export type ParticipantType = Static<typeof ParticipantType>;

export const Participant = Type.Object({
  id: Type.String({ format: 'uuid' }),
  type: ParticipantType,
  status: Type.Optional(ParticipantStatus),
  nomAffiche: Type.String(),
  profession: Type.Optional(Nullable(Type.String({ format: 'uuid' }))),
  permissions: Type.Optional(Type.Array(ParticipantPermission)),
  lieu: Type.Optional(PracticeLocation),
});
export type Participant = Static<typeof Participant>;

// ============================================================================
// Patient Types
// ============================================================================

export const PatientMini = Type.Object({
  ofysPatientId: Type.Optional(Nullable(Type.Integer())),
  prenom: Type.String(),
  nom: Type.String(),
  sexeNaissance: Type.Optional(Nullable(Gender)),
  dateNaissance: Type.Optional(Nullable(Type.String({ format: 'date' }))),
  nam: Type.Optional(Nullable(Type.String())),
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
  id: Type.String({ format: 'uuid' }),
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
  id: Type.String({ format: 'uuid' }),
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
  contenu: Type.Optional(Nullable(MessageContent)),
  piecesJointes: Type.Optional(Type.Array(AttachmentCreate)),
});
export type MessageCreate = Static<typeof MessageCreate>;

// ============================================================================
// Thread Types
// ============================================================================

export const ActiveThreadStats = Type.Object({
  nbFilsActifs: Type.Integer({ description: 'Nombre de fils non fermés' }),
  nbMessagesNonLus: Type.Integer({
    description: 'Total des messages non lus dans tous les fils actifs',
  }),
});
export type ActiveThreadStats = Static<typeof ActiveThreadStats>;

export const ThreadSummary = Type.Object({
  id: Type.String({ format: 'uuid' }),
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
      format: 'uuid',
      description:
        'ID du dernier fil pour la prochaine requête (null si hasMore=false)',
    }),
  ),
});
export type ThreadListResponse = Static<typeof ThreadListResponse>;

export const Thread = Type.Object({
  id: Type.String({ format: 'uuid' }),
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

export const PatientDetails = Type.Object({
  id: Type.String({ description: 'Identifiant Ofys du patient' }),
  prenom: Type.String(),
  nom: Type.String(),
  sexeNaissance: Type.Optional(Nullable(Gender)),
  dateNaissance: Type.Optional(Nullable(Type.String({ format: 'date' }))),
  nam: Type.Optional(
    Nullable(Type.String({ description: "Numéro d'assurance maladie" })),
  ),
});
export type PatientDetails = Static<typeof PatientDetails>;

export const PatientCreateForThread = Type.Object({
  id: Type.String({ description: 'Identifiant Ofys du patient' }),
  prenom: Type.String(),
  nom: Type.String(),
  sexeNaissance: Type.Optional(Nullable(Gender)),
  dateNaissance: Type.String({ format: 'date' }),
  nam: Type.String({ description: "Numéro d'assurance maladie" }),
});
export type PatientCreateForThread = Static<typeof PatientCreateForThread>;

export const ThreadUpdate = Type.Partial(
  Type.Object({
    marquerLuJusquaSequenceId: Type.Integer({
      minimum: 0,
      description: 'Marque tous les messages jusqu’à ce sequenceId comme lus',
    }),
    marquerNonLu: Type.Boolean({
      description: 'Marque le fil globalement comme non lu',
    }),
    mettreEnSourdinePourSecondes: Type.Integer({
      minimum: 0,
      description:
        'Mettre en sourdine pour N secondes (0 pour retirer la sourdine)',
    }),
    associerPatient: PatientCreateForThread,
    fermer: Type.Boolean({
      description: 'Fermer le fil',
    }),
    quitterSansFermer: Type.Boolean({
      description: 'Quitter le fil sans le fermer',
    }),
  }),
  { description: 'Seulement un seul champ doit être fourni' },
);
export type ThreadUpdate = Static<typeof ThreadUpdate>;

export const ThreadParticipantRef = Type.Partial(
  Type.Object({
    professionnelId: Nullable(Type.String()),
    cliniqueId: Nullable(Type.String()),
  }),
);
export type ThreadParticipantRef = Static<typeof ThreadParticipantRef>;

export const ThreadCreate = Type.Object({
  titre: Type.String(),
  participants: Type.Array(ThreadParticipantRef),
  contenuInitial: Type.Optional(MessageContent),
  patient: Type.Optional(PatientCreateForThread),
  braverPatientId: Type.Optional(Nullable(Type.String())),
  piecesJointes: Type.Optional(Type.Array(Attachment)),
});
export type ThreadCreate = Static<typeof ThreadCreate>;

// ============================================================================
// Profile Types
// ============================================================================

export const ProfessionalProfile = Type.Object({
  id: Type.String({ format: 'uuid' }),
  nom: Type.String(),
  prenom: Type.String(),
  profession: Type.String({ format: 'uuid' }),
  numeroPratique: Type.String(),
  lieux: Type.Array(PracticeLocation),
});
export type ProfessionalProfile = Static<typeof ProfessionalProfile>;

export const ClinicProfile = Type.Object({
  id: Type.String({ format: 'uuid' }),
  nom: Type.String(),
  typeLieu: Type.String({ format: 'uuid' }),
  lieux: Type.Array(PracticeLocation),
});
export type ClinicProfile = Static<typeof ClinicProfile>;

// ============================================================================
// Reference Data Types
// ============================================================================

export const ProfessionType = Type.Union([
  Type.Literal('clinique_sans_licence'),
  Type.Literal('clinique_licencie'),
  Type.Literal('non_clinique'),
]);
export type ProfessionType = Static<typeof ProfessionType>;

export const Profession = Type.Object({
  id: Type.String({
    format: 'uuid',
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
    format: 'uuid',
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
  threadId: Type.String({ format: 'uuid' }),
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

export const WebSocketMessage = Type.Union(
  [
    WebSocketMessageNewThread,
    WebSocketMessageNewMessage,
    WebSocketMessageThreadUpdated,
    WebSocketMessageThreadClosed,
  ],
  {
    type: 'discriminator',
    discriminator: 'type',
    description: 'Message retourné par le WebSocket /fils/activites',
  },
);
export type WebSocketMessage = Static<typeof WebSocketMessage>;
