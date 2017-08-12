'use strict';

const passport = require('passport');

module.exports = (function SessionsController() {
  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) { return next(); }
    return res.redirect('/login');
  }

  function saveSession(req, res, next) {
    req.session.save(next);
  }

  function destroySession(req, res, next) {
    req.session.destroy(next);
  }

  function logout(req, res, next) {
    req.logout();
    next();
  }

  function goHome(req, res) {
    res.redirect('/');
  }

  function showLogin(req, res) {
    req.session.returnTo = req.get('Referer');
    res.render('login', { title: 'Login', user: req.user, active: 'login' });
  }

  function login(req, res, next) {
    const strategy = req.params.strategy;
    passport.authenticate(strategy)(req, res, next);
  }

  function loginCallback(req, res, next) {
    const strategy = req.params.strategy;
    const options = {
      failureRedirect: '/login',
      failureFlash: true,
      successReturnToOrRedirect: '/users/my-pins',
      successFlash: { info: { success: 'Login successful' } },
    };
    passport.authenticate(strategy, options)(req, res, next);
  }

  return {
    isLoggedIn,
    saveSession,
    destroySession,
    logout,
    goHome,
    showLogin,
    login,
    loginCallback,
  };
}());
