const functions = require("firebase-functions");
const { geocodeRequest } = require("./geocode");
const { placesRequest } = require("./places");
const { payRequest } = require("./pay");

const { Client } = require("@googlemaps/google-maps-services-js");

const stripeClient = require("stripe")(
  "sk_test_51KjONVSAASeroQozSzNkletB0ImUTyLawgnUDN4gO8VipnWHkyl56KMNZthI8YHlGFDvRLtWHmUHopTTo0It7zRn009KMjKERw"
);
const googleClient = new Client({});
// const client = new Client({});

exports.geocode = functions.https.onRequest((request, response) => {
  // geocodeRequest(request, response, client);
  geocodeRequest(request, response, googleClient);
});

exports.placesNearby = functions.https.onRequest((request, response) => {
  // placesRequest(request, response, client);
  placesRequest(request, response, googleClient);
});

exports.pay = functions.https.onRequest((request, response) => {
  payRequest(request, response, stripeClient);
});
