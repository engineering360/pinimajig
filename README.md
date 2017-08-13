# Pinimajig
Pin images from the web to your wall

## Features
- Browse recent images that all users have pinned
 - Browse individual users walls of pinned images
 - Login to like or unlike other users images
 - Login to add or delete image links to your wall

Broken image links are shown with a default image

## Backend
Pinimajig is an Express.js app that uses Passport.js for OAuth2
logins. Mongoose and Mongodb are used for persistence.

The data model consists of a `User` and `Image` with the following fields:
```
User:
 - provider, providerId // for oauth2 logins
 - username
 - city
 - images: [imageId]
 
Image:
 - url
 - caption
 - owner
 - likes: [userId]
```

## Frontend
All functionality is provided on the backend, and no javascript is delivered to the client.
In the future javascript may be added as progressive enhancement to make the app more
responsive and smooth.
