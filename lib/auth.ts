import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { db } from './db/index';
import { env } from './env';
import { createAuthMiddleware } from 'better-auth/plugins';

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'sqlite',
  }),
  advanced: {
    generateId: false,
  },
  socialProviders: {
    github: {
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
    },
  },
  hooks: {
    after: createAuthMiddleware(async (ctx) => {
      if (ctx.path === '/get-session') {
        if (!ctx.context.session) {
          return ctx.json({
            session: null,
            user: null,
          });
        }
        return ctx.json(ctx.context.session);
      }
    }),
  },
});
