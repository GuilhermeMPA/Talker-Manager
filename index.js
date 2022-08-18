const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const token = require('./middlewares/tokenGenerator');
const { emailValidation, passwordValidation } = require('./middlewares/loginValidation');
const { tokenValidation,
  nameValidation,
  ageValidation,
  talkValidation,
  watchedAtValidation,
  rateValidation } = require('./middlewares/talkerValidations');

const app = express();
app.use(bodyParser.json());

const talkerJSON = 'talker.json';

const HTTP_OK_STATUS = 200;
const PORT = 3000;

app.get('/talker', (_req, res) => {
  const data = fs.readFileSync(talkerJSON);
  const talker = JSON.parse(data);
  return (!talker
    ? res.status(HTTP_OK_STATUS).json([])
    : res.status(HTTP_OK_STATUS).json(talker));
});

app.get('/talker/:id', (req, res) => {
  const { id } = req.params;
  const data = fs.readFileSync(talkerJSON);
  const talkers = JSON.parse(data);
  
  const talker = talkers.find((t) => t.id === Number(id));

  return (!talker
    ? res.status(404).json({ message: 'Pessoa palestrante não encontrada' })
    : res.status(HTTP_OK_STATUS).json(talker));
});

app.post('/login', emailValidation, passwordValidation, (_req, res) =>
  res.status(HTTP_OK_STATUS).json({ token: token() }));

app.post('/talker', tokenValidation, nameValidation,
ageValidation, talkValidation, watchedAtValidation, rateValidation, (req, res) => {
  const data = fs.readFileSync(talkerJSON, 'utf8');
  const talkers = JSON.parse(data);
  const id = talkers.length + 1;
  const talker = { ...req.body, id };
  talkers.push(talker);
  fs.writeFileSync(talkerJSON, JSON.stringify(talkers));

  return res.status(201).json(talker);
});

app.put('/talker/:id', tokenValidation, nameValidation,
ageValidation, talkValidation, watchedAtValidation, rateValidation, (req, res) => {
  const data = fs.readFileSync(talkerJSON, 'utf8');
  const talkers = JSON.parse(data);
  const { id } = req.params;
  const updatedTalker = { ...req.body, id: Number(id) };
  const newTalkersList = talkers.map((t) => (t.id === Number(id) ? updatedTalker : t));
  fs.writeFileSync(talkerJSON, JSON.stringify(newTalkersList));

  return res.status(HTTP_OK_STATUS).json(updatedTalker);
});

app.delete('/talker/:id', tokenValidation, (req, res) => {
  const data = fs.readFileSync(talkerJSON, 'utf8');
  const talkers = JSON.parse(data);
  const { id } = req.params;
  const newTalkersList = talkers.filter((t) => t.id !== Number(id));
  fs.writeFileSync(talkerJSON, JSON.stringify(newTalkersList));

  return res.status(204).end();
});

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});