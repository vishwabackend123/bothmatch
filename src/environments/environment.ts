// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  baseUrl: "https://data.usajobs.gov/api",
  // baseUrl:"http://localhost:8000/",
  siteKey: "6LcD6aAcAAAAAFucR0IcVnwv4AuVDve7wEbN0dnd",
  passwordEncryptionKey: "ZKzeE1JApIA_ycm-nuaI5R8PrZDNgofKH05FOOgCsmI=",
  // backendBaseUrl :"http://ec2-18-210-218-55.compute-1.amazonaws.com:8000/",
  // backendBaseUrl :"http://127.0.0.1:8000/",
  backendBaseUrl :"https://2nfrmwo081.execute-api.us-east-1.amazonaws.com/",
  imgBaseUrl:"http://ec2-18-210-218-55.compute-1.amazonaws.com:8000",
  imageUrl: "http://localhost:8000/media/profileImages/",
  production: false,
  maxImageSize: 1000000
  
  // baseUrl: "https://data.usajobs.gov/api",
  // backendBaseUrl :"http://ec2-18-210-218-55.compute-1.amazonaws.com:8080",
  // imgBaseUrl:"http://ec2-54-211-175-15.compute-1.amazonaws.com:8080",
  // production: false
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
