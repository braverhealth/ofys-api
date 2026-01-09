import { Static } from '@sinclair/typebox';
/**
 * Braver Backend API – Provisionnement et Patients
 * Type definitions for the backend API consumed by Ofys
 */
export declare const UserCreate: import("@sinclair/typebox").TObject<{
    id: import("@sinclair/typebox").TString;
    prenom: import("@sinclair/typebox").TString;
    nom: import("@sinclair/typebox").TString;
    courriel: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>>;
    genre: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"M">, import("@sinclair/typebox").TLiteral<"F">, import("@sinclair/typebox").TLiteral<"O">, import("@sinclair/typebox").TLiteral<"NA">]>, import("@sinclair/typebox").TNull]>>;
    professions: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TString>;
    numeroPratique: import("@sinclair/typebox").TString;
    lieuxPratiqueIds: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TString>;
}>;
export type UserCreate = Static<typeof UserCreate>;
export declare const UserUpdate: import("@sinclair/typebox").TObject<{
    prenom: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    nom: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    courriel: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>>;
    genre: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"M">, import("@sinclair/typebox").TLiteral<"F">, import("@sinclair/typebox").TLiteral<"O">, import("@sinclair/typebox").TLiteral<"NA">]>, import("@sinclair/typebox").TNull]>>;
    professions: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TArray<import("@sinclair/typebox").TString>>;
    lieuxPratiqueIds: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TArray<import("@sinclair/typebox").TString>>;
}>;
export type UserUpdate = Static<typeof UserUpdate>;
export declare const User: import("@sinclair/typebox").TObject<{
    id: import("@sinclair/typebox").TString;
    prenom: import("@sinclair/typebox").TString;
    nom: import("@sinclair/typebox").TString;
    courriel: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>>;
    genre: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"M">, import("@sinclair/typebox").TLiteral<"F">, import("@sinclair/typebox").TLiteral<"O">, import("@sinclair/typebox").TLiteral<"NA">]>, import("@sinclair/typebox").TNull]>>;
    professions: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TString>;
    numeroPratique: import("@sinclair/typebox").TString;
    lieuxPratiqueIds: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TString>;
}>;
export type User = Static<typeof User>;
export declare const PatientCreate: import("@sinclair/typebox").TObject<{
    id: import("@sinclair/typebox").TString;
    prenom: import("@sinclair/typebox").TString;
    nom: import("@sinclair/typebox").TString;
    sexeNaissance: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"M">, import("@sinclair/typebox").TLiteral<"F">, import("@sinclair/typebox").TLiteral<"O">, import("@sinclair/typebox").TLiteral<"NA">]>, import("@sinclair/typebox").TNull]>>;
    dateNaissance: import("@sinclair/typebox").TString;
    nam: import("@sinclair/typebox").TString;
}>;
export type PatientCreate = Static<typeof PatientCreate>;
export declare const PatientUpdate: import("@sinclair/typebox").TObject<{
    prenom: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    nom: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    sexeActuel: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"M">, import("@sinclair/typebox").TLiteral<"F">, import("@sinclair/typebox").TLiteral<"O">, import("@sinclair/typebox").TLiteral<"NA">]>, import("@sinclair/typebox").TNull]>>;
    courriel: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>>;
    nam: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
}>;
export type PatientUpdate = Static<typeof PatientUpdate>;
export declare const Patient: import("@sinclair/typebox").TIntersect<[import("@sinclair/typebox").TObject<{
    id: import("@sinclair/typebox").TString;
    prenom: import("@sinclair/typebox").TString;
    nom: import("@sinclair/typebox").TString;
    sexeNaissance: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"M">, import("@sinclair/typebox").TLiteral<"F">, import("@sinclair/typebox").TLiteral<"O">, import("@sinclair/typebox").TLiteral<"NA">]>, import("@sinclair/typebox").TNull]>>;
    dateNaissance: import("@sinclair/typebox").TString;
    nam: import("@sinclair/typebox").TString;
}>, import("@sinclair/typebox").TObject<{
    braverPatientId: import("@sinclair/typebox").TString;
}>]>;
export type Patient = Static<typeof Patient>;
export declare const PracticeLocationCreate: import("@sinclair/typebox").TObject<{
    nom: import("@sinclair/typebox").TString;
    typeLieu: import("@sinclair/typebox").TString;
    rue: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>>;
    codePostal: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>>;
    ville: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>>;
    pays: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"CA">, import("@sinclair/typebox").TLiteral<"US">]>, import("@sinclair/typebox").TNull]>>;
    longitude: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TNumber, import("@sinclair/typebox").TNull]>>;
    latitude: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TNumber, import("@sinclair/typebox").TNull]>>;
}>;
export type PracticeLocationCreate = Static<typeof PracticeLocationCreate>;
export declare const PracticeLocationUpdate: import("@sinclair/typebox").TObject<{
    nom: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    typeLieu: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    rue: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>>;
    codePostal: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>>;
    ville: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>>;
    pays: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"CA">, import("@sinclair/typebox").TLiteral<"US">]>, import("@sinclair/typebox").TNull]>>;
    longitude: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TNumber, import("@sinclair/typebox").TNull]>>;
    latitude: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TNumber, import("@sinclair/typebox").TNull]>>;
}>;
export declare const PracticeLocation: import("@sinclair/typebox").TIntersect<[import("@sinclair/typebox").TObject<{
    nom: import("@sinclair/typebox").TString;
    typeLieu: import("@sinclair/typebox").TString;
    rue: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>>;
    codePostal: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>>;
    ville: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>>;
    pays: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"CA">, import("@sinclair/typebox").TLiteral<"US">]>, import("@sinclair/typebox").TNull]>>;
    longitude: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TNumber, import("@sinclair/typebox").TNull]>>;
    latitude: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TNumber, import("@sinclair/typebox").TNull]>>;
}>, import("@sinclair/typebox").TObject<{
    braverWorkplaceId: import("@sinclair/typebox").TString;
}>]>;
export type PracticeLocation = Static<typeof PracticeLocation>;
export declare const ClientCreate: import("@sinclair/typebox").TObject<{
    id: import("@sinclair/typebox").TString;
    nom: import("@sinclair/typebox").TString;
    lieux: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
        nom: import("@sinclair/typebox").TString;
        typeLieu: import("@sinclair/typebox").TString;
        rue: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>>;
        codePostal: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>>;
        ville: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>>;
        pays: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"CA">, import("@sinclair/typebox").TLiteral<"US">]>, import("@sinclair/typebox").TNull]>>;
        longitude: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TNumber, import("@sinclair/typebox").TNull]>>;
        latitude: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TNumber, import("@sinclair/typebox").TNull]>>;
    }>>>;
}>;
export type ClientCreate = Static<typeof ClientCreate>;
export declare const Client: import("@sinclair/typebox").TIntersect<[import("@sinclair/typebox").TObject<{
    id: import("@sinclair/typebox").TString;
    nom: import("@sinclair/typebox").TString;
    lieux: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
        nom: import("@sinclair/typebox").TString;
        typeLieu: import("@sinclair/typebox").TString;
        rue: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>>;
        codePostal: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>>;
        ville: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>>;
        pays: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"CA">, import("@sinclair/typebox").TLiteral<"US">]>, import("@sinclair/typebox").TNull]>>;
        longitude: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TNumber, import("@sinclair/typebox").TNull]>>;
        latitude: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TNumber, import("@sinclair/typebox").TNull]>>;
    }>>>;
}>, import("@sinclair/typebox").TObject<{
    braverOrganizationId: import("@sinclair/typebox").TString;
}>]>;
export type Client = Static<typeof Client>;
