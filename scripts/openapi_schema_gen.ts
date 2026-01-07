import fs from 'fs';
import yaml from 'js-yaml';
import { schema as backendSchema } from '../src/schema/backend.js';
import type { OpenAPIV3_1 } from 'openapi-types';

const generate = (filename: string, schema: OpenAPIV3_1.Document) => {
  const yamlSchema = yaml.dump(schema);

  console.log(`Generating ${filename}...`);
  fs.writeFileSync(filename, yamlSchema);
};

generate('schema/braver-backend.yml', backendSchema);
