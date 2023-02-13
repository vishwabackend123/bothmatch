// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  usaJobsUrl: "https://data.usajobs.gov/api",
  baseUrl:"https://2nfrmwo081.execute-api.us-east-1.amazonaws.com/dev/",
  // siteKey: "6LcD6aAcAAAAAFucR0IcVnwv4AuVDve7wEbN0dnd",
  //siteKey: "6LdMJdcZAAAAACxFRcp-pOKFICutsSI_DZkZUo6y",
  siteKey: "6LcO7ngkAAAAAEiytzWkoIwYywfP819FFcA4LzSQ", //http://dev-bothmatch-vlink.s3-website-us-east-1.amazonaws.com
  passwordEncryptionKey: "ZKzeE1JApIA_ycm-nuaI5R8PrZDNgofKH05FOOgCsmI=",
  backendBaseUrl :"https://2nfrmwo081.execute-api.us-east-1.amazonaws.com/dev/",
  imgBaseUrl:"http://ec2-54-211-175-15.compute-1.amazonaws.com:8080",
  imageUrl: "https://curate-files.s3.ap-south-1.amazonaws.com/",
  imgPathUrl: "https://curate-files.s3.ap-south-1.amazonaws.com/",
  // imageUrl: "http://localhost:8000/media/profileImages/",
  production: false,
  maxImageSize: 1000000
};


/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
