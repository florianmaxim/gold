require('babel-core/register')({ presets: ['latest', 'react'] })

const DEFAULT = {
  _NAME: '[Targold Server]',
  _VERSION: '0.0.1',
  _VERSION_NAME: 'Mine',
  _URL: '0.0.0.0',
  _PORT: 8080
}

const http           = require('http');
const path           = require('path');
const fs             = require('fs');

const express        = require('express');

const react          = require('react');
const reactDomServer = require('react-dom/server');
const reactRouter    = require('react-router');

const renderToString = reactDomServer.renderToString;
const match          = reactRouter.match;
const RouterContext  = reactRouter.RouterContext;

const routes         = require('./source/Routes.Static').default

const app = express()
app.server = http.createServer(app)

// Mount the middleware at "/static" to serve static content only when their request path is prefixed with "/static".

// GET /static/style.css etc.

// THATS IT:
app.use('/js', express.static(__dirname + '/build/js'));
app.use('/static', express.static(__dirname + '/build/static'));

app.use('/:block/js', express.static(__dirname + '/build/js'));
app.use('/:block/static', express.static(__dirname + '/build/static'));

app.get('*', (req, res) => {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'https://etherchain.org');

  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');


  const error = () => res.status(404).send('404')

  const htmlFilePath = path.join( __dirname, './build', 'index.html' );

  fs.readFile( htmlFilePath, 'utf8', (err, htmlData) => {

    if(err) throw error();

    match({ routes, location: req.url }, (err, redirect, ssrData) => {

      if(err) throw error();

      else if(redirect) {
        res.redirect(302, redirect.pathname + redirect.search);
      }

      else if(ssrData) {

        console.log('Got a match here: '+req.url);

        console.log(JSON.stringify(req.params));

        const ReactApp = renderToString( react.createElement(RouterContext, ssrData) );

        const RenderedApp = htmlData.replace(`<div id="root"></div>`, `<div id="root">${ReactApp}</div>`);

        res.status(200).send(RenderedApp);

      } else {

        var msg = `Not found: ${req.url}`;

        console.log(msg);
        res.status(404).send(msg);

      }

    });
  });
});

app.server.listen(DEFAULT._PORT, DEFAULT._URL, () => {
  console.log(`${DEFAULT._NAME} ${DEFAULT._VERSION} (${DEFAULT._VERSION_NAME}) Listening on port ${DEFAULT._PORT}`);
});
