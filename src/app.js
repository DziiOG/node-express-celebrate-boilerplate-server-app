/**
 * This is the starting point of the application where all other parts
 * are bootstrapped together
 */

// Initialize enviroment variables
require('dotenv').config()

// Setup hilary DI
const scope = require('hilary').scope('todolist')

scope.bootstrap(
  [
    scope.makeRegistrationTask(require('./bootstrap')),
    scope.makeRegistrationTask(require('./config')),
    scope.makeRegistrationTask(require('./helpers')),
    scope.makeRegistrationTask(require('./libs')),
    scope.makeRegistrationTask(require('./routers')),
    scope.makeRegistrationTask(require('./validators')),
    scope.makeRegistrationTask(require('./controllers')),
    scope.makeRegistrationTask(require('./repositories')),
    scope.makeRegistrationTask(require('./models'))
  ],
  function (err, scope) {
    if (err) {
      console.log(err)
      return
    }

    // Run application
    scope.resolve('bootstrap')
  }
)
