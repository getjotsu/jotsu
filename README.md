# Jotsu

Welcome to Jotsu!

The Jotsu libraries are still in beta and changing frequently.

Currently, here's what's supported:

**Authentication and Authorization**:
Use Jotsu to add authentication and authorization to your application.   
Full role-based access control and permission system.  No need for costly and complex auth0, cognito or DIY. 
An easy-to-use admin UI is available at [my.jotsu.com](https://my.jotsu.com/login).

**Forms**:
Easily add forms to your site for contact, registration and more.   Accessible and completely customizable.

## Packages
This repository is a mono-repo.   Here are the packages:

* [jotsu-js](packages/jotsu-js): Base Jotsu library.   (You'll likely want one of the next two instead)
* [dh-jotsu-js](packages/dh-jotsu-js): Declarative HTML.
* [react-jotsu-js](packages/react-jotsu-js): React components for jotsu-js.

## Development
Use lerna and npm to build.

```shell
npm install
npm build
```
