'use strict';

const express = require('express');
const session = require('./controllers/sessions');
const users = require('./controllers/users');

const { isLoggedIn, destroySession, saveSession, goHome, loginCallback } = session;
const router = express.Router();

router.get('/login', session.showLogin);
router.get('/logout', session.logout, destroySession, goHome);
router.get('/auth/:strategy', session.login);
router.get('/auth/:strategy/callback', loginCallback, saveSession, goHome);

router.get('/users', users.index);
router.get('/users/edit', isLoggedIn, users.edit);
router.post('/users/update', isLoggedIn, users.updateProfile);
router.get('/users/:id/', users.show);

router.get('/', (req, res) => res.send(`Hello ${(req.user || {}).username || 'Anonymous'}`));

module.exports = router;

