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

function newImage(req, res) {
  res.render('images/new', {
    title: 'New Image',
    user: req.user,
    messages: req.flash('info'),
  });
}

function addImage(req, res, next) {
  const { url, caption } = req.body;
  const image = {
    owner: req.user._id,
    url,
    caption,
  };

  createImage(image)
    .then(() => {
      req.flash('info', { success: 'Image successfuly added' });
      res.redirect(`/user/${req.user.id}/images`);
    })
    .catch(next);
}

function removeImage(req, res, next) {
  removeOwnImage(req.params.id, req.user.id)
    .then(() => {
      req.flash('info', { success: 'Image removed' });
      return res.redirect(`/user/${req.user.id}/images`);
    })
    .catch((err) => {
      if (err.notOwnImage) {
        req.flash('info', { danger: 'Not authorized to delete that image' });
        return res.redirect(`/user/${req.user.id}/images`);
      }
      throw err;
    })
    .catch(next);
}

function imageRedirect(req, res) {
  if (req.query.userId) {
    return res.redirect(`/user/${req.query.userId}/images`);
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
  newImage,
  addImage,
  removeImage,
  like,
  unlike,
  imageRedirect,
};

