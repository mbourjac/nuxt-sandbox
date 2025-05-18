/* eslint-disable no-process-env */
import type { ZodObject, ZodRawShape } from 'zod';
import { ZodError } from 'zod';

export const tryParseEnv = <T extends ZodRawShape>(
  envSchema: ZodObject<T>,
  buildEnv: Record<string, string | undefined> = process.env
) => {
  try {
    envSchema.parse(buildEnv);
  } catch (error) {
    if (error instanceof ZodError) {
      let message = 'Missing required values in .env:\n';

      error.issues.forEach((issue) => {
        message += `${issue.path[0]}\n`;
      });

      const formattedError = new Error(message);

      formattedError.stack = '';
      throw formattedError;
    } else {
      console.error(error);
    }
  }
};
