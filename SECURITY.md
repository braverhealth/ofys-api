# Modèle de Sécurité - Braver API (Ofys Integration)

## Vue d'ensemble

L'API Braver utilise une authentification JWT en deux étapes:

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

## Recommandations de Sécurité

1. **Stockage du JWT**: Stocker braverJwt de manière sécurisée (pas en localStorage si possible)
2. **Renouvellement**: Implémenter un mécanisme de renouvellement avant expiration
3. **HTTPS**: Toujours utiliser HTTPS/WSS en production
4. **Validation**: Valider les signatures JWT côté serveur
5. **Rotation des clés**: Implémenter une rotation régulière des clés de signature

