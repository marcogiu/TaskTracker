import { config } from 'dotenv';
import { getEnvironmentVariable } from 'utils/utilities';

config();

interface Environments {
  nodeEnv: string;
  port: number;
  mongoUri: string;
  jwtSecret: string;
  corsOrigin: string;
  emailConfig: {
    service: string;
    username: string;
    password: string;
  };
  logLevel: string;
}

export const environments: Environments = {
  nodeEnv: getEnvironmentVariable('NODE_ENV', 'development'),
  port: parseInt(getEnvironmentVariable('PORT', '3000')),
  mongoUri: getEnvironmentVariable('MONGO_URI'),
  jwtSecret: getEnvironmentVariable('JWT_SECRET'),
  corsOrigin: getEnvironmentVariable('CORS_ORIGIN'),
  emailConfig: {
    service: getEnvironmentVariable('EMAIL_SERVICE'),
    username: getEnvironmentVariable('EMAIL_USERNAME'),
    password: getEnvironmentVariable('EMAIL_PASSWORD'),
  },
  logLevel: getEnvironmentVariable('LOG_LEVEL', 'debug'),
};
