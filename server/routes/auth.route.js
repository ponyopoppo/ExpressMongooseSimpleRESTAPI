import express from 'express';
import jwt from 'jsonwebtoken';

import config from '../../config/config';
import authMiddle from '../helper/authMiddle';
import { checkHash } from '../helper/hash';
import User from '../models/user.model';

const router = express.Router(); // eslint-disable-line new-cap

router.route('/login')
  .post((req, res, next) => {
    User.find({ username: req.body.username })
      .exec()
      .then(users => users[0])
      .then(user => {
        if (!user) return res.status(401).json({ error: 'username' });
        checkHash(req.body.password, user.password).then(() => {
          const token = jwt.sign({
            id: user._id,
            username: user.username
          }, config.jwtSecret);
          return res.json({ token });
        }).catch(() => res.status(401).json({ error: 'password' }));
      })
  });

router.route('/status')
  .get(authMiddle, (req, res, next) => {
    return res.json(req.user);
  });

export default router;
