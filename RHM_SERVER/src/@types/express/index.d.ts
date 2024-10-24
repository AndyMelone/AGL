/* eslint-disable @typescript-eslint/no-explicit-any */


declare module Express {
    export interface Request {
      user?: any;
      company?: any;
    }
  }
  