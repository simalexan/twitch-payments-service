const stripe = require('stripe')(process.env.STRIPE_KEY);
const ApiBuilder = require('claudia-api-builder');
const querystring = require('querystring');
var api = new ApiBuilder();


api.post('/stripe',request => {
    console.log(request);
    let params = querystring.parse(request.body);
    console.log(params);

    return stripe.charges.create({
      amount: 999,
      currency: 'eur',
      description: `Simalexan's Shop Charge`,
      source: params.stripeToken,
    }).then(charge => {
        // TODO: Do whatever you want with the charge object, f.e. store in your DB, that the charge has been made
      return charge;
    }).catch((err) => {
        return err;
    });
});

module.exports = api;
