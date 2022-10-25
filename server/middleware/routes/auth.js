const express = require('express');
const {
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
} = require('../../modules/controllers/auth_controller.js');
const {
  SIGNIN_VALIDATOR,
  LOGIN_VALIDATOR,
  VERIFY_VALIDATOR,
  FORGETPASSWORD_VALIDATOR,
  RESENDCODE_VALIDATOR,
  CART_VALIDATOR,
  ADDTOCART_VALIDATOR,
  DELETEFROMCART_VALIDATOR,
  USER_VALIDATOR
} = require('../validators/auth_validator.js');

const router = express.Router();

// Signin
router.get('/api/user', [USER_VALIDATOR], User)
router.get('/api/types', Types)
router.get('/api/products', Products)
router.get('/api/categories', Categories)
router.get('/api/highlights', Highlights)
router.get('/api/articles', Articles)
router.get('/api/resend_code', [RESENDCODE_VALIDATOR], ResendCode)
router.get('/api/get_cart', [CART_VALIDATOR], GetCart)
router.get('/api/count_cart', [CART_VALIDATOR], CountCart)
router.get('/api/total_price', [CART_VALIDATOR], CartTotalPrice)
router.post('/api/signin', [SIGNIN_VALIDATOR], Signin)
router.post('/api/login', [LOGIN_VALIDATOR], Login)
router.post('/api/verify', [VERIFY_VALIDATOR], Verify)
router.post('/api/add_to_cart', [CART_VALIDATOR, ADDTOCART_VALIDATOR], AddToCart)
router.put('/api/forget_password', [FORGETPASSWORD_VALIDATOR], ChangePassword)
router.delete('/api/delete_cart', [CART_VALIDATOR, DELETEFROMCART_VALIDATOR], DeleteFromCart)
router.delete('/api/update_cart', [CART_VALIDATOR], UpdateCart)
router.delete('/api/logout', Logout)

module.exports = router;
