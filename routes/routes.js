const userController           = require('../controllers/user_controller');
const recoverPassword          = require('../controllers/recover_password_controller');
const checkTokenController     = require('../controllers/access_token_controller');
const forgotPasswordController = require('../controllers/forgot_password_controller');

const routes = [
  {
    method: 'POST',
    url: '/user/login',
    handler: userController.login
  },
  {
    method: 'GET',
    url: '/user/forgotPassword',
    handler: forgotPasswordController.checkLoginType
  },
  {
    method: 'POST',
    url: '/user/recoverPassword/',
    handler: recoverPassword.checkLoginType
  },
  {
    method: 'GET',
    url: '/user/checkToken',
    handler: checkTokenController.checkToken
  }
]

module.exports = routes
