import { defineMiddleware } from 'astro:middleware';
import { initDBInstance } from '@flarekit/database';

export const onRequest = defineMiddleware(async (context, next) => {
  context.locals.DB = initDBInstance(context, context.locals.runtime.env);
  // Get the current URL
  const { url } = context.request;
  const urlObject = new URL(url);
  context.locals.baseURL = `${urlObject.protocol}//${urlObject.host}`;
  // return a Response or the result of calling `next()`
  return next();
});
