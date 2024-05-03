import { env } from 'process';

export const getEnvironmentVariable = (
  key: string,
  defaultValue?: string,
): string => {
  const value = env[key];
  if (value !== undefined) {
    return value;
  }
  if (defaultValue !== undefined) {
    return defaultValue;
  }
  throw new Error(
    `Environment variable ${key} is not set and no default value was provided.`,
  );
};
