const tokenValidation = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ message: 'Token não encontrado' });

  return (token.length < 16
    ? res.status(401).json({ message: 'Token inválido' })
    : next());
};

const nameValidation = (req, res, next) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ message: 'O campo "name" é obrigatório' });

  return (name.length < 3
    ? res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' })
    : next());
};

const ageValidation = (req, res, next) => {
  const { age } = req.body;
  if (!age) return res.status(400).json({ message: 'O campo "age" é obrigatório' });

  return (age < 18
    ? res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' })
    : next());
};

const talkValidation = (req, res, next) => {
  const { talk } = req.body;
  return (!talk
    ? res.status(400).json({ message: 'O campo "talk" é obrigatório' })
    : next());
};

const watchedAtValidation = (req, res, next) => {
  const { talk: { watchedAt } } = req.body;
  const watchedAtRegex = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i;

  if (!watchedAt) return res.status(400).json({ message: 'O campo "watchedAt" é obrigatório' });

  return (!watchedAtRegex.test(watchedAt)
    ? res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' })
    : next());
};

const rateValidation = (req, res, next) => {
  const { talk: { rate } } = req.body;
  if (!rate) return res.status(400).json({ message: 'O campo "rate" é obrigatório' });

  return (rate < 1 || rate > 5
    ? res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' })
    : next());
};

module.exports = {
  tokenValidation,
  nameValidation,
  ageValidation,
  talkValidation,
  watchedAtValidation,
  rateValidation,
};