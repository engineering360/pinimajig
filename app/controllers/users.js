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
    updateProfile,
  };
}());

