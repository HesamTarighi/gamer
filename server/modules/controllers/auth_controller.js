const url = require('url');
const jwt = require('jsonwebtoken');
const {SendEmail} = require('../email');
const {Decode} = require('../user');
const {Insert, Select, Update, Delete} = require('../mysql');

const Signin = (req, res) => {
  storage = req.session;
  storage.code = Math.floor(10000000 + Math.random() * 99999999);
  SendEmail(req.body.email, 'Gamer Qom', storage.code)
  storage.user = { name: req.body.name, last_name: req.body.last_name, email: req.body.email, password: req.body.password };
  storage.email = req.body.email
  res.status(200).json({
    message: 'کد تایید به ایمیل شما ارسال شد.',
    type: 'successful',
    cookie: 'true',
    successful: true,
  })
};

const Verify = (req, res) => {
  storage.code = null;
  if (storage.user != '' && storage.user != 'null') {
    const fields = ['name', 'last_name', 'email', 'password'];
    const values = [storage.user.name, storage.user.last_name, storage.user.email, storage.user.password];

    Insert('users', fields, values, (result) => {
      res.status(200).json({
        message: 'حساب کاربری شما با موفقیت ساخته شد.',
        type: 'success',
        data: {
          name: storage.user.name,
          last_name: storage.user.last_name,
          email: storage.user.email,
          password: storage.user.password,
        },
        successful: true,
      })
    })
  }else {
  res.json({
      message: 'مشکلی پیش آمد!',
      type: 'error',
    })
  }
};

const Login = (req, res) => {
  const token = jwt.sign({ user: req.body }, 'oikujhj');
  const refresh = jwt.sign({ user: req.body }, 'gjgjggghjj');

  res.status(200).json({
    message: '',
    type: 'success',
    token: token,
    refresh: refresh,
  })
};

const User = (req, res) => {
  const email = Decode(req).email;
  Select('users', '*', [['email', email]], (result) => {
    res.status(200).json({user: result[0]})
  })
};

const Types = (req, res) => {
  Select('types', '*', undefined, (result) => {
    res.status(200).json(result)
  })
}

const Products = (req, res) => {
  Select('products', '*', undefined, (result) => {
    res.status(200).json(result)
  })
}

const Categories = (req, res) => {
  Select('categories', '*', undefined, (result) => {
    res.status(200).json(result)
  })
}

const Highlights = (req, res) => {
  Select('highlights', '*', undefined, (result) => {
    res.status(200).json(result)
  })
}

const Articles = (req, res) => {
  Select('articles', '*', undefined, (result) => {
    res.status(200).json(result)
  })
}

const ChangePassword = (req, res) => {
  switch (req.body.action) {
    case 'email':
      storage.code = Math.floor(10000000 + Math.random() * 99999999);
      storage.email = req.body.email;
      SendEmail(req.body.email, 'Gamer Qom', storage.code)
      res.status(200).json({
        message: 'کد تایید به ایمیل شما ارسال شد',
        type: 'success',
        cookie: 'true',
        successful: true,
      })
      break;

    case 'verify':
      storage.forget_password_verify = true;
      res.status(200).json({
        message: '',
        type: 'success',
        cookie: 'true',
        successful: true,
      })
      break;

    case 'change':
      Update('users', ['password', req.body.password], ['email', storage.email], (result) => {
        res.status(200).json({
          message: 'رمز عبور شما با موفقیت تغییر کرد.',
          type: 'success',
          successful: true,
        })
      })
      break;
  }
}

const ResendCode = (req, res) => {
  storage.code = Math.floor(10000000 + Math.random() * 99999999);
  SendEmail(storage.email, 'Gamer Qom', storage.code)
  res.status(200).json({
    message: 'کد تایید به ایمیل شما ارسال شد.',
    type: 'success',
  })
}

const AddToCart = (req, res) => {
  const fields = ['name', 'image', 'price', 'count', 'prod_id', 'user_email'];
  const values = [req.body.name, req.body.image, req.body.price, req.body.count, req.body.id, Decode(req).email];

  Insert('cart', fields, values, (result) => {
    res.status(200).json({
      message: `${req.body.name}, به سبد خرید شما اضافه شد.`,
      type: 'success',
      successful: true,
    })
  })
}

const DeleteFromCart = (req, res) => {
  const id = url.parse(req.url, true).query.id;
  Delete('cart', id, ['user_email', Decode(req).email], (result) => {
    res.status(200).json({
      message: `از سبد خرید شما حذف شد.`,
      type: 'success'
    })
  })
}

const UpdateCart = (req, res) => {
  Select('products', '*', undefined, (products) => {
    Select('cart', '*', undefined, (result) => {
      if (result != '' && result != null) {
        var short = new Set(products.map((item) => item.id));

        prod = result.filter((item) => {
          return !short.has(item.prod_id)
        });

        for (let i = 0; i < prod.length; i++) {
          Delete('cart', prod[i].id, [['user_email', Decode(req).email]], (result) => {})
        }
      }
    })
  })

  res.status(200).send('ghh')
}

const GetCart = (req, res) => {
  Select('cart', '*', [['user_email', Decode(req).email]], (result) => {
    res.status(200).json(result)
  })
}

const CountCart = (req, res) => {
  Select('cart', '*', [['user_email', Decode(req).email]], (result) => {
    res.status(200).json(String(result.length))
  })
}

const CartTotalPrice = (req, res) => {
  Select('cart', '*', [['user_email', Decode(req).email]], (result) => {
    const total = result.reduce((total, num) => {
      return (eval(num.price * num.count) + total)
    }, 0)

    res.status(200).send(String(total))
  })
}

const Logout = (req, res) => {
  res.status(200).json({
    message: 'شما خارج شدید.',
    type: 'success'
  })
}

module.exports = {
  Signin,
  Login,
  Verify,
  User,
  Types,
  Products,
  Categories,
  Highlights,
  Articles,
  ChangePassword,
  ResendCode,
  AddToCart,
  DeleteFromCart,
  UpdateCart,
  GetCart,
  CountCart,
  CartTotalPrice,
  Logout
}
