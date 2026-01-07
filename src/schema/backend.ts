import type { OpenAPIV3_1 } from 'openapi-types';

export const schema: OpenAPIV3_1.Document = {
  openapi: '3.0.3',
  info: {
    title: 'Braver Backend API – Provisionnement et Patients',
    version: '0.2.2',
    description: `
    API consommée par le backend d'Ofys pour provisionner les professionnels et synchroniser des patients.

    ## Modèle de Sécurité

    L'API Backend utilise deux schémas d'authentification JWT:

    1. **providerJwt** (Fournisseur Ofys):
    
        - Utilisé UNIQUEMENT pour POST /clients
        - Identifie le fournisseur Ofys (pas une clinique spécifique)
        - Claims: iss, aud, sub (identifiant fournisseur), iat, exp

    2. **clinicJwt** (Clinique/Client):

        - Utilisé pour tous les autres endpoints
        - Identifie la clinique/client qui effectue la requête
        - Claims: iss, aud, tid (identifiant clinique), iat, exp

    Chaque requête doit inclure un JWT valide dans l'en-tête:
    \`\`\`
    Authorization: Bearer <JWT>
    \`\`\`

    Aucun endpoint public. Voir SECURITY.md pour la documentation complète du modèle de sécurité.

    ## Idempotence

    ### Support de l'Idempotency-Key

    Tous les endpoints POST et PUT supportent le header standard \`Idempotency-Key\` pour garantir l'idempotence.

    **Format**: UUID v4 (ex: \`550e8400-e29b-41d4-a716-446655440000\`)

    **Durée de garantie**: 1 heure

    **Utilisation**: Inclure le header \`Idempotency-Key\` dans la requête:

    \`\`\`
    POST /clients
    Idempotency-Key: 550e8400-e29b-41d4-a716-446655440000
    \`\`\`

    **Comportement**:

    - Si la même requête est envoyée avec la même \`Idempotency-Key\` dans l'heure, la réponse en cache est retournée
    - Évite les doublons en cas de retry réseau
    - Applicable à: POST /clients, POST /lieux, POST /utilisateurs, POST /patients, PUT /lieu/{id}, PUT /utilisateur/{id}, PUT /patient/{id}
    `,
  },
  servers: [
    {
      url: '<À préciser prochainement>',
      description: 'Production',
    },
    {
      url: '<À préciser prochainement>',
      description: 'Sandbox',
    },
  ],
  tags: [
    {
      name: 'Clients',
    },
    {
      name: 'Lieux de Pratique',
    },
    {
      name: 'Utilisateurs',
    },
    {
      name: 'Patients',
    },
  ],
  security: [
    {
      providerJwt: [],
    },
    {
      clinicJwt: [],
    },
  ],
  paths: {
    '/clients': {
      post: {
        tags: ['Clients'],
        summary: 'Créer un nouveau client',
        description: `
        Crée un nouveau client (clinique/organisation) avec ses lieux de pratique associés.
        Chaque client peut avoir plusieurs lieux de pratique (cliniques, pharmacies, services hospitaliers, etc.).

        **Sécurité**: Authentification requise (providerJwt)

        Note: Cet endpoint utilise providerJwt (identifiant le fournisseur Ofys) et non clinicJwt,
        car le client n'existe pas encore au moment de sa création.
        `,
        operationId: 'createClient',
        security: [
          {
            providerJwt: [],
          },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ClientCreate',
              },
            },
          },
        },
        responses: {
          '201': {
            description: 'Client créé',
            headers: {
              Location: {
                schema: {
                  type: 'string',
                },
              },
            },
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Client',
                },
              },
            },
          },
          '400': {
            $ref: '#/components/responses/BadRequest',
          },
          '409': {
            $ref: '#/components/responses/Conflict',
          },
        },
      },
    },
  },
};
