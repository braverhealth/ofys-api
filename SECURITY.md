# Modèle de Sécurité - Braver API (Ofys Integration)

## Vue d'ensemble

L'API Braver comprend deux APIs distinctes avec des modèles de sécurité différents:

1. **Frontend API** (Ofys Frontend) - Authentification JWT en deux étapes
2. **Backend API** (Ofys Backend) - Authentification JWT simple par clinique

---

# Frontend API - Modèle de Sécurité

## Vue d'ensemble

L'API Frontend utilise une authentification JWT en deux étapes:

1. **Authentification Ofys** → Obtenir un JWT Braver
2. **Authentification Braver** → Accéder aux ressources protégées

## Schémas d'Authentification

### 1. ofysJwt (Authentification Ofys)
- **Type**: HTTP Bearer JWT
- **Émetteur**: Ofys
- **Utilisation**: UNIQUEMENT pour `POST /auth/token`
- **Flux**: Ofys envoie son JWT → Braver valide et retourne un braverJwt

### 2. braverJwt (Authentification Braver)
- **Type**: HTTP Bearer JWT
- **Émetteur**: Braver
- **Utilisation**: Tous les endpoints protégés (sauf /professions et /typesLieux)
- **Obtention**: Via `POST /auth/token` en présentant un ofysJwt
- **Durée de vie**: À définir

## Endpoints et Sécurité

| Endpoint | Méthode | Authentification | Description |
|----------|---------|------------------|-------------|
| `/auth/token` | POST | ofysJwt | Échange JWT Ofys → JWT Braver |
| `/professions` | GET | ❌ Publique | Liste des professions (données de référence) |
| `/typesLieux` | GET | ❌ Publique | Liste des types de lieux (données de référence) |
| `/rechercheDeProfessionnels` | GET | braverJwt | Recherche de professionnels |
| `/rechercheDeCliniques` | GET | braverJwt | Recherche de cliniques |
| `/fils/actifs/stats` | GET | braverJwt | Statistiques des fils actifs |
| `/fils/actifs` | GET | braverJwt | Liste des fils actifs (paginée) |
| `/fil/{id}` | GET | braverJwt | Détails complets d'un fil |
| `/fil/{id}` | PUT | braverJwt | Mettre à jour l'état du fil |
| `/fil/{id}/messages` | POST | braverJwt | Poster un message |
| `/fils` | POST | braverJwt | Créer un nouveau fil |
| `/fils/activites` | GET (WebSocket) | braverJwt | Connexion WebSocket temps réel |

## Endpoints Publics

Les endpoints suivants ne nécessitent **AUCUNE authentification**:

- `GET /professions` - Retourne les professions disponibles
- `GET /typesLieux` - Retourne les types de lieux disponibles

Ces endpoints retournent des données de référence statiques et peuvent être appelés sans JWT.

## Endpoints Protégés

Tous les autres endpoints nécessitent un **braverJwt** valide dans l'en-tête:

```
Authorization: Bearer <braverJwt>
```

### Flux d'Authentification Complet

```
1. Ofys génère un JWT (ofysJwt) signé avec sa clé privée
2. Ofys appelle POST /auth/token avec Authorization: Bearer <ofysJwt>
3. Braver valide le JWT Ofys
4. Braver retourne un JWT Braver (braverJwt)
5. Ofys utilise braverJwt pour tous les appels suivants
6. Braver valide braverJwt pour chaque requête
```

## Gestion des Erreurs d'Authentification

- **401 Unauthorized**: JWT invalide, expiré ou absent
- **403 Forbidden**: JWT valide mais permissions insuffisantes (réservé pour évolutions futures)

## Recommandations de Sécurité (Frontend)

1. **Stockage du JWT**: Stocker braverJwt de manière sécurisée (pas en localStorage si possible)
2. **Renouvellement**: Implémenter un mécanisme de renouvellement avant expiration
3. **HTTPS**: Toujours utiliser HTTPS/WSS en production
4. **Validation**: Valider les signatures JWT côté serveur
5. **Rotation des clés**: Implémenter une rotation régulière des clés de signature

---

# Backend API - Modèle de Sécurité

## Vue d'ensemble

L'API Backend utilise deux schémas d'authentification JWT:

1. **providerJwt**: Identifie le fournisseur Ofys (pour créer des clients)
2. **clinicJwt**: Identifie une clinique/client spécifique (pour les opérations courantes)

Aucun endpoint public. Tous les endpoints nécessitent une authentification.

