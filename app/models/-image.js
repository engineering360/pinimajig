'use strict';

const Image = require('./image');
const User = require('./user');

function findImage(where) {
  return Image.find(where)
    .populate('owner likes')
    .sort({ _id: -1 });
}

function createImage(image) {
  return Image.create(image)
    .then(created => User.update({ _id: created.owner },
      { $push: { images: created._id } }));
}

function remove(image) {
  return image.remove()
    .then(() => User.update({ _id: image.owner },
      { $pull: { images: image._id } }));
}

function removeOwnImage(imageId, userId) {
  return Image.findById(imageId)
    .then((image) => {
      if (image.owner.toString() !== userId) {
        return Promise.reject({ notOwnImage: true });
      }
      return remove(image);
    });
}

function likeImage(imageId, user) {
  return Image.findByIdAndUpdate(imageId, { $addToSet: { likes: user._id } });
}

function unlikeImage(imageId, user) {
  return Image.findByIdAndUpdate(imageId, { $pull: { likes: user._id } });
}

module.exports = {
  findImage,
  createImage,
  removeOwnImage,
  likeImage,
  unlikeImage,
};
