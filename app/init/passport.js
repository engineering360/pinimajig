'use strict';

const GitHubStrategy = require('passport-github').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;
const User = require('../app/models/User.js');

const googleAuth = {
  clientID: process.env.GOOGLE_KEY,
  clientSecret: process.env.GOOGLE_SECRET,
  callbackURL: `${process.env.APP_URL}auth/google/callback`,
};
const githubAuth = {
  clientID: process.env.GITHUB_KEY,
  clientSecret: process.env.GITHUB_SECRET,
  callbackURL: `${process.env.APP_URL}auth/github/callback`,
};
const linkedinAuth = {
  clientID: process.env.LINKEDIN_KEY,
  clientSecret: process.env.LINKEDIN_SECRET,
  callbackURL: `${process.env.APP_URL}auth/linkedin/callback`,
  scope: ['r_basicprofile'],
  state: true,
};

function findOrCreateUser(profile, done) {
  return User.findOne({ provider: profile.provider, providerId: profile.id })
    .then((user) => {
      if (user) return done(null, user);
      const newUser = new User();
      newUser.provider = profile.provider;
      newUser.providerId = profile.id;
      newUser.fullName = profile.displayName;
      newUser.username = profile.username || profile.displayName;
      if (profile.provider === 'github') {
        newUser.city = (profile._json || {}).location;
      }
      if (profile.provider === 'linkedin') {
        newUser.city = ((profile._json || {}).location || {}).name;
      }
      return newUser.save()
        .then(() => done(null, newUser));
    })
    .catch(done);
}

function Passport(passport) {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });

  passport.use(new GoogleStrategy(googleAuth,
    (token, refreshToken, profile, done) => {
      process.nextTick(() => findOrCreateUser(profile, done));
    }));

  passport.use(new GitHubStrategy(githubAuth,
    (token, refreshToken, profile, done) => {
      process.nextTick(() => findOrCreateUser(profile, done));
    }));

  passport.use(new LinkedInStrategy(linkedinAuth,
    (token, refreshToken, profile, done) => {
      process.nextTick(() => findOrCreateUser(profile, done));
    }));
}

module.exports = Passport;

