import express from 'express';
import jwt from 'jsonwebtoken';

import config from '../../config/config';

export default (req, res, next) => {
  const token = req.body.token || req.query.token || req.headers['x-access-token'];
  if (!token) return next('No token');
  jwt.verify(token, config.jwtSecret, (e, decoded) => {
    if (e) return next('Auth error');
    req.user = decoded;
    next();
  });
};
