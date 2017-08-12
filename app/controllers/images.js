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
      return res.redirect(req.get('Referer'));
    })
    .catch(next);
}

function remove(req, res, next) {
  removeOwnImage(req.params.id, req.user.id)
    .then(() => {
      req.flash('info', { success: 'Image removed' });
      return res.redirect(req.get('Referer'));
    })
    .catch((err) => {
      if (err.notOwnImage) {
        req.flash('info', { danger: 'Not authorized to delete that image' });
        return res.redirect(req.get('Referer'));
      }
      return Promise.reject(err);
    })
    .catch(next);
}

function like(req, res, next) {
  likeImage(req.params.id, req.user)
    .then(() => {
      req.flash('info', { success: 'Image liked' });
      return res.redirect(req.get('Referer'));
    })
    .catch(next);
}

function unlike(req, res, next) {
  unlikeImage(req.params.id, req.user)
    .then(() => {
      req.flash('info', { success: 'Image unliked' });
      return res.redirect(req.get('Referer'));
    })
    .catch(next);
}

module.exports = {
  index,
  add,
  remove,
  like,
  unlike,
};

