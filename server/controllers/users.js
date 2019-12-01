const User = require('../models').User;

module.exports = {
  findAll(req, res) {
    return User.findAll().then(users => {
      res.status(201).send(JSON.stringify(users, null, 4));
    });
  },

  create(req, res) {
    return User.create({
      name: req.body.name,
      email: req.body.email
    })
      .then(user => res.status(201).send(user))
      .catch(error => res.status(400).send(error));
  },

  findById(req, res) {
    return User.findByPk(req.params.id).then(user => {
      if (!user) {
        return 'not find';
      }
      res.status(201).send(user);
    });
  },

  updateById(req, res) {
    User.findByPk(req.params.id).then(user => {
      if (!user) {
        return res.status(404).send('No User');
      }
      user.name = req.body.name ? req.body.name : user.name;
      user.email = req.body.email ? req.body.email : user.email;
      user.save().then(user => {
        return res.status(200).send(user.get({ plain: true }));
      });
    });
  },

  deleteById(req, res) {
    User.findByPk(req.params.id).then(user => {
      if (!user) {
        return res.status(404).send('No User');
      }
      user.destroy().then(user => {
        return res.sendStatus(200);
      });
    });
  }
};
