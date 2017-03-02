import express from 'express';

import User from '../models/user.model';
import { genHash } from '../helper/hash';
import authMiddle from '../helper/authMiddle';

const router = express.Router();

router.route('/')
  // get list
  .get(authMiddle, (req, res, next) => {
    const { limit = 50, skip = 0 } = req.query;
    User.list({ limit, skip })
      .then(users => res.json(users))
      .catch(next);
  })
  // create
  .post((req, res, next) =>
    genHash(req.body.password).then(hash => {
      const user = new User({
        username: req.body.username,
        password: hash,
      });
      user.save().then(savedUser => res.json(savedUser)).catch(next);
    }).catch(next)
  );

router.route('/:userId')
  // read
  .get(authMiddle, (req, res, next) => {
    if (!req.user) return next("Auth error");
    User.get(req.params.userId).then(user => {
      if (user.id !== req.user.id && !req.user.admin) return next("Auth error");
      res.json(user);
    })
  })
  // update
  .put(authMiddle, (req, res, next) => {
    if (!req.user) return next("Auth error");
    User.get(req.params.userId).then(user => {
      if (user.id !== req.user.id && !req.user.admin) return next("Auth error");

      [].forEach(key => user[key] = req.body[key]);
      if (req.body.password) {
        genHash(req.body.password).then(hash => {
          user.password = hash;
          user.save().then(savedUser => res.json(savedUser)).catch(next);
        }).catch(next)
      } else {
        user.save().then(savedUser => res.json(savedUser)).catch(next);
      }
    })
  })
  // delete
  .delete(authMiddle, (req, res, next) => {
    if (!req.user) return next("Auth error");
    User.get(req.params.userId).then(user => {
      if (user.id !== req.user.id && !req.user.admin) return next("Auth error");

      user.remove()
        .then(deletedUser => res.json(deletedUser))
        .catch(e => next(e));
    });
  });


export default router;
