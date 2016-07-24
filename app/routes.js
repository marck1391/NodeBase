module.exports = {
  '/': 'MainController.index',
  '/login': '?UserController.index',
  '/register': '?UserController.register',
  'post /login': '?UserController.login',
  'post /signup': '?UserController.signup',
  '/logout': '!UserController.logout'
}
