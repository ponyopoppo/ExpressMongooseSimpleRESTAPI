import express from 'express';
import User from '../models/user.model';

const router = express.Router();

router.route('/')
  // get list
  .get((req, res, next) => {
    const { limit = 50, skip = 0 } = req.query;
    User.list({ limit, skip })
      .then(users => res.json(users))
      .catch(next);
  })
  // create
  .post((req, res, next) => {
    const user = new User({
      username: req.body.username,
      password: req.body.password,
    });

    user.save()
      .then(savedUser => res.json(savedUser))
      .catch(next);
  });

router.route('/:userId')
  // read
  .get((req, res) => res.json(req.user))
  // update
  .put((req, res, next) => {
    const user = req.user;
    ["username", "password"].forEach(key => user[key] = req.body[key]);
    user.save()
      .then(savedUser => res.json(savedUser))
      .catch(next);
  })
  // delete
  .delete((req, res, next) => {
    const user = req.user;
    user.remove()
      .then(deletedUser => res.json(deletedUser))
      .catch(e => next(e));
  });

router.param('userId', (req, res, next, userId) => {
  User.get(userId)
    .then(user => {
      req.user = user;
      return next();
    })
    .catch(next);
});

export default router;
