# API OFYS pour Braver - Guide d'intégration

**Destinataire**: Mathieu @ Braver
**Date**: 2025-12-01
**Version**: 1.0
**Auteur**: Équipe technique OFYS

---

## Table des matières

1. [Vue d'ensemble](#vue-densemble)
2. [Authentification](#authentification)
3. [Endpoints disponibles](#endpoints-disponibles)
4. [Configuration requise](#configuration-requise)
5. [Exemples d'utilisation](#exemples-dutilisation)
6. [Gestion des erreurs](#gestion-des-erreurs)
7. [Limitations connues](#limitations-connues)
8. [Support et contact](#support-et-contact)

---

## Vue d'ensemble

L'API OFYS pour Braver permet d'accéder aux données des professionnels et des sites de santé dans le système OFYS. Cette API utilise une authentification JWT et suit les standards RESTful.

### Base URL

```
Environnement de test
https://test.ofys.biz/ca.infodata.ofys.data.server.application.web.dataaccess/jaxrs/braver

Environnement de production
https://ofys.ca/ca.infodata.ofys.data.server.application.web.dataaccess/jaxrs/braver
```

### Format des données

- **Request**: JSON
- **Response**: JSON
- **Encoding**: UTF-8
- **Content-Type**: `application/json`

### Authentification

Tous les endpoints requièrent une authentification via JWT (JSON Web Token) passé dans le header `Authorization`.

---

## Authentification

### Méthode d'authentification

Chaque requête doit inclure un token JWT dans le header Authorization:

```http
Authorization: Bearer <JWT_TOKEN>
```

### Structure du JWT

Le JWT doit être signé avec l'algorithme **HS256** et contenir les claims suivants:

```json
{
  "sub": "braver-company-unique-id",
  "aud": "braverApi",
  "iat": 1701446400,
  "companyId": "braver-company-123"
}
```

**Claims obligatoires:**
- `sub` (Subject): Identifiant unique du demandeur
- `aud` (Audience): Doit être `"braverApi"`
- `iat` (Issued At): Timestamp d'émission du token (Unix timestamp)
- `companyId`: Identifiant de la compagnie/organisation Braver (optionnel mais recommandé)

### Expiration du token

- **Durée de vie**: 90 jours par défaut (configurable côté OFYS)
- **Validation**: Le serveur vérifie que le token n'a pas plus de 90 jours depuis son émission

### Secret partagé

Le JWT doit être signé avec la clé secrète partagée entre OFYS et Braver. Cette clé sera fournie séparément de manière sécurisée.

### Exemple de génération de JWT (Node.js)

```javascript
const jwt = require('jsonwebtoken');

const SECRET_KEY = 'votre-secret-partagé-avec-ofys';

const token = jwt.sign(
  {
    sub: 'braver-company-unique-id',
    aud: 'braverApi',
    iat: Math.floor(Date.now() / 1000),
    companyId: 'braver-company-123'
  },
  SECRET_KEY,
  { algorithm: 'HS256' }
);

console.log(token);
```

### Exemple de génération de JWT (Java)

```java
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.util.Date;

String secretKey = "votre-secret-partagé-avec-ofys";
SecretKeySpec key = new SecretKeySpec(
    secretKey.getBytes(StandardCharsets.UTF_8),
    SignatureAlgorithm.HS256.getJcaName()
);

String token = Jwts.builder()
    .setSubject("braver-company-unique-id")
    .setAudience("braverApi")
    .setIssuedAt(new Date())
    .claim("companyId", "braver-company-123")
    .signWith(key, SignatureAlgorithm.HS256)
    .compact();

System.out.println(token);
```

---

## Endpoints disponibles

### 1. Liste des professionnels

Récupère la liste paginée des professionnels actifs dans OFYS.

**Endpoint:**
```
GET /rest/braver/professionals
```

**Query Parameters:**

| Paramètre | Type | Requis | Par défaut | Description |
|-----------|------|---------|------------|-------------|
| `page` | Integer | Non | 1 | Numéro de page (commence à 1) |
| `per_page` | Integer | Non | 50 | Nombre d'éléments par page (max: 100) |
| `modifiedSince` | String | Non | - | Filtre par date de modification (format ISO 8601) |

**Headers:**
```http
Authorization: Bearer <JWT_TOKEN>
```

**Response Headers:**
```http
X-Total-Count: 250
X-Page: 1
X-Per-Page: 50
```

**Response Body (200 OK):**
```json
[
  {
    "id": 123,
    "firstName": "Jean",
    "lastName": "Tremblay",
    "dsqNumber": "12345",
    "active": true,
    "treating": true,
    "modificationDate": null,
    "creationDate": null,
    "email": null,
    "phone": null,
    "profession": null
  },
  {
    "id": 124,
    "firstName": "Marie",
    "lastName": "Gagnon",
    "dsqNumber": "67890",
    "active": true,
    "treating": true,
    "modificationDate": null,
    "creationDate": null,
    "email": null,
    "phone": null,
    "profession": null
  }
]
```

**Champs de réponse:**

| Champ | Type | Description |
|-------|------|-------------|
| `id` | Integer | Identifiant unique du professionnel dans OFYS |
| `firstName` | String | Prénom du professionnel |
| `lastName` | String | Nom de famille du professionnel |
| `dsqNumber` | String | Numéro de pratique (code professionnel) |
| `email` | String/null | Courriel |
| `phone` | String/null | Téléphone |
| `profession` | String/null | Type de profession |

**Exemple de requête cURL:**
```bash
curl -X GET \
  'https://test.ofys.biz/ca.infodata.ofys.data.server.application.web.dataaccess/jaxrs/braver/professionals?page=1&per_page=50' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' \
  -H 'Accept: application/json'
```

---

### 2. Détails d'un professionnel

Récupère les détails d'un professionnel spécifique par son ID.

**Endpoint:**
```
GET /rest/braver/professionals/{professional_id}
```

**Path Parameters:**

| Paramètre | Type | Requis | Description |
|-----------|------|---------|-------------|
| `professional_id` | Integer | Oui | ID unique du professionnel |

**Headers:**
```http
Authorization: Bearer <JWT_TOKEN>
```

**Response Body (200 OK):**
```json
{
  "id": 123,
  "firstName": "Jean",
  "lastName": "Tremblay",
  "dsqNumber": "12345",
  "email": null,
  "phone": null,
  "profession": null
}
```

**Exemple de requête cURL:**
```bash
curl -X GET \
  'https://test.ofys.biz/ca.infodata.ofys.data.server.application.web.dataaccess/jaxrs/braver/professionals/123' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' \
  -H 'Accept: application/json'
```

---

### 3. Liste des sites

Récupère la liste paginée des sites (cliniques) actifs dans OFYS.

**Endpoint:**
```
GET /rest/braver/sites
```

**Query Parameters:**

| Paramètre | Type | Requis | Par défaut | Description |
|-----------|------|---------|------------|-------------|
| `page` | Integer | Non | 1 | Numéro de page (commence à 1) |
| `per_page` | Integer | Non | 50 | Nombre d'éléments par page (max: 100) |
| `modifiedSince` | String | Non | - | Filtre par date de modification (format ISO 8601) |

**Headers:**
```http
Authorization: Bearer <JWT_TOKEN>
```

**Response Headers:**
```http
X-Total-Count: 15
X-Page: 1
X-Per-Page: 50
```

**Response Body (200 OK):**
```json
[
  {
    "id": 1,
    "name": "Clinique Médicale Champlain",
    "address": "1234 rue Principale",
    "city": "Montréal",
    "province": "Québec",
    "postalCode": "H1X 2Y3",
    "phone": "514-555-1234"
  },
  {
    "id": 2,
    "name": "Clinique Santé Plus",
    "address": "5678 boulevard Saint-Laurent",
    "city": "Québec",
    "province": "Québec",
    "postalCode": "G1V 4G5",
    "phone": "418-555-6789"
  }
]
```

**Champs de réponse:**

| Champ | Type | Description |
|-------|------|-------------|
| `id` | Integer | Identifiant unique du site dans OFYS |
| `name` | String | Nom du site/clinique |
| `address` | String | Adresse du site |
| `city` | String | Ville |
| `province` | String | Province |
| `postalCode` | String | Code postal |
| `phone` | String | Numéro de téléphone principal |

**Exemple de requête cURL:**
```bash
curl -X GET \
  'https://test.ofys.biz/ca.infodata.ofys.data.server.application.web.dataaccess/jaxrs/braver/sites?page=1&per_page=50' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' \
  -H 'Accept: application/json'
```

---

### 4. Détails d'un site

Récupère les détails d'un site spécifique par son ID.

**Endpoint:**
```
GET /rest/braver/sites/{site_id}
```

**Path Parameters:**

| Paramètre | Type | Requis | Description |
|-----------|------|---------|-------------|
| `site_id` | Integer | Oui | ID unique du site |

**Headers:**
```http
Authorization: Bearer <JWT_TOKEN>
```

**Response Body (200 OK):**
```json
{
  "id": 1,
  "name": "Clinique Médicale Champlain",
  "address": "1234 rue Principale",
  "city": "Montréal",
  "province": "Québec",
  "postalCode": "H1X 2Y3",
  "phone": "514-555-1234"
}
```

**Exemple de requête cURL:**
```bash
curl -X GET \
  'https://votre-instance-ofys.com/ofys/rest/braver/sites/1' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' \
  -H 'Accept: application/json'
```

---

## Configuration requise

### Côté OFYS

Les propriétés suivantes doivent être configurées dans le fichier de configuration OFYS:

```properties
# Activer ou désactiver l'API Braver
braver.isEnabled=true

# Clé secrète partagée pour la validation JWT
braver.jwtSecretKey=votre-secret-tres-securise-ici

# Durée de vie des tokens JWT en jours (par défaut: 90 jours)
braver.jwtExpiresIn=90

# URL de l'API Braver (pour les appels sortants depuis OFYS vers Braver)
braver.apiUrl=https://api.braver.com

# Identifiant de la compagnie (optionnel)
braver.companyId=braver-company-123
```

### Côté Braver

1. **Clé secrète JWT**: Stocker la même clé secrète que côté OFYS de manière sécurisée
2. **Base URL**: Configurer l'URL de l'instance OFYS
3. **Génération de tokens**: Implémenter la génération de JWT avec les claims requis
4. **Gestion des erreurs**: Implémenter la logique de retry et de gestion des codes d'erreur

---

## Exemples d'utilisation

### Scénario 1: Récupérer tous les professionnels actifs

```bash
#!/bin/bash

# Configuration
BASE_URL="https://test.ofys.biz/ca.infodata.ofys.data.server.application.web.dataaccess/jaxrs/braver"
JWT_TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."

# Récupérer la première page
RESPONSE=$(curl -s -w "\n%{http_code}" -X GET \
  "${BASE_URL}/professionals?page=1&per_page=100" \
  -H "Authorization: Bearer ${JWT_TOKEN}" \
  -H "Accept: application/json")

# Extraire le code HTTP
HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
BODY=$(echo "$RESPONSE" | sed '$d')

if [ "$HTTP_CODE" -eq 200 ]; then
  # Extraire les headers
  TOTAL_COUNT=$(echo "$RESPONSE" | grep -i "X-Total-Count:" | cut -d' ' -f2)

  echo "Total des professionnels: $TOTAL_COUNT"
  echo "$BODY" | jq .
else
  echo "Erreur HTTP $HTTP_CODE"
  echo "$BODY"
fi
```

### Scénario 2: Pagination complète

```javascript
const axios = require('axios');

const BASE_URL = 'https://test.ofys.biz/ca.infodata.ofys.data.server.application.web.dataaccess/jaxrs/braver';
const JWT_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';

async function fetchAllProfessionals() {
  const allProfessionals = [];
  let page = 1;
  const perPage = 100;

  while (true) {
    try {
      const response = await axios.get(`${BASE_URL}/professionals`, {
        params: { page, per_page: perPage },
        headers: {
          'Authorization': `Bearer ${JWT_TOKEN}`,
          'Accept': 'application/json'
        }
      });

      const professionals = response.data;
      const totalCount = parseInt(response.headers['x-total-count']);

      allProfessionals.push(...professionals);

      console.log(`Page ${page}: ${professionals.length} professionnels récupérés`);

      // Vérifier si c'est la dernière page
      if (allProfessionals.length >= totalCount) {
        break;
      }

      page++;
    } catch (error) {
      console.error(`Erreur page ${page}:`, error.message);
      break;
    }
  }

  console.log(`Total récupéré: ${allProfessionals.length} professionnels`);
  return allProfessionals;
}

fetchAllProfessionals();
```

---

## Gestion des erreurs

### Codes de statut HTTP

| Code | Signification | Description |
|------|---------------|-------------|
| 200 | OK | Requête réussie |
| 400 | Bad Request | Paramètres invalides (page, per_page, date format) |
| 401 | Unauthorized | Token JWT manquant |
| 403 | Forbidden | Token JWT invalide ou expiré |
| 404 | Not Found | Ressource non trouvée (professional_id ou site_id invalide) |
| 500 | Internal Server Error | Erreur interne du serveur |
| 503 | Service Unavailable | API Braver désactivée (braver.isEnabled=false) |

### Format des erreurs

Toutes les erreurs retournent un JSON avec le format suivant:

```json
{
  "error": "Description de l'erreur"
}
```

### Exemples d'erreurs

#### 400 - Bad Request
```json
{
  "error": "Invalid page number"
}
```

```json
{
  "error": "Invalid per_page value (must be between 1 and 100)"
}
```

#### 401 - Unauthorized
```json
{
  "error": "Missing Authorization header"
}
```

#### 403 - Forbidden
```json
{
  "error": "Invalid or expired token"
}
```

```json
{
  "error": "Invalid Authorization header format"
}
```

#### 404 - Not Found
```json
{
  "error": "Professional not found"
}
```

```json
{
  "error": "Site not found"
}
```

#### 500 - Internal Server Error
```json
{
  "error": "Authentication error"
}
```

#### 503 - Service Unavailable
```json
{
  "error": "Braver API is disabled"
}
```

### Recommandations pour la gestion des erreurs

1. **Implémenter un retry avec backoff exponentiel** pour les erreurs 500 et 503
2. **Logger les erreurs 403** - peut indiquer un problème avec le token JWT
3. **Valider les paramètres** côté client avant d'envoyer la requête pour éviter les 400
4. **Gérer l'expiration des tokens** - régénérer un nouveau JWT si nécessaire

---

## Limitations connues

### Limitations actuelles

1. **Pagination uniquement**: L'API ne supporte pas de filtres avancés (recherche par nom, par spécialité, etc.)

2. **Authentification statique**: Le JWT est validé mais n'est pas utilisé pour restreindre l'accès aux données spécifiques d'une organisation. Toutes les données actives sont retournées.

### Améliorations futures possibles

1. **Filtres de recherche** (par nom, par site, par spécialité)
2. **Webhooks** pour notifier Braver des changements en temps réel
3. **Rate limiting** pour protéger l'API contre les abus
4. **Versioning de l'API** pour gérer les évolutions futures

---

## Support et contact

### Contact technique OFYS

Pour toute question technique concernant l'API:

- **Email**: pdrolet@infodata.ca
- **Documentation**: Cette documentation et les fichiers du dossier `/Users/pdrolet/git-payara/ofys/braver_projet/`

### Procédure d'intégration

1. **Obtenir les credentials**: Contacter l'équipe OFYS pour obtenir la clé secrète JWT
2. **Configuration**: Configurer les propriétés braver.* dans OFYS
3. **Tests**: Tester l'authentification et les endpoints en environnement de développement
4. **Validation**: Valider les données retournées avec l'équipe OFYS
5. **Production**: Déployer en production après validation complète

### Changelog

**Version 1.0 (2025-12-10)**
- Version initiale de l'API
- 4 endpoints: Liste et détails des professionnels et sites
- Authentification JWT
- Pagination avec headers

---

## Annexes

### Bibliothèques recommandées

#### JavaScript/Node.js
- `jsonwebtoken` - Pour générer et valider les JWT
- `axios` - Pour les requêtes HTTP

#### Java
- `io.jsonwebtoken:jjwt-api` - Pour JWT
- `org.apache.httpcomponents:httpclient` - Pour les requêtes HTTP

#### Python
- `PyJWT` - Pour JWT
- `requests` - Pour les requêtes HTTP

### Exemple complet d'intégration (Node.js)

```javascript
const jwt = require('jsonwebtoken');
const axios = require('axios');

class OfysApiClient {
  constructor(baseUrl, secretKey, companyId) {
    this.baseUrl = baseUrl;
    this.secretKey = secretKey;
    this.companyId = companyId;
  }

  generateToken() {
    return jwt.sign(
      {
        sub: `braver-${this.companyId}`,
        aud: 'braverApi',
        iat: Math.floor(Date.now() / 1000),
        companyId: this.companyId
      },
      this.secretKey,
      { algorithm: 'HS256' }
    );
  }

  async getProfessionals(page = 1, perPage = 50) {
    const token = this.generateToken();

    try {
      const response = await axios.get(`${this.baseUrl}/professionals`, {
        params: { page, per_page: perPage },
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      });

      return {
        data: response.data,
        totalCount: parseInt(response.headers['x-total-count']),
        page: parseInt(response.headers['x-page']),
        perPage: parseInt(response.headers['x-per-page'])
      };
    } catch (error) {
      console.error('Error fetching professionals:', error.message);
      throw error;
    }
  }

  async getProfessionalById(id) {
    const token = this.generateToken();

    try {
      const response = await axios.get(`${this.baseUrl}/professionals/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      });

      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 404) {
        return null;
      }
      throw error;
    }
  }

  async getSites(page = 1, perPage = 50) {
    const token = this.generateToken();

    try {
      const response = await axios.get(`${this.baseUrl}/sites`, {
        params: { page, per_page: perPage },
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      });

      return {
        data: response.data,
        totalCount: parseInt(response.headers['x-total-count']),
        page: parseInt(response.headers['x-page']),
        perPage: parseInt(response.headers['x-per-page'])
      };
    } catch (error) {
      console.error('Error fetching sites:', error.message);
      throw error;
    }
  }

  async getSiteById(id) {
    const token = this.generateToken();

    try {
      const response = await axios.get(`${this.baseUrl}/sites/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      });

      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 404) {
        return null;
      }
      throw error;
    }
  }
}

// Exemple d'utilisation
const client = new OfysApiClient(
  'https://test.ofys.biz/ca.infodata.ofys.data.server.application.web.dataaccess/jaxrs/braver',
  'votre-secret-partagé',
  'braver-company-123'
);

async function main() {
  try {
    // Récupérer les professionnels
    const profResult = await client.getProfessionals(1, 10);
    console.log(`Total professionnels: ${profResult.totalCount}`);
    console.log('Premiers 10:', profResult.data);

    // Récupérer un professionnel spécifique
    if (profResult.data.length > 0) {
      const prof = await client.getProfessionalById(profResult.data[0].id);
      console.log('Détails du professionnel:', prof);
    }

    // Récupérer les sites
    const siteResult = await client.getSites(1, 10);
    console.log(`Total sites: ${siteResult.totalCount}`);
    console.log('Premiers 10:', siteResult.data);
  } catch (error) {
    console.error('Erreur:', error.message);
  }
}

main();
```

---

**Fin du document**

Pour toute question ou clarification, n'hésitez pas à contacter l'équipe technique OFYS.
