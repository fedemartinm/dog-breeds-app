# Dog Breeds App
<img src="./docs/app-demo.gif" width="320" alt="Demo App"/>

## Project structure
The project is a monorepo with the following directories

```
/dog-breeds-app
├── docs
├── common - shared code and types
├── firebase-api - api implementation
└── mobile-app - app implementation
```

## Steps to run the APP
- install modules with `yarn` or `npm install`
- install pods (for iOS)
- run app with `yarn start ios/android` or `npm run start ios/android`

## Steps to deploy the API
- log in to firebase with `firebase login`
- initialize your own project with `firebase init`
- deploy updated code with `firebase  deploy --only functions`

## Notes
- `firebase-tools` assumes that all packages used by cloud functions are available in npm, so we couldn't share code and types.
  To fix this, I packaged common page on pre-install hook.
  Todo: check @rxdi/firelink to sync local libs when deploying monorepos with firebase or use lerna to build into different outputs. 
