'use strict';
module.exports = function(app) {
  var user = require('../controllers/userController');

  app.route('/user')
    .get(user.getUsers)
    .post(user.createUser);

  app.route('/user/:userId')
    .get(user.getUserById)
    .put(user.updateUser)
    .delete(user.deleteUser);

  app.route('/user/login')
    .post(user.authenticateUser)

  app.route('/user/info/:nickname')
    .get(user.getUserByNickname)
};
