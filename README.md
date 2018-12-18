# MIT-Event-Booking [![Build Status](https://travis-ci.org/cribbl/miteb-frontend.svg?branch=master)](https://travis-ci.org/cribbl/miteb-frontend)
Online portal to book events and rooms for clubs of MIT.

## Folder Structure

After creation, your project should look like this:-

```
app/
  README.md
  node_modules/
  package.json
  public/
    index.html
    favicon.ico
    
  src/
    components/
      Auth/
        login.js
	signup.js
	
    services/
      FirebaseAuthService.js
      FirebaseDBService.js
      
    styles/
      base.scss
      
    App.scss
    App.js
    index.scss
    index.js
```
## Available Scripts

`npm start` : Runs the app in the development mode on port 3000

`npm run build` : Builds the app for production to the `build` folder.<br>

`npm run deploy` : Builds the app for production to the `build` folder and then deploys to the gh-pages branch<br>

## Installing a Dependency

You may install other dependencies with `npm`:

```sh
npm install --save react-router
```
