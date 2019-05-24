const userController = require('../controllers/user_controller')

const routes = [
  {
    method: 'POST',
    url: '/user/login',
    handler: userController.checkLoginType
  },
 {
    method: 'POST',
    url: '/user/checkLoginExistences',
    handler: userController.checkLoginExistences
  },
 /*  {
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