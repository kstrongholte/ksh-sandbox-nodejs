require('dotenv').config();
const { auth, requiredScopes } = require('express-oauth2-bearer');
const express = require('express');
const http = require('http');

const appUrl = process.env.BASE_URL || `http://localhost:${process.env.PORT}`;

const app = express();

app.use(auth());

app.get('/', requiredScopes('read:reports'), (req, res) => {
  res.send([
    {
      date: new Date(),
      description: 'Pizza for a Coding Dojo session.',
      value: 102,
    },
    {
      date: new Date(),
      description: 'Coffee for a Coding Dojo session.',
      value: 42,
    }
  ]);

  console.log(new Date(req.auth.claims.iat * 1000));
});


http.createServer(app).listen(process.env.PORT, () => {
  console.log(`listening on ${appUrl}`);
});
