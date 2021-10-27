// These are our required libraries to make the server work.
// We're including a server-side version of Fetch to build on your client-side work
const express = require('express');
const fetch = require('node-fetch');

// Here we instantiate the server we're going to turn on
const app = express();


// Servers are often subject to the whims of their environment.
// Here, if our server has a PORT defined in its environment, it will use that.
// Otherwise, it will default to port 3000
const port = process.env.PORT || 3000;

// Our server needs certain features - like the ability to send and read JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// And the ability to serve some files publicly, like our HTML.
app.use(express.static('public'));


function processDataForFrontEnd(req, res) {
  // eslint-disable-next-line max-len
  const baseURL = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json'; // Enter the URL for the data you would like to retrieve here

  // Your Fetch API call starts here
  // Note that at no point do you "return" anything from this function -
  // it instead handles returning data to your front end at line 34.
  fetch(baseURL)
    .then((results) => results.json())
    .then((data) => {
      console.log(data);
      const clearEmptyData = data.filter((f) => f.geocoded_column_1);
      const refined = clearEmptyData.map((m) => ({
        category: m.category,
        name: m.name
      }));
      return refined;
    })
    .then((data) => data.reduce((result, current) => {
      if (!result[current.category]) {
        // eslint-disable-next-line no-param-reassign
        result[current.category] = [];
      }
      result[current.category].push(current);
      return result;
    }, {}))
    .then((data) => {
      console.log('new data', data);
      // eslint-disable-next-line no-unused-vars
      const reformattedData = Object.entries(data).map((current, i) => {
        console.log(current);
        return {
          y: current[1].length,
          label: current[0]
        };
      });

      return reformattedData;
    });
  // eslint-disable-next-line indent
    // eslint-disable-next-line no-undef
  // eslint-disable-next-line indent
    // eslint-disable-next-line no-undef
  res.send({ data: data })
    .catch((err) => {
      console.log(err);
      res.redirect('/error');
    });
}

// This is our first route on our server.
// To access it, we can use a "GET" request on the front end
// by typing in: localhost:3000/api or 127.0.0.1:3000/api
app.get('/api', (req, res) => { processDataForFrontEnd(req, res); });

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
