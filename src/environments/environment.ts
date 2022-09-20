// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { IEnvironment } from './environment.interface';

export const environment: IEnvironment = {
  production: false,
  msalRedirectUri: 'http://localhost:31641',
  apiMytra: 'https://iotapipro.azurewebsites.net',
  // apiDigitalizacion: 'http://localhost:3333',
  // apiDigitalizacion: 'https://apisharedpro-staging.azurewebsites.net',
  apiDigitalizacion: 'https://apisharedpro.azurewebsites.net',
  apiScada: 'https://app-apiscada-pro-001.azurewebsites.net',
  // apiScada: 'https://localhost:7138',
  loadfunction: 'https://funiotloadconfigdev.azurewebsites.net/api/loadConfig'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
