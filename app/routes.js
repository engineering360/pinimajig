'use strict';

const express = require('express');
const session = require('./controllers/sessions');
const users = require('./controllers/users');
const images = require('./controllers/images');

const { isLoggedIn, destroySession, saveSession, goHome, loginCallback } = session;
const router = express.Router();

router.get('/login', session.showLogin);
router.get('/logout', session.logout, destroySession, goHome);
router.get('/auth/:strategy', session.login);
router.get('/auth/:strategy/callback', loginCallback, saveSession, goHome);

router.get('/users', users.index);
router.get('/users/edit', isLoggedIn, users.edit);
router.post('/users/update', isLoggedIn, users.updateProfile);
router.get('/users/my-pins', users.myPins);
router.get('/users/:id/', users.show);
router.get('/users/:id/pins', users.pins);

router.get('/images', images.index);
router.post('/images/add', isLoggedIn, images.add);
router.get('/images/:id/like', isLoggedIn, images.like);
router.get('/images/:id/unlike', isLoggedIn, images.unlike);
router.get('/images/:id/remove', isLoggedIn, images.remove);

router.get('/', (req, res) => res.redirect('/images'));

module.exports = router;

