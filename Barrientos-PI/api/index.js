const server = require('./src/app.js');
const PORT = process.env.PORT || 3001
const { conn } = require('./src/db.js');

// Syncing all the models at once.
conn.sync({ force: false }).then(() => {
  server.listen(PORT, () => {
    console.log(`Server listening at ${PORT}`); // eslint-disable-line no-console
  });
});
