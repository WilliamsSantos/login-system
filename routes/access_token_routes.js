const checkTokenController = require('../controllers/access_token_controller')

const routes = [
  {
    method: 'POST',
    url: '/user/checkToken',
    handler: checkTokenController.checkToken
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