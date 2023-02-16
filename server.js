require('dotenv').config();
const express = require('express');
const querystring = require('querystring');
const axios = require('axios');                 //declaring all dependencies for the app
const app = express();
const port = 8888;

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;        //initializing constant variables from values in the .env file
const REDIRECT_URI = process.env.REDIRECT_URI;

app.get('/login', (req, res) => {           //localhost/login page will redirect user to spotify's authorization interface
    res.redirect(`https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${REDIRECT_URI}&scope=playlist-modify-public`);
  });

app.get('/callback', (req, res) => {        //set up callback route handler for when user is done logging into spotify
    
    const code = req.query.code || null;   //retrieve the authorization code returned in the url query for use in the api call

  axios({                   //use axios to format API call to retrieve authorization token for use in Calls.py file
    method: 'post',
    url: 'https://accounts.spotify.com/api/token',
    data: querystring.stringify({           //querystring helps simplify API call parameters
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: REDIRECT_URI
    }),
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${new Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`,
    },
  })
    .then(response => {
      if (response.status === 200) {
        res.send(`<pre>${JSON.stringify(response.data, null, 2)}</pre>`);  //return result as JSON so we can easily access the token(s)
      } else {
        res.send(response);
      }
    })
    .catch(error => {
      res.send(error);
    });
});

app.get('/refresh_token', (req, res) => {   //setup refresh token route for when original token expires - big advantage so user only has to login once
    const { refresh_token } = req.query;
  
    axios({
      method: 'post',
      url: 'https://accounts.spotify.com/api/token',
      data: querystring.stringify({
        grant_type: 'refresh_token',
        refresh_token: refresh_token
      }),
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${new Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`,
      },
    })
      .then(response => {
        res.send(response.data);
      })
      .catch(error => {
        res.send(error);
      });
  });

app.listen(port, () => {        //run app over localhost
    console.log(`express app listening at http://localhost:${port}`);
});
