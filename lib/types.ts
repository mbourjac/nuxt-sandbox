import type { User } from './auth';

declare module 'h3' {
  interface H3EventContext {
    user?: User;
  }
}
