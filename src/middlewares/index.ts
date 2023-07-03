import express from 'express';

import { get, merge } from 'lodash';

import { getUserBySessionToken } from '../db/users';

export const isOwner = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const {id} = req.params;

    const currentUserId = get(req, 'identity._id') as string;

    // TODO check ownership of the resource with id and currentUserId

    if(!currentUserId) {
      return res.sendStatus(403);
    }

    if(currentUserId.toString() !== id) {
      return res.sendStatus(403);
    }

    next();

  } catch (error) {
    console.log(error)
  }
}

export const isAuthenticated = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const sessionToken = req.cookies['NODEJS_AUTH'];

    if(!sessionToken) {
      return res.sendStatus(403);
    }

    const existingUser = await getUserBySessionToken(sessionToken);

    if(!existingUser) {
      return res.sendStatus(403);
    }

    merge(req, {identity: existingUser});

    return next();

  } catch (error) {
    console.log(error)
  }
}