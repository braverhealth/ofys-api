# Braver / Ofys APIs - Documentation

## Accès à la Documentation

### Swagger UI (Documentation Interactive)

La documentation interactive des APIs est automatiquement déployée sur **GitHub Pages** à chaque push sur la branche `main`.

**URL** : https://braverhealth.github.io/ofys-api/

### Documentation de Sécurité

Pour une documentation complète du modèle de sécurité (authentification, JWT, endpoints publics/protégés), voir:
- **[SECURITY.md](./SECURITY.md)** - Documentation détaillée des schémas d'authentification pour les deux APIs

### TypeScript Type Definitions

Des définitions TypeScript complètes sont disponibles dans le dossier `types/`:
- `types/frontend.ts` - Types pour l'API Frontend
- `types/backend.ts` - Types pour l'API Backend
- `types/common.ts` - Types partagés et utilitaires
- `types/index.ts` - Barrel export pour tous les types

---

## Vue d'ensemble des APIs

Ce dépôt contient deux définitions OpenAPI principales :

1. **`braver-frontend.yml`** - API consommée par le frontend d'Ofys
2. **`braver-backend.yml`** - API consommée par le backend d'Ofys

### 1. API Frontend (`braver-frontend.yml`)

**But**: Décrire l'API exposée par Braver et consommée par le **frontend d'Ofys**.

**Fonctionnalités principales**:
- Consultation, création et gestion des **fils de discussion**
- Consultation de **statistiques** sur les fils actifs
- **Recherche** de professionnels et de lieux (cliniques, pharmacies, services hospitaliers, etc.)
- Exposition d'un **canal temps réel** (WebSocket) pour les activités liées aux fils

**Endpoints publics** (sans authentification):
- `GET /professions` - Liste des professions avec UUID, labels localisés/genrés
- `GET /typesLieux` - Liste des types de lieux avec UUID et labels localisés

Ces endpoints sont publics pour permettre au frontend de construire des interfaces avant l'authentification.

### 2. API Backend (`braver-backend.yml`)

**But**: Décrire l'API consommée par le **backend d'Ofys** pour:
- **Provisionner les clients** (cliniques/organisations) et leurs lieux de pratique
- **Provisionner les professionnels** (création, mise à jour, désactivation)
- **Synchroniser les patients** (création, mise à jour, archivage)

Cette API n'est pas destinée au navigateur, mais à des appels **serveur-à-serveur** entre Ofys et Braver.

---

## Modèles d'Authentification

### Frontend API - Authentification en deux étapes

L'API Frontend utilise **deux types de JWT**:

1. **`ofysJwt`** - JWT émis par Ofys
   - Utilisé UNIQUEMENT pour `POST /auth/token`
   - Échangé contre un JWT Braver

2. **`braverJwt`** - JWT émis par Braver
   - Utilisé pour tous les endpoints protégés (sauf les endpoints publics)
   - Obtenu via `POST /auth/token` en échangeant un `ofysJwt`

**Flux**:
```
1. Frontend envoie ofysJwt à POST /auth/token
2. Braver valide et émet un braverJwt
3. Frontend utilise braverJwt pour tous les autres appels
```

### Backend API - Authentification par fournisseur et clinique

L'API Backend utilise **deux schémas JWT**:

1. **`providerJwt`** - JWT identifiant le fournisseur Ofys
   - Utilisé UNIQUEMENT pour `POST /clients`
   - Identifie Ofys (pas une clinique spécifique)
   - Raison: Le client n'existe pas encore au moment de sa création

2. **`clinicJwt`** - JWT identifiant une clinique/client
   - Utilisé pour tous les autres endpoints
   - Contient l'identifiant clinique (tid) pour l'isolation des données
   - Permet à Braver de traiter la requête dans le contexte de la clinique

**Endpoints et authentification**:
- `POST /clients` → `providerJwt`
- Tous les autres endpoints → `clinicJwt`

---

## Pour plus de détails

Voir **[SECURITY.md](./SECURITY.md)** pour:
- Description complète des schémas JWT
- Claims requis pour chaque schéma
- Flux d'authentification détaillés
- Gestion des erreurs
- Recommandations de sécurité
