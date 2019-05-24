const forgotPasswordController = require('../controllers/forgot_password_controller')

const routes = [
  {
    method: 'GET',
    url: '/user/forgotPassword',
    handler: forgotPasswordController.checkLoginType
  }
 /* {
    method: 'GET',
    url: '/api/cars/:id',
    handler: carController.getSingleCar
  },
  {
    method: 'POST',
    url: '/api/cars',
    handler: carController.addCar,
    schema: documentation.addCarSchema
  },
  {
    method: 'PUT',
    url: '/api/cars/:id',
    handler: carController.updateCar
  },
  {
    method: 'DELETE',
    url: '/api/cars/:id',
    handler: carController.deleteCar
  }
  */
]

module.exports = routes