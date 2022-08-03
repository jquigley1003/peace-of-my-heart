import { env } from './env';

export const environment = {
  production: true,
  firebase: {
    apiKey: env.firebase.apiKey,
    projectId: env.firebase.projectId,
    storageBucket: env.firebase.storageBucket,
    messagingSenderId: env.firebase.messagingSenderId,
    appId: env.firebase.appId,
    measurementId: env.firebase.measurementId
  }
};
