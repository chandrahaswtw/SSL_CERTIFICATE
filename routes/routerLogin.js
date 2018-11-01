var router = require('express').Router();
const path = require('path');
var bcrypt = require('bcryptjs');
const { login } = require('./record_ops/cloudant');
const { checkAuth } = require('./login_ops/checkAuth');

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;


router.get('/login', (req, res) => {
  res.render('login', { FLASH: req.flash('INFO')[0] });
})

router.get('/logout', checkAuth, (req, res) => {
  req.flash('INFO', ((req.user.username).split('@')[0]))
  req.logout();
  //res.clearCookie('connect.sid');
  res.redirect('/login');
})

router.post('/loginPost', function (req, res, next) {
  passport.authenticate('local', function (err, user, info) {

    if (user.STATUS == "NEW")
      return res.send(user);

    if (user) {
      req.login(user, function (err) {
        return res.send({ STATUS: 'SUCCESS', USER: req.user });
      });
    }
    else
      return res.send({ STATUS: 'FAIL' });

  })(req, res, next)

});



// STRATEGY
passport.use(new LocalStrategy(
  function (username, password, done) {
    decrypto(username, password, function (res) {
      return done(null, res);
    })

  }
));


// SERIALIZE AND DESERIALIZE
passport.serializeUser(function (id, done) {
  done(null, id);
});

passport.deserializeUser(function (id, done) {
  done(null, id);
});


// CRYPTO AND DECRYPTO
var crypto = (usr, pwd) => {

  var bcrypt = require('bcryptjs');
  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(pwd, salt, function (err, hash) {
      return hash;
    });
  });

}

var decrypto = (usr, pwd, cb) => {

  login.find({
    "selector": {
      "username": usr
    }
  }, function (err, result) {

    if (!result.docs[0]) {
      return cb(false);
    }

    bcrypt.compare(pwd, (result.docs)[0].password, function (err, res) {
      if (res) {
        if ((result.docs)[0].flag == 0)
          return cb({ STATUS: 'NEW' });
        return cb({ username: (result.docs)[0].username });
      }
      else
        return cb(res);
    });
  }
  )
}


// EXPORTS
module.exports = router;