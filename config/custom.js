/**
 * Custom configuration
 * (sails.config.custom)
 *
 * One-off settings specific to your application.
 *
 * For more information on custom configuration, visit:
 * https://sailsjs.com/config/custom
 */

module.exports.custom = {

  /***************************************************************************
  *                                                                          *
  * Any other custom config this Sails app should use during development.    *
  *                                                                          *
  ***************************************************************************/
  // sendgridSecret: 'SG.fake.3e0Bn0qSQVnwb1E4qNPz9JZP5vLZYqjh7sn8S93oSHU',
  // stripeSecret: 'sk_test_Zzd814nldl91104qor5911gjald',
  // …
  hostExternalAPI: 'us-central1-test-b7665.cloudfunctions.net',
  storeId: 'ijpxNJLM732vm8AeajMR',
  storesPath: '/api/stores',
  productsPath: '/api/stores/{idStore}/products',
  productPath: '/api/stores/{idStore}/products/{idProduct}'

};
