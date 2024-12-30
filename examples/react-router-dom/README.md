# React App based on create-react-app/react-router-dom

## Quick Start

Create a `.env` file with your Jotsu account ID, e.g.
```
REACT_APP_ACCOUNT_ID=123456
```

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).


## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.


## Development
Using `yarn link` is sensitive to React versions.

To link in dev versions of the libraries, do the following:

In this folder:
```shell
cd node_modules/react && yarn link
cd node_modules/react-dom && yarn link
```

In `packages/react-jotsu-js`:
```shell
npm link react react-dom
```

In this folder:
```shell
yarn link '@jotsu/jotsu-js' '@jotsu/react-jotsu-js'
```
