import fs from 'fs';
import yaml from 'js-yaml';
import { schema as backendSchema } from '../src/schema/backend.js';
import { schema as frontendSchema } from '../src/schema/frontend.js';
import type { OpenAPIV3_1 } from 'openapi-types';

const generateYamlSchema = (filename: string, schema: OpenAPIV3_1.Document) => {
  const yamlSchema = yaml.dump(schema);

  console.log(`Generating ${filename}...`);
  fs.writeFileSync(filename, yamlSchema);
};

generateYamlSchema('schema/braver-backend.yml', backendSchema);
generateYamlSchema('schema/braver-frontend.yml', frontendSchema);