## Schémas d'Authentification

### providerJwt (Authentification Fournisseur)
- **Type**: HTTP Bearer JWT
- **Émetteur**: Ofys (backend)
- **Utilisation**: UNIQUEMENT pour POST /clients
- **Identifie**: Le fournisseur Ofys (pas une clinique spécifique)
- **Raison**: Le client n'existe pas encore au moment de sa création
- **Claims suggérés**:
  - `iss`: Émetteur (Ofys)
  - `aud`: URL d'installation Braver
  - `sub`: Identifiant du fournisseur Ofys
  - `iat`: Timestamp d'émission
  - `exp`: Timestamp d'expiration

### clinicJwt (Authentification Clinique)
- **Type**: HTTP Bearer JWT
- **Émetteur**: Ofys (backend)
- **Utilisation**: Tous les autres endpoints (sauf POST /clients)
- **Identifie**: La clinique/client qui effectue la requête
- **Claims suggérés**:
  - `iss`: Émetteur (Ofys)
  - `aud`: URL d'installation Braver
  - `tid`: Identifiant clinique/client (tenant ID)
  - `iat`: Timestamp d'émission
  - `exp`: Timestamp d'expiration

## Endpoints et Sécurité

| Endpoint | Méthode | Authentification | Description |
|----------|---------|------------------|-------------|
| `/clients` | POST | **providerJwt** | Créer un nouveau client (identifie le fournisseur) |
| `/utilisateurs` | POST | clinicJwt | Créer un professionnel |
| `/utilisateur/{id}` | PUT | clinicJwt | Mettre à jour un professionnel |
| `/utilisateur/{id}` | DELETE | clinicJwt | Désactiver un professionnel |
| `/patients` | POST | clinicJwt | Créer un patient |
| `/patient/{id}` | PUT | clinicJwt | Mettre à jour un patient |
| `/patient/{id}` | DELETE | clinicJwt | Archiver un patient |

## Endpoints Protégés

**Tous les endpoints** de l'API Backend nécessitent un JWT valide dans l'en-tête:

```
Authorization: Bearer <JWT>
```

- **POST /clients**: Utilise **providerJwt** (identifie le fournisseur Ofys)
- **Tous les autres endpoints**: Utilisent **clinicJwt** (identifient la clinique)

Il n'y a **AUCUN endpoint public** dans l'API Backend.

## Flux d'Authentification

### Création d'un client (POST /clients)
```
1. Ofys (backend) génère un JWT (providerJwt) signé avec sa clé privée
   - Inclut l'identifiant du fournisseur (sub)
2. Ofys appelle POST /clients avec Authorization: Bearer <providerJwt>
3. Braver valide le JWT providerJwt
4. Braver crée le nouveau client
5. Braver retourne l'ID du client créé
```

### Opérations courantes (autres endpoints)
```
1. Ofys (backend) génère un JWT (clinicJwt) signé avec sa clé privée
   - Inclut l'identifiant clinique (tid)
2. Ofys appelle un endpoint Backend avec Authorization: Bearer <clinicJwt>
3. Braver valide le JWT clinicJwt
4. Braver extrait le tid pour identifier la clinique
5. Braver traite la requête dans le contexte de cette clinique
```

## Isolation des Données par Clinique

Le JWT clinicJwt contient l'identifiant clinique (tid) qui permet:

- **Isolation des données**: Chaque clinique ne peut accéder qu'à ses propres données
- **Audit**: Tracer les actions par clinique
- **Multi-tenancy**: Supporter plusieurs cliniques sur la même instance

Note: Le JWT providerJwt n'identifie pas une clinique spécifique, il identifie le fournisseur Ofys.
Il est utilisé uniquement pour créer de nouveaux clients.

## Gestion des Erreurs d'Authentification

- **401 Unauthorized**: JWT invalide, expiré ou absent
- **403 Forbidden**: JWT valide mais clinique non autorisée (réservé pour évolutions futures)

## Recommandations de Sécurité (Backend)

1. **Validation du JWT**: Valider la signature et l'expiration
2. **Extraction du tid**: Extraire et valider l'identifiant clinique
3. **Isolation des données**: Appliquer le tid à toutes les requêtes
4. **HTTPS**: Toujours utiliser HTTPS en production
5. **Rotation des clés**: Implémenter une rotation régulière des clés de signature
6. **Audit**: Logger toutes les opérations avec le tid et l'utilisateur

