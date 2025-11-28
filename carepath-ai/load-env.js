const { config } = require('dotenv');
const path = require('path');

// Load .env from project root (parent of carepath-ai directory)
const rootEnvPath = path.resolve(__dirname, '..', '.env');
config({ path: rootEnvPath });

// Also load local .env if it exists (for overrides)
config({ path: path.resolve(__dirname, '.env.local') });
