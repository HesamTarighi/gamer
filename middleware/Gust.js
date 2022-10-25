export default (context) => {
  if (context.route.path == '/verify') {
    if (context.app.$cookies.get('signin') != true) {
      context.redirect('/signin')
    }
  }

  if (context.route.path == '/forget_password/verify') {
    if (context.app.$cookies.get('forget_password_email') != true) {
      context.redirect('/forget_password')
    }
  }

  if (context.route.path == '/forget_password/change_password') {
    if (context.app.$cookies.get('forget_password_verify') != true) {
      context.redirect('/forget_password')
    }
  }

  if (context.route.path == '/login' || context.route.path == '/signin' || context.route.path == '/forget_password') {
    if (context.$auth.loggedIn) {
      context.redirect('/')
    }
  }
}
