const emailValidation = (req, _res, next) => {
  const { email } = req.body;
  const emailRegex = /^\w+(\[\+\.-\]?\w)*@\w+(\[\.-\]?\w+)*\.[a-z]+$/i;
  if (emailRegex.test(email)) return next();
};

const passwordValidation = (req, _res, next) => {
  const { password } = req.body;
  if (password.length >= 6) return next();
};

module.exports = {
  emailValidation,
  passwordValidation,
};