const server = require('./src/app.js');
const morgan = require('morgan');
const { conn } = require('./src/db.js');

// Syncing all the models at once.
conn.sync({ force: false }).then(() => {
  server.listen(3001, () => {
    console.log('backend listening at 3001'); // eslint-disable-line no-console
  });
});
