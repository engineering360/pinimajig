# pin-images
Pin links to images on your wall

Browse recent images that all users have pinned
Browse individual users walls of pinned images
Login to like or unlike other users images
Login to add or delete image links to your wall
Broken links are handled on the client

User:
 - provider, providerId // for Oauth2 logins
 - username
 - images: [imageId]
 
Image:
 - url
 - caption
 - likes: [userId]
