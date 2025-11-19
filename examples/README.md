# Exemples d'API Braver/Ofys

Ce dossier contient des exemples JSON pour les différents endpoints et événements de l'API Braver/Ofys.

## Structure

```
examples/
├── websocket/          # Exemples de messages WebSocket
│   ├── newThread-*.json
│   ├── newMessage-*.json
│   ├── threadUpdated-*.json
│   └── threadClosed-*.json
└── README.md
```

## Messages WebSocket

### newThread (Nouveau fil créé)

| Fichier | Description |
|---------|-------------|
| `newThread-avec-patient.json` | Fil créé avec patient Ofys associé, participants multiples (professionnel + clinique) |
| `newThread-sans-patient.json` | Discussion générale entre professionnels sans patient associé |
| `newThread-avec-message-initial.json` | Fil créé avec un premier message, patient Ofys et Braver associés |
| `newThread-avec-participant-pending.json` | Fil avec un participant en statut "pending" (invitation non acceptée) |

### newMessage (Nouveau message)

| Fichier | Description |
|---------|-------------|
| `newMessage-texte-simple.json` | Message texte standard d'un professionnel |
| `newMessage-markdown.json` | Message avec formatage markdown (gras, italique, listes, titres) |
| `newMessage-piece-jointe.json` | Message de type "pieceJointe" avec document PDF |
| `newMessage-systeme.json` | Message automatique généré par le système |

**Note**: Les cliniques ne peuvent pas écrire de messages (lecture seule uniquement).

### threadUpdated (Fil mis à jour)

| Fichier | Description |
|---------|-------------|
| `threadUpdated-ajout-participant.json` | Nouveau participant ajouté au fil avec permissions spécifiques |
| `threadUpdated-changement-titre.json` | Titre du fil modifié (ex: ajout de "URGENT") |
| `threadUpdated-association-patient.json` | Patient Ofys associé au fil après création |
| `threadUpdated-mise-en-sourdine.json` | Fil mis en sourdine jusqu'à une date spécifique |
| `threadUpdated-marquage-lu.json` | Messages marqués comme lus (nbMessagesNonLus mis à jour) |
| `threadUpdated-avec-resumes-ia.json` | Résumés IA générés et ajoutés au fil |

### threadClosed (Fil fermé)

| Fichier | Description |
|---------|-------------|
| `threadClosed-fermeture-normale.json` | Fil fermé par un participant (discussion terminée) |

## Utilisation

Ces exemples peuvent être utilisés pour :

1. **Tests d'intégration** : Valider que votre client WebSocket gère correctement tous les types d'événements
2. **Documentation** : Comprendre la structure exacte des messages WebSocket
3. **Mocks** : Simuler des événements WebSocket dans vos tests unitaires
4. **Validation** : Vérifier que les messages reçus correspondent aux schémas attendus

## Conformité

Tous les exemples sont conformes aux schémas OpenAPI définis dans :
- `braver-frontend.yml` - API frontend (Braver → Ofys)
- `braver-backend.yml` - API backend (Ofys → Braver)

## Notes importantes

- Les UUIDs et IDs dans les exemples sont fictifs
- Les timestamps utilisent le format ISO 8601
- Les permissions sont des arrays : `["full"]`, `["read_only"]`, etc.
- Les statuts de participants : `pending`, `active`, `left`
- Les types de participants : `professionnel`, `clinique`, `systeme`
- **Important** : Les cliniques ont toujours des permissions `["read_only"]` (ne peuvent pas écrire de messages)

