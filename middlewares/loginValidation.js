const emailValidation = (req, res, next) => {
  const { email } = req.body;
  const emailRegex = /^\w+(\[\+\.-\]?\w)*@\w+(\[\.-\]?\w+)*\.[a-z]+$/i;
  
  if (!email) return res.status(400).json({ message: 'O campo "email" é obrigatório' });

  return (!emailRegex.test(email)
    ? res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' })
    : next()); 
  // if (emailRegex.test(email)) return next();
};

const passwordValidation = (req, res, next) => {
  const { password } = req.body;
  if (!password) return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  return (password.length < 6
    ? res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' })
    : next());
};

module.exports = {
  emailValidation,
  passwordValidation,
};