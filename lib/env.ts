import { z } from 'zod';
import { tryParseEnv } from './try-parse-env';

const envSchema = z.object({
  NODE_ENV: z.string(),
  TURSO_DATABASE_URL: z.string(),
  TURSO_AUTH_TOKEN: z.string(),
});

export type Env = z.infer<typeof envSchema>;

tryParseEnv(envSchema);

// eslint-disable-next-line no-process-env
export const env = envSchema.parse(process.env);
