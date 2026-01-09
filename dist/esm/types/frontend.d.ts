import { Static } from '@sinclair/typebox';
export declare const BraverToken: import("@sinclair/typebox").TObject<{
    access_token: import("@sinclair/typebox").TString;
    token_type: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TLiteral<"Bearer">>;
    expires_in: import("@sinclair/typebox").TInteger;
}>;
export type BraverToken = Static<typeof BraverToken>;
export declare const PracticeLocation: import("@sinclair/typebox").TObject<{
    id: import("@sinclair/typebox").TString;
    nom: import("@sinclair/typebox").TString;
    typeLieu: import("@sinclair/typebox").TString;
    adresse: import("@sinclair/typebox").TString;
    longitude: import("@sinclair/typebox").TNumber;
    latitude: import("@sinclair/typebox").TNumber;
}>;
export type PracticeLocation = Static<typeof PracticeLocation>;
export declare const ParticipantType: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"professionnel">, import("@sinclair/typebox").TLiteral<"clinique">, import("@sinclair/typebox").TLiteral<"systeme">]>;
export type ParticipantType = Static<typeof ParticipantType>;
export declare const Participant: import("@sinclair/typebox").TObject<{
    id: import("@sinclair/typebox").TString;
    type: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"professionnel">, import("@sinclair/typebox").TLiteral<"clinique">, import("@sinclair/typebox").TLiteral<"systeme">]>;
    status: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"pending">, import("@sinclair/typebox").TLiteral<"active">, import("@sinclair/typebox").TLiteral<"left">]>>;
    nomAffiche: import("@sinclair/typebox").TString;
    profession: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>>;
    permissions: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TArray<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"read_only">, import("@sinclair/typebox").TLiteral<"reactions_only">, import("@sinclair/typebox").TLiteral<"messages_only">, import("@sinclair/typebox").TLiteral<"full">]>>>;
    lieu: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TObject<{
        id: import("@sinclair/typebox").TString;
        nom: import("@sinclair/typebox").TString;
        typeLieu: import("@sinclair/typebox").TString;
        adresse: import("@sinclair/typebox").TString;
        longitude: import("@sinclair/typebox").TNumber;
        latitude: import("@sinclair/typebox").TNumber;
    }>>;
}>;
export type Participant = Static<typeof Participant>;
export declare const PatientMini: import("@sinclair/typebox").TObject<{
    ofysPatientId: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TInteger, import("@sinclair/typebox").TNull]>>;
    prenom: import("@sinclair/typebox").TString;
    nom: import("@sinclair/typebox").TString;
    sexeNaissance: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"M">, import("@sinclair/typebox").TLiteral<"F">, import("@sinclair/typebox").TLiteral<"O">, import("@sinclair/typebox").TLiteral<"NA">]>, import("@sinclair/typebox").TNull]>>;
    dateNaissance: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>>;
    nam: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>>;
}>;
export type PatientMini = Static<typeof PatientMini>;
export declare const Attachment: import("@sinclair/typebox").TObject<{
    id: import("@sinclair/typebox").TString;
    nomFichier: import("@sinclair/typebox").TString;
    typeMime: import("@sinclair/typebox").TString;
    tailleOctets: import("@sinclair/typebox").TInteger;
    urlTelechargement: import("@sinclair/typebox").TString;
}>;
export type Attachment = Static<typeof Attachment>;
export declare const MessageFormat: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"texte">, import("@sinclair/typebox").TLiteral<"markdown">]>;
export type MessageFormat = Static<typeof MessageFormat>;
export declare const MessageContent: import("@sinclair/typebox").TObject<{
    texte: import("@sinclair/typebox").TString;
    format: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"texte">, import("@sinclair/typebox").TLiteral<"markdown">]>>;
}>;
export type MessageContent = Static<typeof MessageContent>;
export declare const MessageWithContent: import("@sinclair/typebox").TObject<{
    id: import("@sinclair/typebox").TString;
    sequenceId: import("@sinclair/typebox").TInteger;
    auteur: import("@sinclair/typebox").TObject<{
        id: import("@sinclair/typebox").TString;
        type: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"professionnel">, import("@sinclair/typebox").TLiteral<"clinique">, import("@sinclair/typebox").TLiteral<"systeme">]>;
        status: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"pending">, import("@sinclair/typebox").TLiteral<"active">, import("@sinclair/typebox").TLiteral<"left">]>>;
        nomAffiche: import("@sinclair/typebox").TString;
        profession: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>>;
        permissions: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TArray<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"read_only">, import("@sinclair/typebox").TLiteral<"reactions_only">, import("@sinclair/typebox").TLiteral<"messages_only">, import("@sinclair/typebox").TLiteral<"full">]>>>;
        lieu: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TObject<{
            id: import("@sinclair/typebox").TString;
            nom: import("@sinclair/typebox").TString;
            typeLieu: import("@sinclair/typebox").TString;
            adresse: import("@sinclair/typebox").TString;
            longitude: import("@sinclair/typebox").TNumber;
            latitude: import("@sinclair/typebox").TNumber;
        }>>;
    }>;
    type: import("@sinclair/typebox").TLiteral<"contenu">;
    contenu: import("@sinclair/typebox").TObject<{
        texte: import("@sinclair/typebox").TString;
        format: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"texte">, import("@sinclair/typebox").TLiteral<"markdown">]>>;
    }>;
    creeAt: import("@sinclair/typebox").TString;
    nonLu: import("@sinclair/typebox").TBoolean;
}>;
export type MessageWithContent = Static<typeof MessageWithContent>;
export declare const MessageWithAttachment: import("@sinclair/typebox").TObject<{
    id: import("@sinclair/typebox").TString;
    sequenceId: import("@sinclair/typebox").TInteger;
    auteur: import("@sinclair/typebox").TObject<{
        id: import("@sinclair/typebox").TString;
        type: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"professionnel">, import("@sinclair/typebox").TLiteral<"clinique">, import("@sinclair/typebox").TLiteral<"systeme">]>;
        status: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"pending">, import("@sinclair/typebox").TLiteral<"active">, import("@sinclair/typebox").TLiteral<"left">]>>;
        nomAffiche: import("@sinclair/typebox").TString;
        profession: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>>;
        permissions: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TArray<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"read_only">, import("@sinclair/typebox").TLiteral<"reactions_only">, import("@sinclair/typebox").TLiteral<"messages_only">, import("@sinclair/typebox").TLiteral<"full">]>>>;
        lieu: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TObject<{
            id: import("@sinclair/typebox").TString;
            nom: import("@sinclair/typebox").TString;
            typeLieu: import("@sinclair/typebox").TString;
            adresse: import("@sinclair/typebox").TString;
            longitude: import("@sinclair/typebox").TNumber;
            latitude: import("@sinclair/typebox").TNumber;
        }>>;
    }>;
    type: import("@sinclair/typebox").TLiteral<"pieceJointe">;
    pieceJointe: import("@sinclair/typebox").TObject<{
        id: import("@sinclair/typebox").TString;
        nomFichier: import("@sinclair/typebox").TString;
        typeMime: import("@sinclair/typebox").TString;
        tailleOctets: import("@sinclair/typebox").TInteger;
        urlTelechargement: import("@sinclair/typebox").TString;
    }>;
    creeAt: import("@sinclair/typebox").TString;
    nonLu: import("@sinclair/typebox").TBoolean;
}>;
export type MessageWithAttachment = Static<typeof MessageWithAttachment>;
export declare const Message: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TObject<{
    id: import("@sinclair/typebox").TString;
    sequenceId: import("@sinclair/typebox").TInteger;
    auteur: import("@sinclair/typebox").TObject<{
        id: import("@sinclair/typebox").TString;
        type: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"professionnel">, import("@sinclair/typebox").TLiteral<"clinique">, import("@sinclair/typebox").TLiteral<"systeme">]>;
        status: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"pending">, import("@sinclair/typebox").TLiteral<"active">, import("@sinclair/typebox").TLiteral<"left">]>>;
        nomAffiche: import("@sinclair/typebox").TString;
        profession: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>>;
        permissions: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TArray<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"read_only">, import("@sinclair/typebox").TLiteral<"reactions_only">, import("@sinclair/typebox").TLiteral<"messages_only">, import("@sinclair/typebox").TLiteral<"full">]>>>;
        lieu: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TObject<{
            id: import("@sinclair/typebox").TString;
            nom: import("@sinclair/typebox").TString;
            typeLieu: import("@sinclair/typebox").TString;
            adresse: import("@sinclair/typebox").TString;
            longitude: import("@sinclair/typebox").TNumber;
            latitude: import("@sinclair/typebox").TNumber;
        }>>;
    }>;
    type: import("@sinclair/typebox").TLiteral<"contenu">;
    contenu: import("@sinclair/typebox").TObject<{
        texte: import("@sinclair/typebox").TString;
        format: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"texte">, import("@sinclair/typebox").TLiteral<"markdown">]>>;
    }>;
    creeAt: import("@sinclair/typebox").TString;
    nonLu: import("@sinclair/typebox").TBoolean;
}>, import("@sinclair/typebox").TObject<{
    id: import("@sinclair/typebox").TString;
    sequenceId: import("@sinclair/typebox").TInteger;
    auteur: import("@sinclair/typebox").TObject<{
        id: import("@sinclair/typebox").TString;
        type: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"professionnel">, import("@sinclair/typebox").TLiteral<"clinique">, import("@sinclair/typebox").TLiteral<"systeme">]>;
        status: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"pending">, import("@sinclair/typebox").TLiteral<"active">, import("@sinclair/typebox").TLiteral<"left">]>>;
        nomAffiche: import("@sinclair/typebox").TString;
        profession: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>>;
        permissions: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TArray<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"read_only">, import("@sinclair/typebox").TLiteral<"reactions_only">, import("@sinclair/typebox").TLiteral<"messages_only">, import("@sinclair/typebox").TLiteral<"full">]>>>;
        lieu: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TObject<{
            id: import("@sinclair/typebox").TString;
            nom: import("@sinclair/typebox").TString;
            typeLieu: import("@sinclair/typebox").TString;
            adresse: import("@sinclair/typebox").TString;
            longitude: import("@sinclair/typebox").TNumber;
            latitude: import("@sinclair/typebox").TNumber;
        }>>;
    }>;
    type: import("@sinclair/typebox").TLiteral<"pieceJointe">;
    pieceJointe: import("@sinclair/typebox").TObject<{
        id: import("@sinclair/typebox").TString;
        nomFichier: import("@sinclair/typebox").TString;
        typeMime: import("@sinclair/typebox").TString;
        tailleOctets: import("@sinclair/typebox").TInteger;
        urlTelechargement: import("@sinclair/typebox").TString;
    }>;
    creeAt: import("@sinclair/typebox").TString;
    nonLu: import("@sinclair/typebox").TBoolean;
}>]>;
export type Message = Static<typeof Message>;
export declare const AttachmentCreate: import("@sinclair/typebox").TObject<{
    nomFichier: import("@sinclair/typebox").TString;
    typeMime: import("@sinclair/typebox").TString;
    description: import("@sinclair/typebox").TString;
    contenuBase64: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    urlTelechargement: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
}>;
export type AttachmentCreate = Static<typeof AttachmentCreate>;
export declare const MessageCreate: import("@sinclair/typebox").TObject<{
    contenu: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TObject<{
        texte: import("@sinclair/typebox").TString;
        format: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"texte">, import("@sinclair/typebox").TLiteral<"markdown">]>>;
    }>, import("@sinclair/typebox").TNull]>>;
    piecesJointes: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
        nomFichier: import("@sinclair/typebox").TString;
        typeMime: import("@sinclair/typebox").TString;
        description: import("@sinclair/typebox").TString;
        contenuBase64: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        urlTelechargement: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    }>>>;
}>;
export type MessageCreate = Static<typeof MessageCreate>;
export declare const ActiveThreadStats: import("@sinclair/typebox").TObject<{
    nbFilsActifs: import("@sinclair/typebox").TInteger;
    nbMessagesNonLus: import("@sinclair/typebox").TInteger;
}>;
export type ActiveThreadStats = Static<typeof ActiveThreadStats>;
export declare const ThreadSummary: import("@sinclair/typebox").TObject<{
    id: import("@sinclair/typebox").TString;
    titre: import("@sinclair/typebox").TString;
    participants: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
        id: import("@sinclair/typebox").TString;
        type: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"professionnel">, import("@sinclair/typebox").TLiteral<"clinique">, import("@sinclair/typebox").TLiteral<"systeme">]>;
        status: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"pending">, import("@sinclair/typebox").TLiteral<"active">, import("@sinclair/typebox").TLiteral<"left">]>>;
        nomAffiche: import("@sinclair/typebox").TString;
        profession: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>>;
        permissions: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TArray<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"read_only">, import("@sinclair/typebox").TLiteral<"reactions_only">, import("@sinclair/typebox").TLiteral<"messages_only">, import("@sinclair/typebox").TLiteral<"full">]>>>;
        lieu: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TObject<{
            id: import("@sinclair/typebox").TString;
            nom: import("@sinclair/typebox").TString;
            typeLieu: import("@sinclair/typebox").TString;
            adresse: import("@sinclair/typebox").TString;
            longitude: import("@sinclair/typebox").TNumber;
            latitude: import("@sinclair/typebox").TNumber;
        }>>;
    }>>;
    lieux: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
        id: import("@sinclair/typebox").TString;
        nom: import("@sinclair/typebox").TString;
        typeLieu: import("@sinclair/typebox").TString;
        adresse: import("@sinclair/typebox").TString;
        longitude: import("@sinclair/typebox").TNumber;
        latitude: import("@sinclair/typebox").TNumber;
    }>>;
    patient: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TObject<{
        ofysPatientId: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TInteger, import("@sinclair/typebox").TNull]>>;
        prenom: import("@sinclair/typebox").TString;
        nom: import("@sinclair/typebox").TString;
        sexeNaissance: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"M">, import("@sinclair/typebox").TLiteral<"F">, import("@sinclair/typebox").TLiteral<"O">, import("@sinclair/typebox").TLiteral<"NA">]>, import("@sinclair/typebox").TNull]>>;
        dateNaissance: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>>;
        nam: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>>;
    }>>;
    estFerme: import("@sinclair/typebox").TBoolean;
    enSourdineJusqua: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    ofysPatientId: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    nbMessagesNonLus: import("@sinclair/typebox").TInteger;
    resumeDepuisDebut: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    resumeDepuisDerniereInteraction: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
}>;
export type ThreadSummary = Static<typeof ThreadSummary>;
export declare const ThreadListResponse: import("@sinclair/typebox").TObject<{
    threads: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
        id: import("@sinclair/typebox").TString;
        titre: import("@sinclair/typebox").TString;
        participants: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
            id: import("@sinclair/typebox").TString;
            type: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"professionnel">, import("@sinclair/typebox").TLiteral<"clinique">, import("@sinclair/typebox").TLiteral<"systeme">]>;
            status: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"pending">, import("@sinclair/typebox").TLiteral<"active">, import("@sinclair/typebox").TLiteral<"left">]>>;
            nomAffiche: import("@sinclair/typebox").TString;
            profession: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>>;
            permissions: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TArray<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"read_only">, import("@sinclair/typebox").TLiteral<"reactions_only">, import("@sinclair/typebox").TLiteral<"messages_only">, import("@sinclair/typebox").TLiteral<"full">]>>>;
            lieu: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TObject<{
                id: import("@sinclair/typebox").TString;
                nom: import("@sinclair/typebox").TString;
                typeLieu: import("@sinclair/typebox").TString;
                adresse: import("@sinclair/typebox").TString;
                longitude: import("@sinclair/typebox").TNumber;
                latitude: import("@sinclair/typebox").TNumber;
            }>>;
        }>>;
        lieux: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
            id: import("@sinclair/typebox").TString;
            nom: import("@sinclair/typebox").TString;
            typeLieu: import("@sinclair/typebox").TString;
            adresse: import("@sinclair/typebox").TString;
            longitude: import("@sinclair/typebox").TNumber;
            latitude: import("@sinclair/typebox").TNumber;
        }>>;
        patient: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TObject<{
            ofysPatientId: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TInteger, import("@sinclair/typebox").TNull]>>;
            prenom: import("@sinclair/typebox").TString;
            nom: import("@sinclair/typebox").TString;
            sexeNaissance: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"M">, import("@sinclair/typebox").TLiteral<"F">, import("@sinclair/typebox").TLiteral<"O">, import("@sinclair/typebox").TLiteral<"NA">]>, import("@sinclair/typebox").TNull]>>;
            dateNaissance: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>>;
            nam: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>>;
        }>>;
        estFerme: import("@sinclair/typebox").TBoolean;
        enSourdineJusqua: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        ofysPatientId: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        nbMessagesNonLus: import("@sinclair/typebox").TInteger;
        resumeDepuisDebut: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        resumeDepuisDerniereInteraction: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    }>>;
    hasMore: import("@sinclair/typebox").TBoolean;
    nextCursor: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
}>;
export type ThreadListResponse = Static<typeof ThreadListResponse>;
export declare const Thread: import("@sinclair/typebox").TObject<{
    id: import("@sinclair/typebox").TString;
    titre: import("@sinclair/typebox").TString;
    participants: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
        id: import("@sinclair/typebox").TString;
        type: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"professionnel">, import("@sinclair/typebox").TLiteral<"clinique">, import("@sinclair/typebox").TLiteral<"systeme">]>;
        status: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"pending">, import("@sinclair/typebox").TLiteral<"active">, import("@sinclair/typebox").TLiteral<"left">]>>;
        nomAffiche: import("@sinclair/typebox").TString;
        profession: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>>;
        permissions: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TArray<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"read_only">, import("@sinclair/typebox").TLiteral<"reactions_only">, import("@sinclair/typebox").TLiteral<"messages_only">, import("@sinclair/typebox").TLiteral<"full">]>>>;
        lieu: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TObject<{
            id: import("@sinclair/typebox").TString;
            nom: import("@sinclair/typebox").TString;
            typeLieu: import("@sinclair/typebox").TString;
            adresse: import("@sinclair/typebox").TString;
            longitude: import("@sinclair/typebox").TNumber;
            latitude: import("@sinclair/typebox").TNumber;
        }>>;
    }>>;
    lieux: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
        id: import("@sinclair/typebox").TString;
        nom: import("@sinclair/typebox").TString;
        typeLieu: import("@sinclair/typebox").TString;
        adresse: import("@sinclair/typebox").TString;
        longitude: import("@sinclair/typebox").TNumber;
        latitude: import("@sinclair/typebox").TNumber;
    }>>;
    patient: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TObject<{
        ofysPatientId: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TInteger, import("@sinclair/typebox").TNull]>>;
        prenom: import("@sinclair/typebox").TString;
        nom: import("@sinclair/typebox").TString;
        sexeNaissance: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"M">, import("@sinclair/typebox").TLiteral<"F">, import("@sinclair/typebox").TLiteral<"O">, import("@sinclair/typebox").TLiteral<"NA">]>, import("@sinclair/typebox").TNull]>>;
        dateNaissance: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>>;
        nam: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>>;
    }>>;
    messages: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TObject<{
        id: import("@sinclair/typebox").TString;
        sequenceId: import("@sinclair/typebox").TInteger;
        auteur: import("@sinclair/typebox").TObject<{
            id: import("@sinclair/typebox").TString;
            type: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"professionnel">, import("@sinclair/typebox").TLiteral<"clinique">, import("@sinclair/typebox").TLiteral<"systeme">]>;
            status: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"pending">, import("@sinclair/typebox").TLiteral<"active">, import("@sinclair/typebox").TLiteral<"left">]>>;
            nomAffiche: import("@sinclair/typebox").TString;
            profession: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>>;
            permissions: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TArray<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"read_only">, import("@sinclair/typebox").TLiteral<"reactions_only">, import("@sinclair/typebox").TLiteral<"messages_only">, import("@sinclair/typebox").TLiteral<"full">]>>>;
            lieu: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TObject<{
                id: import("@sinclair/typebox").TString;
                nom: import("@sinclair/typebox").TString;
                typeLieu: import("@sinclair/typebox").TString;
                adresse: import("@sinclair/typebox").TString;
                longitude: import("@sinclair/typebox").TNumber;
                latitude: import("@sinclair/typebox").TNumber;
            }>>;
        }>;
        type: import("@sinclair/typebox").TLiteral<"contenu">;
        contenu: import("@sinclair/typebox").TObject<{
            texte: import("@sinclair/typebox").TString;
            format: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"texte">, import("@sinclair/typebox").TLiteral<"markdown">]>>;
        }>;
        creeAt: import("@sinclair/typebox").TString;
        nonLu: import("@sinclair/typebox").TBoolean;
    }>, import("@sinclair/typebox").TObject<{
        id: import("@sinclair/typebox").TString;
        sequenceId: import("@sinclair/typebox").TInteger;
        auteur: import("@sinclair/typebox").TObject<{
            id: import("@sinclair/typebox").TString;
            type: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"professionnel">, import("@sinclair/typebox").TLiteral<"clinique">, import("@sinclair/typebox").TLiteral<"systeme">]>;
            status: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"pending">, import("@sinclair/typebox").TLiteral<"active">, import("@sinclair/typebox").TLiteral<"left">]>>;
            nomAffiche: import("@sinclair/typebox").TString;
            profession: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>>;
            permissions: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TArray<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"read_only">, import("@sinclair/typebox").TLiteral<"reactions_only">, import("@sinclair/typebox").TLiteral<"messages_only">, import("@sinclair/typebox").TLiteral<"full">]>>>;
            lieu: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TObject<{
                id: import("@sinclair/typebox").TString;
                nom: import("@sinclair/typebox").TString;
                typeLieu: import("@sinclair/typebox").TString;
                adresse: import("@sinclair/typebox").TString;
                longitude: import("@sinclair/typebox").TNumber;
                latitude: import("@sinclair/typebox").TNumber;
            }>>;
        }>;
        type: import("@sinclair/typebox").TLiteral<"pieceJointe">;
        pieceJointe: import("@sinclair/typebox").TObject<{
            id: import("@sinclair/typebox").TString;
            nomFichier: import("@sinclair/typebox").TString;
            typeMime: import("@sinclair/typebox").TString;
            tailleOctets: import("@sinclair/typebox").TInteger;
            urlTelechargement: import("@sinclair/typebox").TString;
        }>;
        creeAt: import("@sinclair/typebox").TString;
        nonLu: import("@sinclair/typebox").TBoolean;
    }>]>>;
    nbMessages: import("@sinclair/typebox").TInteger;
    nbMessagesNonLus: import("@sinclair/typebox").TInteger;
    estFerme: import("@sinclair/typebox").TBoolean;
    enSourdineJusqua: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    ofysPatientId: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    braverPatientId: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    resumeDepuisDebut: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    resumeDepuisDerniereInteraction: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
}>;
export type Thread = Static<typeof Thread>;
export declare const PatientDetails: import("@sinclair/typebox").TObject<{
    id: import("@sinclair/typebox").TString;
    prenom: import("@sinclair/typebox").TString;
    nom: import("@sinclair/typebox").TString;
    sexeNaissance: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"M">, import("@sinclair/typebox").TLiteral<"F">, import("@sinclair/typebox").TLiteral<"O">, import("@sinclair/typebox").TLiteral<"NA">]>, import("@sinclair/typebox").TNull]>>;
    dateNaissance: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>>;
    nam: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>>;
}>;
export type PatientDetails = Static<typeof PatientDetails>;
export declare const PatientCreateForThread: import("@sinclair/typebox").TObject<{
    id: import("@sinclair/typebox").TString;
    prenom: import("@sinclair/typebox").TString;
    nom: import("@sinclair/typebox").TString;
    sexeNaissance: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"M">, import("@sinclair/typebox").TLiteral<"F">, import("@sinclair/typebox").TLiteral<"O">, import("@sinclair/typebox").TLiteral<"NA">]>, import("@sinclair/typebox").TNull]>>;
    dateNaissance: import("@sinclair/typebox").TString;
    nam: import("@sinclair/typebox").TString;
}>;
export type PatientCreateForThread = Static<typeof PatientCreateForThread>;
export declare const ThreadUpdate: import("@sinclair/typebox").TObject<{
    marquerLuJusquaSequenceId: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TInteger>;
    marquerNonLu: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>;
    mettreEnSourdinePourSecondes: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TInteger>;
    associerPatient: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TObject<{
        id: import("@sinclair/typebox").TString;
        prenom: import("@sinclair/typebox").TString;
        nom: import("@sinclair/typebox").TString;
        sexeNaissance: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"M">, import("@sinclair/typebox").TLiteral<"F">, import("@sinclair/typebox").TLiteral<"O">, import("@sinclair/typebox").TLiteral<"NA">]>, import("@sinclair/typebox").TNull]>>;
        dateNaissance: import("@sinclair/typebox").TString;
        nam: import("@sinclair/typebox").TString;
    }>>;
    fermer: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>;
    quitterSansFermer: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>;
}>;
export type ThreadUpdate = Static<typeof ThreadUpdate>;
export declare const ThreadParticipantRef: import("@sinclair/typebox").TObject<{
    professionnelId: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>>;
    cliniqueId: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>>;
}>;
export type ThreadParticipantRef = Static<typeof ThreadParticipantRef>;
export declare const ThreadCreate: import("@sinclair/typebox").TObject<{
    titre: import("@sinclair/typebox").TString;
    participants: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
        professionnelId: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>>;
        cliniqueId: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>>;
    }>>;
    contenuInitial: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TObject<{
        texte: import("@sinclair/typebox").TString;
        format: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"texte">, import("@sinclair/typebox").TLiteral<"markdown">]>>;
    }>>;
    patient: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TObject<{
        id: import("@sinclair/typebox").TString;
        prenom: import("@sinclair/typebox").TString;
        nom: import("@sinclair/typebox").TString;
        sexeNaissance: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"M">, import("@sinclair/typebox").TLiteral<"F">, import("@sinclair/typebox").TLiteral<"O">, import("@sinclair/typebox").TLiteral<"NA">]>, import("@sinclair/typebox").TNull]>>;
        dateNaissance: import("@sinclair/typebox").TString;
        nam: import("@sinclair/typebox").TString;
    }>>;
    braverPatientId: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>>;
    piecesJointes: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
        id: import("@sinclair/typebox").TString;
        nomFichier: import("@sinclair/typebox").TString;
        typeMime: import("@sinclair/typebox").TString;
        tailleOctets: import("@sinclair/typebox").TInteger;
        urlTelechargement: import("@sinclair/typebox").TString;
    }>>>;
}>;
export type ThreadCreate = Static<typeof ThreadCreate>;
export declare const ProfessionalProfile: import("@sinclair/typebox").TObject<{
    id: import("@sinclair/typebox").TString;
    nom: import("@sinclair/typebox").TString;
    prenom: import("@sinclair/typebox").TString;
    profession: import("@sinclair/typebox").TString;
    numeroPratique: import("@sinclair/typebox").TString;
    lieux: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
        id: import("@sinclair/typebox").TString;
        nom: import("@sinclair/typebox").TString;
        typeLieu: import("@sinclair/typebox").TString;
        adresse: import("@sinclair/typebox").TString;
        longitude: import("@sinclair/typebox").TNumber;
        latitude: import("@sinclair/typebox").TNumber;
    }>>;
}>;
export type ProfessionalProfile = Static<typeof ProfessionalProfile>;
export declare const ClinicProfile: import("@sinclair/typebox").TObject<{
    id: import("@sinclair/typebox").TString;
    nom: import("@sinclair/typebox").TString;
    typeLieu: import("@sinclair/typebox").TString;
    lieux: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
        id: import("@sinclair/typebox").TString;
        nom: import("@sinclair/typebox").TString;
        typeLieu: import("@sinclair/typebox").TString;
        adresse: import("@sinclair/typebox").TString;
        longitude: import("@sinclair/typebox").TNumber;
        latitude: import("@sinclair/typebox").TNumber;
    }>>;
}>;
export type ClinicProfile = Static<typeof ClinicProfile>;
export declare const ProfessionType: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"clinique_sans_licence">, import("@sinclair/typebox").TLiteral<"clinique_licencie">, import("@sinclair/typebox").TLiteral<"non_clinique">]>;
export type ProfessionType = Static<typeof ProfessionType>;
export declare const Profession: import("@sinclair/typebox").TObject<{
    id: import("@sinclair/typebox").TString;
    type: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"clinique_sans_licence">, import("@sinclair/typebox").TLiteral<"clinique_licencie">, import("@sinclair/typebox").TLiteral<"non_clinique">]>;
    labels: import("@sinclair/typebox").TObject<{
        fr_M: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        fr_F: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        fr_O: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        en_M: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        en_F: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        en_O: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    }>;
}>;
export type Profession = Static<typeof Profession>;
export declare const LocationType: import("@sinclair/typebox").TObject<{
    id: import("@sinclair/typebox").TString;
    labels: import("@sinclair/typebox").TObject<{
        fr: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        en: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    }>;
}>;
export type LocationType = Static<typeof LocationType>;
export declare const WebSocketMessageNewThread: import("@sinclair/typebox").TObject<{
    type: import("@sinclair/typebox").TLiteral<"newThread">;
    thread: import("@sinclair/typebox").TObject<{
        id: import("@sinclair/typebox").TString;
        titre: import("@sinclair/typebox").TString;
        participants: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
            id: import("@sinclair/typebox").TString;
            type: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"professionnel">, import("@sinclair/typebox").TLiteral<"clinique">, import("@sinclair/typebox").TLiteral<"systeme">]>;
            status: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"pending">, import("@sinclair/typebox").TLiteral<"active">, import("@sinclair/typebox").TLiteral<"left">]>>;
            nomAffiche: import("@sinclair/typebox").TString;
            profession: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>>;
            permissions: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TArray<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"read_only">, import("@sinclair/typebox").TLiteral<"reactions_only">, import("@sinclair/typebox").TLiteral<"messages_only">, import("@sinclair/typebox").TLiteral<"full">]>>>;
            lieu: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TObject<{
                id: import("@sinclair/typebox").TString;
                nom: import("@sinclair/typebox").TString;
                typeLieu: import("@sinclair/typebox").TString;
                adresse: import("@sinclair/typebox").TString;
                longitude: import("@sinclair/typebox").TNumber;
                latitude: import("@sinclair/typebox").TNumber;
            }>>;
        }>>;
        lieux: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
            id: import("@sinclair/typebox").TString;
            nom: import("@sinclair/typebox").TString;
            typeLieu: import("@sinclair/typebox").TString;
            adresse: import("@sinclair/typebox").TString;
            longitude: import("@sinclair/typebox").TNumber;
            latitude: import("@sinclair/typebox").TNumber;
        }>>;
        patient: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TObject<{
            ofysPatientId: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TInteger, import("@sinclair/typebox").TNull]>>;
            prenom: import("@sinclair/typebox").TString;
            nom: import("@sinclair/typebox").TString;
            sexeNaissance: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"M">, import("@sinclair/typebox").TLiteral<"F">, import("@sinclair/typebox").TLiteral<"O">, import("@sinclair/typebox").TLiteral<"NA">]>, import("@sinclair/typebox").TNull]>>;
            dateNaissance: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>>;
            nam: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>>;
        }>>;
        messages: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TObject<{
            id: import("@sinclair/typebox").TString;
            sequenceId: import("@sinclair/typebox").TInteger;
            auteur: import("@sinclair/typebox").TObject<{
                id: import("@sinclair/typebox").TString;
                type: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"professionnel">, import("@sinclair/typebox").TLiteral<"clinique">, import("@sinclair/typebox").TLiteral<"systeme">]>;
                status: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"pending">, import("@sinclair/typebox").TLiteral<"active">, import("@sinclair/typebox").TLiteral<"left">]>>;
                nomAffiche: import("@sinclair/typebox").TString;
                profession: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>>;
                permissions: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TArray<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"read_only">, import("@sinclair/typebox").TLiteral<"reactions_only">, import("@sinclair/typebox").TLiteral<"messages_only">, import("@sinclair/typebox").TLiteral<"full">]>>>;
                lieu: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TObject<{
                    id: import("@sinclair/typebox").TString;
                    nom: import("@sinclair/typebox").TString;
                    typeLieu: import("@sinclair/typebox").TString;
                    adresse: import("@sinclair/typebox").TString;
                    longitude: import("@sinclair/typebox").TNumber;
                    latitude: import("@sinclair/typebox").TNumber;
                }>>;
            }>;
            type: import("@sinclair/typebox").TLiteral<"contenu">;
            contenu: import("@sinclair/typebox").TObject<{
                texte: import("@sinclair/typebox").TString;
                format: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"texte">, import("@sinclair/typebox").TLiteral<"markdown">]>>;
            }>;
            creeAt: import("@sinclair/typebox").TString;
            nonLu: import("@sinclair/typebox").TBoolean;
        }>, import("@sinclair/typebox").TObject<{
            id: import("@sinclair/typebox").TString;
            sequenceId: import("@sinclair/typebox").TInteger;
            auteur: import("@sinclair/typebox").TObject<{
                id: import("@sinclair/typebox").TString;
                type: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"professionnel">, import("@sinclair/typebox").TLiteral<"clinique">, import("@sinclair/typebox").TLiteral<"systeme">]>;
                status: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"pending">, import("@sinclair/typebox").TLiteral<"active">, import("@sinclair/typebox").TLiteral<"left">]>>;
                nomAffiche: import("@sinclair/typebox").TString;
                profession: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>>;
                permissions: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TArray<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"read_only">, import("@sinclair/typebox").TLiteral<"reactions_only">, import("@sinclair/typebox").TLiteral<"messages_only">, import("@sinclair/typebox").TLiteral<"full">]>>>;
                lieu: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TObject<{
                    id: import("@sinclair/typebox").TString;
                    nom: import("@sinclair/typebox").TString;
                    typeLieu: import("@sinclair/typebox").TString;
                    adresse: import("@sinclair/typebox").TString;
                    longitude: import("@sinclair/typebox").TNumber;
                    latitude: import("@sinclair/typebox").TNumber;
                }>>;
            }>;
            type: import("@sinclair/typebox").TLiteral<"pieceJointe">;
            pieceJointe: import("@sinclair/typebox").TObject<{
                id: import("@sinclair/typebox").TString;
                nomFichier: import("@sinclair/typebox").TString;
                typeMime: import("@sinclair/typebox").TString;
                tailleOctets: import("@sinclair/typebox").TInteger;
                urlTelechargement: import("@sinclair/typebox").TString;
            }>;
            creeAt: import("@sinclair/typebox").TString;
            nonLu: import("@sinclair/typebox").TBoolean;
        }>]>>;
        nbMessages: import("@sinclair/typebox").TInteger;
        nbMessagesNonLus: import("@sinclair/typebox").TInteger;
        estFerme: import("@sinclair/typebox").TBoolean;
        enSourdineJusqua: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        ofysPatientId: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        braverPatientId: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        resumeDepuisDebut: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        resumeDepuisDerniereInteraction: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    }>;
    timestamp: import("@sinclair/typebox").TString;
}>;
export type WebSocketMessageNewThread = Static<typeof WebSocketMessageNewThread>;
export declare const WebSocketMessageNewMessage: import("@sinclair/typebox").TObject<{
    type: import("@sinclair/typebox").TLiteral<"newMessage">;
    threadId: import("@sinclair/typebox").TString;
    message: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TObject<{
        id: import("@sinclair/typebox").TString;
        sequenceId: import("@sinclair/typebox").TInteger;
        auteur: import("@sinclair/typebox").TObject<{
            id: import("@sinclair/typebox").TString;
            type: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"professionnel">, import("@sinclair/typebox").TLiteral<"clinique">, import("@sinclair/typebox").TLiteral<"systeme">]>;
            status: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"pending">, import("@sinclair/typebox").TLiteral<"active">, import("@sinclair/typebox").TLiteral<"left">]>>;
            nomAffiche: import("@sinclair/typebox").TString;
            profession: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>>;
            permissions: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TArray<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"read_only">, import("@sinclair/typebox").TLiteral<"reactions_only">, import("@sinclair/typebox").TLiteral<"messages_only">, import("@sinclair/typebox").TLiteral<"full">]>>>;
            lieu: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TObject<{
                id: import("@sinclair/typebox").TString;
                nom: import("@sinclair/typebox").TString;
                typeLieu: import("@sinclair/typebox").TString;
                adresse: import("@sinclair/typebox").TString;
                longitude: import("@sinclair/typebox").TNumber;
                latitude: import("@sinclair/typebox").TNumber;
            }>>;
        }>;
        type: import("@sinclair/typebox").TLiteral<"contenu">;
        contenu: import("@sinclair/typebox").TObject<{
            texte: import("@sinclair/typebox").TString;
            format: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"texte">, import("@sinclair/typebox").TLiteral<"markdown">]>>;
        }>;
        creeAt: import("@sinclair/typebox").TString;
        nonLu: import("@sinclair/typebox").TBoolean;
    }>, import("@sinclair/typebox").TObject<{
        id: import("@sinclair/typebox").TString;
        sequenceId: import("@sinclair/typebox").TInteger;
        auteur: import("@sinclair/typebox").TObject<{
            id: import("@sinclair/typebox").TString;
            type: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"professionnel">, import("@sinclair/typebox").TLiteral<"clinique">, import("@sinclair/typebox").TLiteral<"systeme">]>;
            status: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"pending">, import("@sinclair/typebox").TLiteral<"active">, import("@sinclair/typebox").TLiteral<"left">]>>;
            nomAffiche: import("@sinclair/typebox").TString;
            profession: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>>;
            permissions: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TArray<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"read_only">, import("@sinclair/typebox").TLiteral<"reactions_only">, import("@sinclair/typebox").TLiteral<"messages_only">, import("@sinclair/typebox").TLiteral<"full">]>>>;
            lieu: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TObject<{
                id: import("@sinclair/typebox").TString;
                nom: import("@sinclair/typebox").TString;
                typeLieu: import("@sinclair/typebox").TString;
                adresse: import("@sinclair/typebox").TString;
                longitude: import("@sinclair/typebox").TNumber;
                latitude: import("@sinclair/typebox").TNumber;
            }>>;
        }>;
        type: import("@sinclair/typebox").TLiteral<"pieceJointe">;
        pieceJointe: import("@sinclair/typebox").TObject<{
            id: import("@sinclair/typebox").TString;
            nomFichier: import("@sinclair/typebox").TString;
            typeMime: import("@sinclair/typebox").TString;
            tailleOctets: import("@sinclair/typebox").TInteger;
            urlTelechargement: import("@sinclair/typebox").TString;
        }>;
        creeAt: import("@sinclair/typebox").TString;
        nonLu: import("@sinclair/typebox").TBoolean;
    }>]>;
    timestamp: import("@sinclair/typebox").TString;
}>;
export type WebSocketMessageNewMessage = Static<typeof WebSocketMessageNewMessage>;
export declare const WebSocketMessageThreadUpdated: import("@sinclair/typebox").TObject<{
    type: import("@sinclair/typebox").TLiteral<"threadUpdated">;
    threadId: import("@sinclair/typebox").TString;
    thread: import("@sinclair/typebox").TObject<{
        id: import("@sinclair/typebox").TString;
        titre: import("@sinclair/typebox").TString;
        participants: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
            id: import("@sinclair/typebox").TString;
            type: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"professionnel">, import("@sinclair/typebox").TLiteral<"clinique">, import("@sinclair/typebox").TLiteral<"systeme">]>;
            status: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"pending">, import("@sinclair/typebox").TLiteral<"active">, import("@sinclair/typebox").TLiteral<"left">]>>;
            nomAffiche: import("@sinclair/typebox").TString;
            profession: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>>;
            permissions: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TArray<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"read_only">, import("@sinclair/typebox").TLiteral<"reactions_only">, import("@sinclair/typebox").TLiteral<"messages_only">, import("@sinclair/typebox").TLiteral<"full">]>>>;
            lieu: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TObject<{
                id: import("@sinclair/typebox").TString;
                nom: import("@sinclair/typebox").TString;
                typeLieu: import("@sinclair/typebox").TString;
                adresse: import("@sinclair/typebox").TString;
                longitude: import("@sinclair/typebox").TNumber;
                latitude: import("@sinclair/typebox").TNumber;
            }>>;
        }>>;
        lieux: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
            id: import("@sinclair/typebox").TString;
            nom: import("@sinclair/typebox").TString;
            typeLieu: import("@sinclair/typebox").TString;
            adresse: import("@sinclair/typebox").TString;
            longitude: import("@sinclair/typebox").TNumber;
            latitude: import("@sinclair/typebox").TNumber;
        }>>;
        patient: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TObject<{
            ofysPatientId: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TInteger, import("@sinclair/typebox").TNull]>>;
            prenom: import("@sinclair/typebox").TString;
            nom: import("@sinclair/typebox").TString;
            sexeNaissance: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"M">, import("@sinclair/typebox").TLiteral<"F">, import("@sinclair/typebox").TLiteral<"O">, import("@sinclair/typebox").TLiteral<"NA">]>, import("@sinclair/typebox").TNull]>>;
            dateNaissance: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>>;
            nam: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>>;
        }>>;
        estFerme: import("@sinclair/typebox").TBoolean;
        enSourdineJusqua: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        ofysPatientId: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        nbMessagesNonLus: import("@sinclair/typebox").TInteger;
        resumeDepuisDebut: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        resumeDepuisDerniereInteraction: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    }>;
    timestamp: import("@sinclair/typebox").TString;
}>;
export type WebSocketMessageThreadUpdated = Static<typeof WebSocketMessageThreadUpdated>;
export declare const WebSocketMessageThreadClosed: import("@sinclair/typebox").TObject<{
    type: import("@sinclair/typebox").TLiteral<"threadClosed">;
    threadId: import("@sinclair/typebox").TString;
    timestamp: import("@sinclair/typebox").TString;
}>;
export type WebSocketMessageThreadClosed = Static<typeof WebSocketMessageThreadClosed>;
export declare const WebSocketMessage: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TObject<{
    type: import("@sinclair/typebox").TLiteral<"newThread">;
    thread: import("@sinclair/typebox").TObject<{
        id: import("@sinclair/typebox").TString;
        titre: import("@sinclair/typebox").TString;
        participants: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
            id: import("@sinclair/typebox").TString;
            type: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"professionnel">, import("@sinclair/typebox").TLiteral<"clinique">, import("@sinclair/typebox").TLiteral<"systeme">]>;
            status: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"pending">, import("@sinclair/typebox").TLiteral<"active">, import("@sinclair/typebox").TLiteral<"left">]>>;
            nomAffiche: import("@sinclair/typebox").TString;
            profession: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>>;
            permissions: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TArray<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"read_only">, import("@sinclair/typebox").TLiteral<"reactions_only">, import("@sinclair/typebox").TLiteral<"messages_only">, import("@sinclair/typebox").TLiteral<"full">]>>>;
            lieu: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TObject<{
                id: import("@sinclair/typebox").TString;
                nom: import("@sinclair/typebox").TString;
                typeLieu: import("@sinclair/typebox").TString;
                adresse: import("@sinclair/typebox").TString;
                longitude: import("@sinclair/typebox").TNumber;
                latitude: import("@sinclair/typebox").TNumber;
            }>>;
        }>>;
        lieux: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
            id: import("@sinclair/typebox").TString;
            nom: import("@sinclair/typebox").TString;
            typeLieu: import("@sinclair/typebox").TString;
            adresse: import("@sinclair/typebox").TString;
            longitude: import("@sinclair/typebox").TNumber;
            latitude: import("@sinclair/typebox").TNumber;
        }>>;
        patient: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TObject<{
            ofysPatientId: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TInteger, import("@sinclair/typebox").TNull]>>;
            prenom: import("@sinclair/typebox").TString;
            nom: import("@sinclair/typebox").TString;
            sexeNaissance: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"M">, import("@sinclair/typebox").TLiteral<"F">, import("@sinclair/typebox").TLiteral<"O">, import("@sinclair/typebox").TLiteral<"NA">]>, import("@sinclair/typebox").TNull]>>;
            dateNaissance: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>>;
            nam: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>>;
        }>>;
        messages: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TObject<{
            id: import("@sinclair/typebox").TString;
            sequenceId: import("@sinclair/typebox").TInteger;
            auteur: import("@sinclair/typebox").TObject<{
                id: import("@sinclair/typebox").TString;
                type: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"professionnel">, import("@sinclair/typebox").TLiteral<"clinique">, import("@sinclair/typebox").TLiteral<"systeme">]>;
                status: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"pending">, import("@sinclair/typebox").TLiteral<"active">, import("@sinclair/typebox").TLiteral<"left">]>>;
                nomAffiche: import("@sinclair/typebox").TString;
                profession: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>>;
                permissions: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TArray<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"read_only">, import("@sinclair/typebox").TLiteral<"reactions_only">, import("@sinclair/typebox").TLiteral<"messages_only">, import("@sinclair/typebox").TLiteral<"full">]>>>;
                lieu: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TObject<{
                    id: import("@sinclair/typebox").TString;
                    nom: import("@sinclair/typebox").TString;
                    typeLieu: import("@sinclair/typebox").TString;
                    adresse: import("@sinclair/typebox").TString;
                    longitude: import("@sinclair/typebox").TNumber;
                    latitude: import("@sinclair/typebox").TNumber;
                }>>;
            }>;
            type: import("@sinclair/typebox").TLiteral<"contenu">;
            contenu: import("@sinclair/typebox").TObject<{
                texte: import("@sinclair/typebox").TString;
                format: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"texte">, import("@sinclair/typebox").TLiteral<"markdown">]>>;
            }>;
            creeAt: import("@sinclair/typebox").TString;
            nonLu: import("@sinclair/typebox").TBoolean;
        }>, import("@sinclair/typebox").TObject<{
            id: import("@sinclair/typebox").TString;
            sequenceId: import("@sinclair/typebox").TInteger;
            auteur: import("@sinclair/typebox").TObject<{
                id: import("@sinclair/typebox").TString;
                type: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"professionnel">, import("@sinclair/typebox").TLiteral<"clinique">, import("@sinclair/typebox").TLiteral<"systeme">]>;
                status: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"pending">, import("@sinclair/typebox").TLiteral<"active">, import("@sinclair/typebox").TLiteral<"left">]>>;
                nomAffiche: import("@sinclair/typebox").TString;
                profession: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>>;
                permissions: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TArray<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"read_only">, import("@sinclair/typebox").TLiteral<"reactions_only">, import("@sinclair/typebox").TLiteral<"messages_only">, import("@sinclair/typebox").TLiteral<"full">]>>>;
                lieu: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TObject<{
                    id: import("@sinclair/typebox").TString;
                    nom: import("@sinclair/typebox").TString;
                    typeLieu: import("@sinclair/typebox").TString;
                    adresse: import("@sinclair/typebox").TString;
                    longitude: import("@sinclair/typebox").TNumber;
                    latitude: import("@sinclair/typebox").TNumber;
                }>>;
            }>;
            type: import("@sinclair/typebox").TLiteral<"pieceJointe">;
            pieceJointe: import("@sinclair/typebox").TObject<{
                id: import("@sinclair/typebox").TString;
                nomFichier: import("@sinclair/typebox").TString;
                typeMime: import("@sinclair/typebox").TString;
                tailleOctets: import("@sinclair/typebox").TInteger;
                urlTelechargement: import("@sinclair/typebox").TString;
            }>;
            creeAt: import("@sinclair/typebox").TString;
            nonLu: import("@sinclair/typebox").TBoolean;
        }>]>>;
        nbMessages: import("@sinclair/typebox").TInteger;
        nbMessagesNonLus: import("@sinclair/typebox").TInteger;
        estFerme: import("@sinclair/typebox").TBoolean;
        enSourdineJusqua: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        ofysPatientId: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        braverPatientId: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        resumeDepuisDebut: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        resumeDepuisDerniereInteraction: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    }>;
    timestamp: import("@sinclair/typebox").TString;
}>, import("@sinclair/typebox").TObject<{
    type: import("@sinclair/typebox").TLiteral<"newMessage">;
    threadId: import("@sinclair/typebox").TString;
    message: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TObject<{
        id: import("@sinclair/typebox").TString;
        sequenceId: import("@sinclair/typebox").TInteger;
        auteur: import("@sinclair/typebox").TObject<{
            id: import("@sinclair/typebox").TString;
            type: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"professionnel">, import("@sinclair/typebox").TLiteral<"clinique">, import("@sinclair/typebox").TLiteral<"systeme">]>;
            status: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"pending">, import("@sinclair/typebox").TLiteral<"active">, import("@sinclair/typebox").TLiteral<"left">]>>;
            nomAffiche: import("@sinclair/typebox").TString;
            profession: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>>;
            permissions: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TArray<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"read_only">, import("@sinclair/typebox").TLiteral<"reactions_only">, import("@sinclair/typebox").TLiteral<"messages_only">, import("@sinclair/typebox").TLiteral<"full">]>>>;
            lieu: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TObject<{
                id: import("@sinclair/typebox").TString;
                nom: import("@sinclair/typebox").TString;
                typeLieu: import("@sinclair/typebox").TString;
                adresse: import("@sinclair/typebox").TString;
                longitude: import("@sinclair/typebox").TNumber;
                latitude: import("@sinclair/typebox").TNumber;
            }>>;
        }>;
        type: import("@sinclair/typebox").TLiteral<"contenu">;
        contenu: import("@sinclair/typebox").TObject<{
            texte: import("@sinclair/typebox").TString;
            format: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"texte">, import("@sinclair/typebox").TLiteral<"markdown">]>>;
        }>;
        creeAt: import("@sinclair/typebox").TString;
        nonLu: import("@sinclair/typebox").TBoolean;
    }>, import("@sinclair/typebox").TObject<{
        id: import("@sinclair/typebox").TString;
        sequenceId: import("@sinclair/typebox").TInteger;
        auteur: import("@sinclair/typebox").TObject<{
            id: import("@sinclair/typebox").TString;
            type: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"professionnel">, import("@sinclair/typebox").TLiteral<"clinique">, import("@sinclair/typebox").TLiteral<"systeme">]>;
            status: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"pending">, import("@sinclair/typebox").TLiteral<"active">, import("@sinclair/typebox").TLiteral<"left">]>>;
            nomAffiche: import("@sinclair/typebox").TString;
            profession: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>>;
            permissions: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TArray<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"read_only">, import("@sinclair/typebox").TLiteral<"reactions_only">, import("@sinclair/typebox").TLiteral<"messages_only">, import("@sinclair/typebox").TLiteral<"full">]>>>;
            lieu: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TObject<{
                id: import("@sinclair/typebox").TString;
                nom: import("@sinclair/typebox").TString;
                typeLieu: import("@sinclair/typebox").TString;
                adresse: import("@sinclair/typebox").TString;
                longitude: import("@sinclair/typebox").TNumber;
                latitude: import("@sinclair/typebox").TNumber;
            }>>;
        }>;
        type: import("@sinclair/typebox").TLiteral<"pieceJointe">;
        pieceJointe: import("@sinclair/typebox").TObject<{
            id: import("@sinclair/typebox").TString;
            nomFichier: import("@sinclair/typebox").TString;
            typeMime: import("@sinclair/typebox").TString;
            tailleOctets: import("@sinclair/typebox").TInteger;
            urlTelechargement: import("@sinclair/typebox").TString;
        }>;
        creeAt: import("@sinclair/typebox").TString;
        nonLu: import("@sinclair/typebox").TBoolean;
    }>]>;
    timestamp: import("@sinclair/typebox").TString;
}>, import("@sinclair/typebox").TObject<{
    type: import("@sinclair/typebox").TLiteral<"threadUpdated">;
    threadId: import("@sinclair/typebox").TString;
    thread: import("@sinclair/typebox").TObject<{
        id: import("@sinclair/typebox").TString;
        titre: import("@sinclair/typebox").TString;
        participants: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
            id: import("@sinclair/typebox").TString;
            type: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"professionnel">, import("@sinclair/typebox").TLiteral<"clinique">, import("@sinclair/typebox").TLiteral<"systeme">]>;
            status: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"pending">, import("@sinclair/typebox").TLiteral<"active">, import("@sinclair/typebox").TLiteral<"left">]>>;
            nomAffiche: import("@sinclair/typebox").TString;
            profession: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>>;
            permissions: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TArray<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"read_only">, import("@sinclair/typebox").TLiteral<"reactions_only">, import("@sinclair/typebox").TLiteral<"messages_only">, import("@sinclair/typebox").TLiteral<"full">]>>>;
            lieu: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TObject<{
                id: import("@sinclair/typebox").TString;
                nom: import("@sinclair/typebox").TString;
                typeLieu: import("@sinclair/typebox").TString;
                adresse: import("@sinclair/typebox").TString;
                longitude: import("@sinclair/typebox").TNumber;
                latitude: import("@sinclair/typebox").TNumber;
            }>>;
        }>>;
        lieux: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
            id: import("@sinclair/typebox").TString;
            nom: import("@sinclair/typebox").TString;
            typeLieu: import("@sinclair/typebox").TString;
            adresse: import("@sinclair/typebox").TString;
            longitude: import("@sinclair/typebox").TNumber;
            latitude: import("@sinclair/typebox").TNumber;
        }>>;
        patient: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TObject<{
            ofysPatientId: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TInteger, import("@sinclair/typebox").TNull]>>;
            prenom: import("@sinclair/typebox").TString;
            nom: import("@sinclair/typebox").TString;
            sexeNaissance: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"M">, import("@sinclair/typebox").TLiteral<"F">, import("@sinclair/typebox").TLiteral<"O">, import("@sinclair/typebox").TLiteral<"NA">]>, import("@sinclair/typebox").TNull]>>;
            dateNaissance: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>>;
            nam: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>>;
        }>>;
        estFerme: import("@sinclair/typebox").TBoolean;
        enSourdineJusqua: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        ofysPatientId: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        nbMessagesNonLus: import("@sinclair/typebox").TInteger;
        resumeDepuisDebut: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        resumeDepuisDerniereInteraction: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    }>;
    timestamp: import("@sinclair/typebox").TString;
}>, import("@sinclair/typebox").TObject<{
    type: import("@sinclair/typebox").TLiteral<"threadClosed">;
    threadId: import("@sinclair/typebox").TString;
    timestamp: import("@sinclair/typebox").TString;
}>]>;
export type WebSocketMessage = Static<typeof WebSocketMessage>;
