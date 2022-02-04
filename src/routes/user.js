let express = require("express");
let router = express.Router();
// controlladores
let {
  profile,
  cart,
  login,
  register,
  processLogin,
  logout,
  profileEdit,
  updateProfile,
  processRegister,
  deleteProfile,
  loginGoogle,
  loginFacebook,
  forget
} = require("../controllers/userController.js");

// middleware express validation
const registerValidation = require("../validations/registerValidation");
const loginValidator = require("../validations/loginValidator");

// middleware local
const userLog = require("../middleware/userLog");
const uploadUserAvatar = require("../middleware/uploadUserAvatar");
const userSessionCheck = require("../middleware/userSessionCheck");

// 1
//////////////////////////////////////
/* passport */
const passport = require('passport');
//////////////////////////////////////

// 2
//////////////////////////////////////
passport.serializeUser(function(user, done) {
  done(null, user);
});
/////////////////////////////////////

// 3
/////////////////////////////////////
passport.deserializeUser(function(user, done) {
  done(null, user);
});
////////////////////////////////////

// 4
//////////////////////////////////
/* Facebook API SING IN*/
const facebookLogin = require('../functions/loginFacebook');
facebookLogin()
/////////////////////////////////



/* Google API SING IN*/
const googleLogin = require('../functions/loginGoogle');
googleLogin()

/* View login */
router.get("/login", userLog, login);
router.post("/login", loginValidator, processLogin);
router.get("/logout", logout);

/* View register */
router.get("/register", userLog, register);
router.post("/register", userLog, registerValidation, processRegister);

/* View perfil user */
router.get("/perfil", userSessionCheck, profile);
router.get("/profile/edit/:id", userSessionCheck, profileEdit);
router.put(
  "/profile/edit/:id",
  uploadUserAvatar.single("avatar"),
  updateProfile
);
router.delete(
  "/perfil/delete/:id",
  uploadUserAvatar.single("avatar"),
  deleteProfile
);
/* Coincidencia de datos para recuperar contraseña */
router.get('/forgetPass',forget)

/* View cart shopping  */
router.get("/cart", userSessionCheck, cart);

/* Google Sing In */
router.get("/auth/google", passport.authenticate("google", {scope: ["profile", "email"]}));
router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/user/login' }), loginGoogle);



// 5
//////////////////////////////////////////////
/* Facebook Sing In */
router.get("/auth/facebook", passport.authenticate("facebook", {scope: ['email', 'user_friends']})); // metodo de passport
router.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/user/login' }), loginFacebook); //metodo de controlador
//////////////////////////////////////////////


module.exports = router;
