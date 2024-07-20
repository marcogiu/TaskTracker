import { config } from 'dotenv';
import { getEnvironmentVariable } from 'utils/utilities';

let envPath = './.env.development';
if (process.env.NODE_ENV === 'production') {
  envPath = './.env.production';
}

config({ path: envPath });

interface Environments {
  nodeEnv: string;
  port: number;
  mongoUri: string;
  jwtSecret: string;
  refreshSecret: string;
  corsOrigin: string;
  logLevel: string;
}

export const environments: Environments = {
  nodeEnv: getEnvironmentVariable('NODE_ENV', 'development'),
  port: parseInt(getEnvironmentVariable('PORT', '3000')),
  mongoUri: getEnvironmentVariable('MONGO_URI'),
  jwtSecret: getEnvironmentVariable('JWT_SECRET'),
  refreshSecret: getEnvironmentVariable('REFRESH_TOKEN'),
  corsOrigin: getEnvironmentVariable('CORS_ORIGIN'),
  logLevel: getEnvironmentVariable('LOG_LEVEL', 'debug'),
};
