## Braver / Ofys APIs - Documentation

### Acces a la documentation Swagger UI

La documentation interactive des APIs est automatiquement deployee sur **GitHub Pages** a chaque push sur la branche `main`.

**URL** : `https://braverhealth.github.io/ofys-api/`

Un GitHub Action automatise le deploiement (voir `.github/workflows/deploy-swagger-ui.yml`).

---

## Notes sur les APIs Braver / Ofys

Ce dépôt contient deux définitions OpenAPI principales :

1. `braver-frontend.yml`
2. `braver-backend.yml`

Les sections ci‑dessous résument le rôle de chaque fichier et les mécanismes d’authentification associés.

---

### 1. Rôle de chaque fichier

#### 1.1 `braver-frontend.yml`

- **But** : décrire l’API exposée par Braver et consommée par le **frontend d’Ofys**.
- **Fonctionnalités principales** :
  - Consultation, création et gestion des **fils de discussion**.
  - Consultation de **statistiques** sur les fils actifs.
  - **Recherche** de professionnels et de lieux (cliniques, pharmacies, services hospitaliers, etc.).
  - Exposition d’un **canal temps réel** (WebSocket) pour les activités liées aux fils.
- **Référentiels exposés sans authentification** :
  - `GET /professions` : liste des professions connues par Braver (avec UUID, labels localisés/genrés et type de profession).
  - `GET /typesLieux` : liste des types de lieux (clinique, pharmacie, service hospitalier, etc.) avec UUID et labels localisés.

Ces référentiels sont publics (pas d’authentification) afin de permettre au frontend de construire des interfaces (filtres, formulaires) avant ou indépendamment de l’authentification de l’utilisateur.

#### 1.2 `braver-backend.yml`

- **But** : décrire l’API consommée par le **backend d’Ofys** pour :
  - **Provisionner les clients** (cliniques/organisations) et leurs lieux de pratique.
  - **Provisionner les professionnels** (création, mise à jour, désactivation).
  - **Synchroniser les patients** (création, mise à jour, archivage).
- Cette API n’est pas destinée au navigateur, mais à des appels **serveur-à-serveur** entre Ofys et Braver.

---

### 2. Mécanismes d’authentification

#### 2.1 Authentification dans `braver-frontend.yml`

Cette API utilise **deux types de JWT** : un JWT émis par Ofys, et un JWT émis par Braver.

1. **JWT Ofys (`ofysJwt`)**
   - Déclaré dans `components.securitySchemes.ofysJwt` comme `type: http`, `scheme: bearer`, `bearerFormat: JWT`.
   - **Usage** : exclusivement sur l’endpoint :
     - `POST /auth/token`
   - **Flux** :
     1. Ofys génère un JWT et l’envoie dans l’en-tête `Authorization: Bearer <jwt_ofys>`.
     2. Braver valide ce JWT (claims attendus : `sub`, `exp`, `iat`, `iss`, `tid`, etc.).
     3. Si le JWT est valide, Braver émet un **JWT Braver** et le retourne dans une réponse de type `BraverToken`.
   - Ce même token Ofys peut également être utilisé comme `sso_token` dans l’URL web de Braver (`https://app.braver.net/?sso_token=...`).

2. **JWT Braver (`braverJwt`)**
   - Déclaré dans `components.securitySchemes.braverJwt` (Bearer JWT).
   - Configuré comme **schéma de sécurité global** via :
     - `security:
         - braverJwt: []`
   - **Usage** : pour **tous les endpoints** de l’API frontend **sauf** :
     - `POST /auth/token` (protégé par `ofysJwt`),
     - `GET /professions` (public, `security: []`),
     - `GET /typesLieux` (public, `security: []`).
   - Les clients doivent inclure ce token dans l’en-tête :
     - `Authorization: Bearer <jwt_braver>`.

En résumé, l’API frontend suit un modèle en **deux étapes** :

1. Ofys → Braver : échange d’un **JWT Ofys** contre un **JWT Braver** via `POST /auth/token`.
2. Frontend Ofys → Braver : utilisation du **JWT Braver** pour tous les appels métiers (fils, stats, WebSocket, recherches), à l’exception des deux endpoints de référentiel publics.

#### 2.2 Authentification dans `braver-backend.yml`

L’API backend utilise un **seul schéma de sécurité**, centré sur le client (clinique/organisation) :

- **Schéma `clinicJwt`**
  - Déclaré dans `components.securitySchemes.clinicJwt` (Bearer JWT).
  - Appliqué globalement via :
    - `security:
         - clinicJwt: []`
  - **Objet** : identifier de façon sécurisée le **client Ofys** (clinique/organisation) qui appelle l’API backend.
  - **Claims suggérés** (dans la description du schéma) :
    - `iss` : émetteur Ofys.
    - `aud` : URL/identifiant de l’installation Braver.
    - `tid` : identifiant du client/clinique.
    - `iat`, `exp` : timestamps d’émission/expiration.

Tous les endpoints de `braver-backend.yml` (création/mise à jour de clients, professionnels, patients) requièrent ce `clinicJwt`.
Il n’y a **pas** d’endpoint d’échange de jeton dans ce fichier : l’émission du `clinicJwt` est gérée côté Ofys ou par l’infrastructure d’intégration.

---

### 3. Résumé rapide

- `braver-frontend.yml`
  - API orientée **frontend** (Ofys → Braver) pour les fils, la recherche et le temps réel.
  - Authentification **en deux temps** : `ofysJwt` → `BraverToken` (JWT Braver), puis `braverJwt` pour le reste.
  - Exceptions non authentifiées : `GET /professions`, `GET /typesLieux`.

- `braver-backend.yml`
  - API orientée **backend** (Ofys ↔ Braver) pour le provisioning des clients, utilisateurs et patients.
  - Authentification **unique** par `clinicJwt` appliqué globalement à toutes les routes.
