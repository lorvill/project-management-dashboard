import 'express-session';
import type { User } from '../generated/prisma/client';

declare module 'express-session' {
  interface SessionData {
    userId?: string;
  }
}

declare module 'express-serve-static-core' {
  interface Request {
    user?: User;
  }
}
