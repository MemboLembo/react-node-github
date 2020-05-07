const createExpressApp = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');

module.exports = () => {
  const port = 4000;
  const app = createExpressApp();

  app.use( bodyParser.json() );       // to support JSON-encoded bodies
  app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
  }));

  app.use(routes);

  app.listen(port, () => {
    console.log(`Я родился на ${port} порту`);
  });
};
