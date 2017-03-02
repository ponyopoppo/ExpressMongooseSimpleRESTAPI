import express from 'express';
import jwt from 'jsonwebtoken';

import config from '../../config/config';
import authMiddle from '../helper/authMiddle';
import { checkHash } from '../helper/hash';
import User from '../models/user.model';

const router = express.Router(); // eslint-disable-line new-cap

const user = {
  username: "u", password: "p"
}

router.route('/login')
  .post((req, res, next) => {
    User.find({ username: req.body.username })
      .exec()
      .then(users => users[0])
      .then(user => {
        if (!user) return next("No user");
        checkHash(req.body.password, user.password).then(() => {
          const token = jwt.sign({ user: user }, config.jwtSecret, { expiresIn: '24h' });
          return res.json({ token });
        }).catch(next);
      })
  });

router.route('/loguot')
  .post((req, res, next) => {
  });

router.route('/random-number')
  .get(authMiddle, (req, res) => {
    return res.json({
      user: req.user,
      num: Math.random() * 100
    });
  });

export default router;
