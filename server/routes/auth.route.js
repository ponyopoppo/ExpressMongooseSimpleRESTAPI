import express from 'express';
import jwt from 'jsonwebtoken';

import config from '../../config/config';
import authMiddle from '../helper/authMiddle';

const router = express.Router(); // eslint-disable-line new-cap

const user = {
  username: "u", password: "p"
}

router.route('/login')
  .post((req, res, next) => {
    if (req.body.username !== user.username || req.body.password !== user.password) {
      return next("Auth error");
    }
    const token = jwt.sign({ user: user }, config.jwtSecret, { expiresIn: '24h' });
    res.cookie('token', token);
    return res.json({ token });
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
