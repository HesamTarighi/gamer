const url = require('url');
const {Select} = require('../../modules/mysql');
const {Decode} = require('../../modules/user');
const name = /^[A-Za-z]{3,25}$/i;
const last_name = /^[A-Za-z]{3,25}$/i;
const email = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{1,3})$/;
const password = /^[A-Za-z0-9]{8,24}$/i;

const SIGNIN_VALIDATOR = (req, res, next) => {
  Select('users', '*', [['email', req.body.email]], (data) => {
    if (!name.test(req.body.name)) {
      res.status(203).json({message: 'نام وارد شده صحیح نیست!', type: 'error'})
    }else if(!last_name.test(req.body.last_name)) {
      res.status(203).json({message: 'نام خانوادگی وارد شده صحیح نیست!', type: 'error'})
    }else if(!email.test(req.body.email)) {
      res.status(203).json({message: 'ایمیل وارد شده اشتباه است!', type: 'error'})
    }else if(data != ''){
      res.status(203).json({message: 'این حساب کاربری از قبل ساخته شده است!', type: 'error'})
    }else if(!password.test(req.body.password)) {
      res.status(203).json({message: 'رمز عبور وارد شده صحیح نیست!', type: 'error'})
    }else {
      next()
    }
  })
}

const LOGIN_VALIDATOR = (req, res, next) => {
  Select('users', '*', [['email', req.body.email]], (data) => {
    if (data != '') {
      if (data[0].password == req.body.password) {
        next()
      }else {
        res.status(203).json({
          message: 'ایمیل یا رمز عبور اشتباه است!',
          type: 'error',
        })
      }
    }else {
      res.status(203).json({
        message: 'ایمیل یا رمز عبور اشتباه است!',
        type: 'error',
      })
    }
  })
}

const VERIFY_VALIDATOR = (req, res, next) => {
  if (storage != null) {
    if (storage.code != undefined) {
      if (req.body.code == storage.code) {
        next()
      }else {
        res.status(203).json({
          message: 'کد وارد شده اشتباه است!',
          type: 'error',
        })
      }
    }else {
      res.status(203).json({
        message: 'کد وارد شده اشتباه است!',
        type: 'error',
      })
    }
  }else{
    res.status(203).json({
      message: 'مشکلی پیش آمد!',
      type: 'error',
    })
  }
}

const FORGETPASSWORD_VALIDATOR = (req, res, next) => {
  switch (req.body.action) {
    case 'email':
      storage = req.session;
      Select('users', '*', ['email', req.body.email], (result) => {
        if (result != '') {
          next()
        }else {
          res.status(203).json({
            message: 'این ایمیل وجود ندارد!',
            type: 'error',
          })
        }
      })
      break;

    case 'verify':
      if (storage.code != null && storage.email != null) {
        if (req.body.code == storage.code) {
          next()
        }else {
          res.status(203).json({
            message: 'کد وارد شده اشتباه است!',
            type: 'error',
          })
        }
      }
      break;

    case 'change':
      if (storage.forget_password_verify) {
        if(!password.test(req.body.password)) {
          res.status(203).json({message: 'رمز عبور وارد شده صحیح نیست!', type: 'error'})
        }else if (req.body.re_password != req.body.password) {
          res.status(203).json({message: 'تکرار رمز عبور صحیح نیست!', type: 'error'})
        }else {
          next()
        }
      }
      break;
  }
}

const RESENDCODE_VALIDATOR = (req, res, next) => {
  if (storage != null) {
    if (storage.email != null && storage.email != undefined && storage.email != '') {
      next()
    }else {
      res.status(203).json({
        message: 'ایمیلی وجود ندارد!',
        type: 'error',
      })
    }
  }
}

const CART_VALIDATOR = (req, res, next) => {
  if (req.headers.authorization) {
    next()
  }else {
    res.json({
      message: 'لطفا وارد شوید.'
    })
  }
}

const ADDTOCART_VALIDATOR = (req, res, next) => {
  // Select('cart', ['user_email', Decode(req).email], (result) => {
  //   Select('cart', ['prod_id', req.body.id], (result2) => {
  //     if (result2.length < 1 && req.body.count <= req.body.max_count) {
  //       next()
  //     }else {
  //       res.json({
  //         message: '',
  //       })
  //     }
  //   })
  // })

  Select('cart', '*', [['user_email', Decode(req).email], ['prod_id', req.body.id], ['prod_id', req.body.id]], (result) => {
    if (result.length < 1 && req.body.count <= req.body.max_count) {
      next()
    }else {
      res.json({
        message: '',
      })
    }
  })
}

const DELETEFROMCART_VALIDATOR = (req, res, next) => {
  const parse = url.parse(req.url, true);
  Select('cart', '*', [['id', parse.query.id]], (result) => {
    console.log(result);
    if (result != null && result != '' && result != undefined) {
      next()
    }else {
      res.status(203).json({
        message: 'مشکلی پیش آمد',
        type: 'error',
      })
    }
  })
}

const USER_VALIDATOR = (req, res, next) => {
  if (req.headers.authorization) {
    next()
  }else {
    res.send('لطفا وارد شوید.')
  }
}

module.exports = {
  SIGNIN_VALIDATOR,
  LOGIN_VALIDATOR,
  VERIFY_VALIDATOR,
  FORGETPASSWORD_VALIDATOR,
  RESENDCODE_VALIDATOR,
  CART_VALIDATOR,
  ADDTOCART_VALIDATOR,
  DELETEFROMCART_VALIDATOR,
  USER_VALIDATOR
};
