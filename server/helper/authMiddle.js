import express from 'express';
import jwt from 'jsonwebtoken';

import config from '../../config/config';

export default (req, res, next) => {
  const token = req.body.token || req.query.token || req.headers['x-access-token'];
  if (!token) return res.status(401).send("No token");
  jwt.verify(token, config.jwtSecret, (e, decoded) => {
    if (e) return res.status(401).send("Token error");
    req.user = decoded;
    next();
  });
};
