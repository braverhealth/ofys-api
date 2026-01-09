"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebSocketMessage = exports.WebSocketMessageThreadClosed = exports.WebSocketMessageThreadUpdated = exports.WebSocketMessageNewMessage = exports.WebSocketMessageNewThread = exports.LocationType = exports.Profession = exports.ProfessionType = exports.ClinicProfile = exports.ProfessionalProfile = exports.ThreadCreate = exports.ThreadParticipantRef = exports.ThreadUpdate = exports.PatientCreateForThread = exports.PatientDetails = exports.Thread = exports.ThreadListResponse = exports.ThreadSummary = exports.ActiveThreadStats = exports.MessageCreate = exports.AttachmentCreate = exports.Message = exports.MessageWithAttachment = exports.MessageWithContent = exports.MessageContent = exports.MessageFormat = exports.Attachment = exports.PatientMini = exports.Participant = exports.ParticipantType = exports.PracticeLocation = exports.BraverToken = void 0;
const typebox_1 = require("@sinclair/typebox");
/**
 * Braver Frontend API (Ofys Integration)
 * Type definitions for the frontend API exposed by Braver
 */
const common_js_1 = require("./common.js");
// ============================================================================
// Authentication Types
// ============================================================================
exports.BraverToken = typebox_1.Type.Object({
    access_token: typebox_1.Type.String({
        description: 'JWT émis par Braver à utiliser pour les appels suivants',
    }),
    token_type: typebox_1.Type.Optional(typebox_1.Type.Literal('Bearer', { default: 'Bearer' })),
    expires_in: typebox_1.Type.Integer({
        description: 'Durée de validité du token en secondes',
    }),
});
// ============================================================================
// Participant & Location Types
// ============================================================================
exports.PracticeLocation = typebox_1.Type.Object({
    id: typebox_1.Type.String(),
    nom: typebox_1.Type.String(),
    typeLieu: typebox_1.Type.String({ format: 'uuid' }),
    adresse: typebox_1.Type.String(),
    longitude: typebox_1.Type.Number(),
    latitude: typebox_1.Type.Number(),
});
exports.ParticipantType = typebox_1.Type.Union([
    typebox_1.Type.Literal('professionnel'),
    typebox_1.Type.Literal('clinique'),
    typebox_1.Type.Literal('systeme'),
]);
exports.Participant = typebox_1.Type.Object({
    id: typebox_1.Type.String({ format: 'uuid' }),
    type: exports.ParticipantType,
    status: typebox_1.Type.Optional(common_js_1.ParticipantStatus),
    nomAffiche: typebox_1.Type.String(),
    profession: typebox_1.Type.Optional((0, common_js_1.Nullable)(typebox_1.Type.String({ format: 'uuid' }))),
    permissions: typebox_1.Type.Optional(typebox_1.Type.Array(common_js_1.ParticipantPermission)),
    lieu: typebox_1.Type.Optional(exports.PracticeLocation),
});
// ============================================================================
// Patient Types
// ============================================================================
exports.PatientMini = typebox_1.Type.Object({
    ofysPatientId: typebox_1.Type.Optional((0, common_js_1.Nullable)(typebox_1.Type.Integer())),
    prenom: typebox_1.Type.String(),
    nom: typebox_1.Type.String(),
    sexeNaissance: typebox_1.Type.Optional((0, common_js_1.Nullable)(common_js_1.Gender)),
    dateNaissance: typebox_1.Type.Optional((0, common_js_1.Nullable)(typebox_1.Type.String({ format: 'date' }))),
    nam: typebox_1.Type.Optional((0, common_js_1.Nullable)(typebox_1.Type.String())),
});
// ============================================================================
// Message Types
// ============================================================================
exports.Attachment = typebox_1.Type.Object({
    id: typebox_1.Type.String(),
    nomFichier: typebox_1.Type.String(),
    typeMime: typebox_1.Type.String(),
    tailleOctets: typebox_1.Type.Integer(),
    urlTelechargement: typebox_1.Type.String({ format: 'uri' }),
});
exports.MessageFormat = typebox_1.Type.Union([
    typebox_1.Type.Literal('texte'),
    typebox_1.Type.Literal('markdown'),
]);
exports.MessageContent = typebox_1.Type.Object({
    texte: typebox_1.Type.String(),
    format: typebox_1.Type.Optional(exports.MessageFormat),
});
exports.MessageWithContent = typebox_1.Type.Object({
    id: typebox_1.Type.String({ format: 'uuid' }),
    sequenceId: typebox_1.Type.Integer({
        description: 'Ordre strict des messages dans le fil',
    }),
    auteur: exports.Participant,
    type: typebox_1.Type.Literal('contenu'),
    contenu: exports.MessageContent,
    creeAt: typebox_1.Type.String({ format: 'date-time' }),
    nonLu: typebox_1.Type.Boolean(),
});
exports.MessageWithAttachment = typebox_1.Type.Object({
    id: typebox_1.Type.String({ format: 'uuid' }),
    sequenceId: typebox_1.Type.Integer({
        description: 'Ordre strict des messages dans le fil',
    }),
    auteur: exports.Participant,
    type: typebox_1.Type.Literal('pieceJointe'),
    pieceJointe: exports.Attachment,
    creeAt: typebox_1.Type.String({ format: 'date-time' }),
    nonLu: typebox_1.Type.Boolean(),
});
exports.Message = typebox_1.Type.Union([exports.MessageWithContent, exports.MessageWithAttachment], {
    description: 'Message retourné par GET /fil/{id}. Contient soit du contenu texte, soit une pièce jointe, mais pas les deux.',
});
exports.AttachmentCreate = typebox_1.Type.Object({
    nomFichier: typebox_1.Type.String({ description: 'Nom du fichier' }),
    typeMime: typebox_1.Type.String({
        description: 'Type MIME du fichier (ex. application/pdf, image/png)',
    }),
    description: typebox_1.Type.String({
        description: 'Description ou légende du fichier',
    }),
    contenuBase64: typebox_1.Type.Optional(typebox_1.Type.String({
        format: 'byte',
        maxLength: 52428800, // 50 MB
        description: `
        Contenu du fichier encodé en base64 (mutuellement exclusif avec urlTelechargement)
        Limite: max 50 MB par fichier en base64 (≈ 37.5 MB de données réelles)
        Limites globales: max 2 GB total par message, max 10 fichiers par message
      `.trim(),
    })),
    urlTelechargement: typebox_1.Type.Optional(typebox_1.Type.String({
        format: 'uri',
        description: 'URL pour télécharger le fichier (mutuellement exclusif avec contenuBase64)',
    })),
});
exports.MessageCreate = typebox_1.Type.Object({
    contenu: typebox_1.Type.Optional((0, common_js_1.Nullable)(exports.MessageContent)),
    piecesJointes: typebox_1.Type.Optional(typebox_1.Type.Array(exports.AttachmentCreate)),
});
// ============================================================================
// Thread Types
// ============================================================================
exports.ActiveThreadStats = typebox_1.Type.Object({
    nbFilsActifs: typebox_1.Type.Integer({ description: 'Nombre de fils non fermés' }),
    nbMessagesNonLus: typebox_1.Type.Integer({
        description: 'Total des messages non lus dans tous les fils actifs',
    }),
});
exports.ThreadSummary = typebox_1.Type.Object({
    id: typebox_1.Type.String({ format: 'uuid' }),
    titre: typebox_1.Type.String(),
    participants: typebox_1.Type.Array(exports.Participant),
    lieux: typebox_1.Type.Array(exports.PracticeLocation),
    patient: typebox_1.Type.Optional(exports.PatientMini),
    estFerme: typebox_1.Type.Boolean({ description: 'Indique si le fil est fermé' }),
    enSourdineJusqua: typebox_1.Type.Optional(typebox_1.Type.String({
        format: 'date-time',
        description: 'Indique jusqu’à quand le fil est en sourdine (null si pas en sourdine)',
    })),
    ofysPatientId: typebox_1.Type.Optional(typebox_1.Type.String({
        description: 'Identifiant Ofys associé si établi',
    })),
    nbMessagesNonLus: typebox_1.Type.Integer({
        description: 'Nombre de messages non lus dans ce fil',
    }),
    resumeDepuisDebut: typebox_1.Type.Optional(typebox_1.Type.String({
        description: 'Résumé IA de la discussion depuis le début (markdown)',
    })),
    resumeDepuisDerniereInteraction: typebox_1.Type.Optional(typebox_1.Type.String({
        description: 'Résumé IA de la discussion depuis la dernière interaction (markdown)',
    })),
});
exports.ThreadListResponse = typebox_1.Type.Object({
    threads: typebox_1.Type.Array(exports.ThreadSummary, {
        description: 'Liste des fils actifs résumés (du plus récent au plus ancien)',
    }),
    hasMore: typebox_1.Type.Boolean({
        description: 'Indique s’il y a d’autres fils à récupérer',
    }),
    nextCursor: typebox_1.Type.Optional(typebox_1.Type.String({
        format: 'uuid',
        description: 'ID du dernier fil pour la prochaine requête (null si hasMore=false)',
    })),
});
exports.Thread = typebox_1.Type.Object({
    id: typebox_1.Type.String({ format: 'uuid' }),
    titre: typebox_1.Type.String(),
    participants: typebox_1.Type.Array(exports.Participant),
    lieux: typebox_1.Type.Array(exports.PracticeLocation),
    patient: typebox_1.Type.Optional(exports.PatientMini),
    messages: typebox_1.Type.Array(exports.Message),
    nbMessages: typebox_1.Type.Integer({
        description: 'Nombre total de messages dans ce fil',
    }),
    nbMessagesNonLus: typebox_1.Type.Integer({
        description: 'Nombre de messages non lus dans ce fil',
    }),
    estFerme: typebox_1.Type.Boolean({ description: 'Indique si le fil est fermé' }),
    enSourdineJusqua: typebox_1.Type.Optional(typebox_1.Type.String({
        format: 'date-time',
        description: 'Indique jusqu’à quand le fil est en sourdine (null si pas en sourdine)',
    })),
    ofysPatientId: typebox_1.Type.Optional(typebox_1.Type.String({
        description: 'Identifiant Ofys associé si établi',
    })),
    braverPatientId: typebox_1.Type.Optional(typebox_1.Type.String({
        description: 'Identifiant Braver du patient (si le patient a été créé côté Braver)',
    })),
    resumeDepuisDebut: typebox_1.Type.Optional(typebox_1.Type.String({
        description: 'Résumé IA de la discussion depuis le début (markdown)',
    })),
    resumeDepuisDerniereInteraction: typebox_1.Type.Optional(typebox_1.Type.String({
        description: 'Résumé IA de la discussion depuis la dernière interaction (markdown)',
    })),
});
exports.PatientDetails = typebox_1.Type.Object({
    id: typebox_1.Type.String({ description: 'Identifiant Ofys du patient' }),
    prenom: typebox_1.Type.String(),
    nom: typebox_1.Type.String(),
    sexeNaissance: typebox_1.Type.Optional((0, common_js_1.Nullable)(common_js_1.Gender)),
    dateNaissance: typebox_1.Type.Optional((0, common_js_1.Nullable)(typebox_1.Type.String({ format: 'date' }))),
    nam: typebox_1.Type.Optional((0, common_js_1.Nullable)(typebox_1.Type.String({ description: "Numéro d'assurance maladie" }))),
});
exports.PatientCreateForThread = typebox_1.Type.Object({
    id: typebox_1.Type.String({ description: 'Identifiant Ofys du patient' }),
    prenom: typebox_1.Type.String(),
    nom: typebox_1.Type.String(),
    sexeNaissance: typebox_1.Type.Optional((0, common_js_1.Nullable)(common_js_1.Gender)),
    dateNaissance: typebox_1.Type.String({ format: 'date' }),
    nam: typebox_1.Type.String({ description: "Numéro d'assurance maladie" }),
});
exports.ThreadUpdate = typebox_1.Type.Partial(typebox_1.Type.Object({
    marquerLuJusquaSequenceId: typebox_1.Type.Integer({
        minimum: 0,
        description: 'Marque tous les messages jusqu’à ce sequenceId comme lus',
    }),
    marquerNonLu: typebox_1.Type.Boolean({
        description: 'Marque le fil globalement comme non lu',
    }),
    mettreEnSourdinePourSecondes: typebox_1.Type.Integer({
        minimum: 0,
        description: 'Mettre en sourdine pour N secondes (0 pour retirer la sourdine)',
    }),
    associerPatient: exports.PatientCreateForThread,
    fermer: typebox_1.Type.Boolean({
        description: 'Fermer le fil',
    }),
    quitterSansFermer: typebox_1.Type.Boolean({
        description: 'Quitter le fil sans le fermer',
    }),
}), { description: 'Seulement un seul champ doit être fourni' });
exports.ThreadParticipantRef = typebox_1.Type.Partial(typebox_1.Type.Object({
    professionnelId: (0, common_js_1.Nullable)(typebox_1.Type.String()),
    cliniqueId: (0, common_js_1.Nullable)(typebox_1.Type.String()),
}));
exports.ThreadCreate = typebox_1.Type.Object({
    titre: typebox_1.Type.String(),
    participants: typebox_1.Type.Array(exports.ThreadParticipantRef),
    contenuInitial: typebox_1.Type.Optional(exports.MessageContent),
    patient: typebox_1.Type.Optional(exports.PatientCreateForThread),
    braverPatientId: typebox_1.Type.Optional((0, common_js_1.Nullable)(typebox_1.Type.String())),
    piecesJointes: typebox_1.Type.Optional(typebox_1.Type.Array(exports.Attachment)),
});
// ============================================================================
// Profile Types
// ============================================================================
exports.ProfessionalProfile = typebox_1.Type.Object({
    id: typebox_1.Type.String({ format: 'uuid' }),
    nom: typebox_1.Type.String(),
    prenom: typebox_1.Type.String(),
    profession: typebox_1.Type.String({ format: 'uuid' }),
    numeroPratique: typebox_1.Type.String(),
    lieux: typebox_1.Type.Array(exports.PracticeLocation),
});
exports.ClinicProfile = typebox_1.Type.Object({
    id: typebox_1.Type.String({ format: 'uuid' }),
    nom: typebox_1.Type.String(),
    typeLieu: typebox_1.Type.String({ format: 'uuid' }),
    lieux: typebox_1.Type.Array(exports.PracticeLocation),
});
// ============================================================================
// Reference Data Types
// ============================================================================
exports.ProfessionType = typebox_1.Type.Union([
    typebox_1.Type.Literal('clinique_sans_licence'),
    typebox_1.Type.Literal('clinique_licencie'),
    typebox_1.Type.Literal('non_clinique'),
]);
exports.Profession = typebox_1.Type.Object({
    id: typebox_1.Type.String({
        format: 'uuid',
        description: 'Identifiant unique de la profession',
    }),
    type: exports.ProfessionType,
    labels: typebox_1.Type.Partial(typebox_1.Type.Object({
        fr_M: typebox_1.Type.String(),
        fr_F: typebox_1.Type.String(),
        fr_O: typebox_1.Type.String(),
        en_M: typebox_1.Type.String(),
        en_F: typebox_1.Type.String(),
        en_O: typebox_1.Type.String(),
    }), { description: 'Libellés localisés et genrés de la profession' }),
});
exports.LocationType = typebox_1.Type.Object({
    id: typebox_1.Type.String({
        format: 'uuid',
        description: 'Identifiant unique du type de lieu',
    }),
    labels: typebox_1.Type.Partial(typebox_1.Type.Object({
        fr: typebox_1.Type.String(),
        en: typebox_1.Type.String(),
    }), { description: 'Libellés localisés du type de lieu' }),
});
// ============================================================================
// WebSocket Message Types
// ============================================================================
exports.WebSocketMessageNewThread = typebox_1.Type.Object({
    type: typebox_1.Type.Literal('newThread'),
    thread: exports.Thread,
    timestamp: typebox_1.Type.String({ format: 'date-time' }),
});
exports.WebSocketMessageNewMessage = typebox_1.Type.Object({
    type: typebox_1.Type.Literal('newMessage'),
    threadId: typebox_1.Type.String({ format: 'uuid' }),
    message: exports.Message,
    timestamp: typebox_1.Type.String({ format: 'date-time' }),
});
exports.WebSocketMessageThreadUpdated = typebox_1.Type.Object({
    type: typebox_1.Type.Literal('threadUpdated'),
    threadId: typebox_1.Type.String({ format: 'uuid' }),
    thread: exports.ThreadSummary,
    timestamp: typebox_1.Type.String({ format: 'date-time' }),
});
exports.WebSocketMessageThreadClosed = typebox_1.Type.Object({
    type: typebox_1.Type.Literal('threadClosed'),
    threadId: typebox_1.Type.String({ format: 'uuid' }),
    timestamp: typebox_1.Type.String({ format: 'date-time' }),
});
exports.WebSocketMessage = typebox_1.Type.Union([
    exports.WebSocketMessageNewThread,
    exports.WebSocketMessageNewMessage,
    exports.WebSocketMessageThreadUpdated,
    exports.WebSocketMessageThreadClosed,
], {
    type: 'discriminator',
    discriminator: 'type',
    description: 'Message retourné par le WebSocket /fils/activites',
});
