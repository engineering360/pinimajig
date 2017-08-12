'use strict';

const {
  removeOwnImage,
  findImage,
  createImage,
  likeImage,
  unlikeImage,
} = require('../models/-image');

function index(req, res, next) {
  findImage({})
    .then((images) => {
      res.render('images/index', {
        images,
        title: 'Recent Images',
        user: req.user,
        active: 'images',
        messages: req.flash('info'),
      });
    })
    .catch(next);
}

function add(req, res, next) {
  const { url, caption } = req.body;
  const image = {
    owner: req.user._id,
    url,
    caption,
  };

  createImage(image)
    .then(() => {
      req.flash('info', { success: 'Image added' });
      next();
    })
    .catch(next);
}

function remove(req, res, next) {
  removeOwnImage(req.params.id, req.user.id)
    .then(() => {
      req.flash('info', { success: 'Image removed' });
      next();
    })
    .catch((err) => {
      if (err.notOwnImage) {
        req.flash('info', { danger: 'Not authorized to delete that image' });
        return next();
      }
      throw err;
    })
    .catch(next);
}

function redirect(req, res) {
  if (req.query.userId) {
    return res.redirect(`/users/${req.query.userId}/pins`);
  }
  return res.redirect('/images');
}

function like(req, res, next) {
  likeImage(req.params.id, req.user)
    .then(() => {
      req.flash('info', { success: 'Image liked' });
      return next();
    })
    .catch(next);
}

function unlike(req, res, next) {
  unlikeImage(req.params.id, req.user)
    .then(() => {
      req.flash('info', { success: 'Image unliked' });
      return next();
    })
    .catch(next);
}

module.exports = {
  index,
  add,
  remove,
  like,
  unlike,
  redirect,
};

