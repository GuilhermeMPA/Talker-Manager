const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = 3000;

app.get('/talker', (_req, res) => {
  const data = fs.readFileSync('talker.json');
  const talker = JSON.parse(data);
  return (!talker
    ? res.status(HTTP_OK_STATUS).json([])
    : res.status(HTTP_OK_STATUS).json(talker));
});

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});