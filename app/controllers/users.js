'use strict';

const User = require('../models/user');

module.exports = (function UserController() {
  function edit(req, res) {
    res.render('users/edit', {
      title: 'My Profile',
      user: req.user,
      active: 'editprofile',
      messages: req.flash('info'),
    });
  }

  function index(req, res, next) {
    User.find({})
      .then(users => res.render('users/index', {
        title: 'Users',
        user: req.user,
        users,
        active: 'users',
        messages: req.flash('info'),
      }))
      .catch(next);
  }

  function show(req, res, next) {
    User.findById(req.params.id)
      .then((user) => {
        if (user) {
          return res.render('users/show', {
            title: user.username,
            user: req.user,
            showUser: user,
            messages: req.flash('info'),
            active: (req.user || {}).id === user.id ? 'profile' : '',
          });
        }
        req.flash('info', { warning: 'User not found' });
        return res.redirect('/users');
      })
      .catch(next);
  }

  function findUser(userId) {
    return User.findById(userId)
      .populate({
        path: 'images',
        populate: {
          path: 'owner',
          ref: 'User',
        },
      })
      .populate({
        path: 'images',
        populate: {
          path: 'likes',
          ref: 'User',
        },
      });
  }

  function showUserPins(userId, req, res, next) {
    findUser(userId)
      .then((user) => {
        if (user) {
          return res.render('users/pins', {
            title: `${user.username}'s Pins`,
            user: req.user,
            showUser: user,
            messages: req.flash('info'),
            // tell the view to include the add pin form
            isShowUser: (req.user || {}).id === user.id,
          });
        }
        req.flash('info', { warning: 'User not found' });
        return res.redirect('/users');
      })
      .catch(next);
  }

  function pins(req, res, next) {
    showUserPins(req.params.id, req, res, next);
  }

  function myPins(req, res, next) {
    showUserPins(req.user.id, req, res, next);
  }

  function updateProfile(req, res, next) {
    const { username, fullName, city } = req.body;

    User.update({ _id: req.user.id }, { $set: { username, fullName, city } })
      .then(() => {
        req.flash('info', { success: 'Updated profile successfuly' });
        res.redirect(`/users/${req.user.id}`);
      })
      .catch(next);
  }

  return {
    edit,
    index,
    show,
    pins,
    myPins,
    updateProfile,
  };
}());

