import fetch, { Headers } from 'node-fetch';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();

var myHeaders = new Headers();
var masterKey = process.env.JSONBIN_MASTER_KEY;
myHeaders.append('X-Master-Key', masterKey);
myHeaders.append('X-JSON-Path', '$.values.*');
myHeaders.append('X-Bin-Meta', false);

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow',
};

fetch('https://api.jsonbin.io/v3/b/632c6099a1610e6386345e24', requestOptions)
  .then(response => response.json())
  .then(result => {
    fs.mkdir('data', err => {
      if (err) console.log('Kunne ikke opprette data mappa: ', err);
    });
    fs.writeFile('data/figma-tokens.json', JSON.stringify(result[0]), err => {
      if (err) console.log('Kunne ikke skrive til fil figma-tokens.json: ', err);
      else {
        console.log('figma-tokens.json er oppdatert\n');
      }
    });
  })
  .catch(error => console.log('Kunne ikke hente figma-tokens: ', error));
