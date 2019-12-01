const todosController = require('../controllers').todos;
const usersController = require('../controllers').users;

module.exports = app => {
  app.get('/api', (req, res) =>
    res.status(200).send({
      message: 'Welcome to the Todos API!'
    })
  );

  app.post('/api/todos', todosController.create);

  app.get('/api/users', usersController.findAll);

  app.post('/api/users', usersController.create);
  app.get('/api/users/:id', usersController.findById);
  app.put('/api/users/:id', usersController.updateById);
  app.delete('/api/users/:id', usersController.deleteById);
};
