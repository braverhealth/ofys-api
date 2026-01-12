# Braver / Ofys APIs - Documentation

## Accès à la Documentation

### Swagger UI (Documentation Interactive)

La documentation interactive des APIs est automatiquement déployée sur **GitHub Pages** à chaque push sur la branche `main`.

**URL** : https://braverhealth.github.io/ofys-api/

### Documentation de Sécurité

Pour une documentation complète du modèle de sécurité (authentification, JWT, endpoints publics/protégés), voir:
- **[SECURITY.md](./SECURITY.md)** - Documentation détaillée des schémas d'authentification pour les deux APIs

---

## Structure du Projet

```
ofys-api/
├── schema/                    # Définitions OpenAPI
│   ├── braver-frontend.yml    # API consommée par le frontend d'Ofys
│   └── braver-backend.yml     # API consommée par le backend d'Ofys
├── src/                       # Code source TypeScript
│   ├── types/                 # Définitions de types TypeScript
│   │   ├── frontend.ts        # Types pour l'API Frontend
│   │   ├── backend.ts         # Types pour l'API Backend
│   │   └── common.ts          # Types partagés et utilitaires
│   ├── schema/                # Schémas TypeBox exportables
│   │   ├── frontend.ts        # Schémas pour l'API Frontend
│   │   └── backend.ts         # Schémas pour l'API Backend
│   └── index.ts               # Point d'entrée principal
├── scripts/                   # Scripts utilitaires
│   └── codegen.ts             # Génération de code TypeScript
├── examples/                  # Exemples d'utilisation
│   └── websocket/             # Exemples de messages WebSocket
└── package.json               # Configuration du package npm
```

### Installation

```bash
# Configurer le registre privé Braver
cat >> .npmrc << EOF
@braver:registry=https://northamerica-northeast1-npm.pkg.dev/braver-registries/npm/
//northamerica-northeast1-npm.pkg.dev/braver-registries/npm/:always-auth=true
EOF

# Installer le package
npm install @braver/ofys-api
```

### Utilisation

```typescript
// Import des types Frontend
import { ... } from '@braver/ofys-api/types/frontend';

// Import des types Backend
import { ... } from '@braver/ofys-api/types/backend';

// Import des types communs
import { ... } from '@braver/ofys-api/types/common';

// Import des schémas TypeBox
import { ... } from '@braver/ofys-api/schema/frontend';
import { ... } from '@braver/ofys-api/schema/backend';
```

---

## Vue d'ensemble des APIs

Ce dépôt contient deux définitions OpenAPI principales :

1. **`schema/braver-frontend.yml`** - API consommée par le frontend d'Ofys
2. **`schema/braver-backend.yml`** - API consommée par le backend d'Ofys

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
