# React App based on create-react-app/react-router-dom

## Quick Start

Create a `.env` file with your Jotsu account ID, e.g.
```
REACT_APP_ACCOUNT_ID=123456
```

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Development
Using `npm link` is sensitive to React versions.

To link in dev versions of the libraries, do the following:

In this folder:
```shell
cd node_modules/react && npm link && cd ../..
cd node_modules/react-dom && npm link && cd ../..
```

In the top-level directory (containing node_modules), run the following.
```shell
npm link react react-dom
```
