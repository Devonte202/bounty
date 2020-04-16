const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const path = require('path');
const User = require('../methods/Users');

const createUser = (req, res) => {
  const { name, username, email, password, address, state, zip, phone_number } = req.body;

  const saltRounds = 8;
  bcrypt.hash(password, saltRounds)
    .then((hashedPassword) => {
      User.createUser(name, username, email, hashedPassword, address, state, zip, phone_number);
      return jwt.sign({
        username,
        email,
        password,
        exp: Math.floor(Date.now() / 1000) + (15 * 60),
      }, 'Do Not Open', (err, encryptedPayload) => {
        res.cookie('userToken', encryptedPayload, { httpOnly: true });
        res.redirect('/');
      });
    })
    .catch((err) => {
      res.send(err);
    });
};

const authenticate = async(req, res, next) => {
  if (!req.cookies.userToken) {
    return res.status(401).send('Only logged in users can access this page.');
  }
  const payload = jwt.verify(req.cookies.userToken, 'Do Not Open');
  const { email, password } = payload;
  try {
    const user = await User.getUserByEmail(email);

    req.body.userId = user.id;

    if (!user) {
      return res.status(403).send('Unauthorized User: User does not exist.');
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (isValidPassword) {
      return next();
    }

    return res.status(403).send('Unauthorized User: Try logging in again.');
  }
  catch (err) {
    return res.send(err);
  }
};

const verifyUser = async(req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.getUserByEmail(email);
    if (!user) {
      return res.status(403).send('User does not exist.');
    }

    req.body.userId = user.id;

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (isValidPassword) {
      return jwt.sign({
        userId: user.id,
        email,
        password,
        expiresIn: '1h',
      }, 'Do Not Open', (err, encryptedPayload) => {
        res.cookie('userToken', encryptedPayload, { httpOnly: true });
        res.redirect('/');
      });
    }

    return res.status(403).send('Email or password is incorrect.');
  }
  catch (err) {
    return res.send(err);
  }
};

const getRegisterPage = (req, res) => {
  res.sendFile(path.join(__dirname ,'../public/views' , 'register.html'))
};

const getLoginPage = (req, res) => {
  res.sendFile(path.join(__dirname ,'../public/views' , 'login.html'))
};

const getHomePage = (req, res) => {
  res.sendFile(path.join(__dirname ,'../public/views' , 'index.html'))
};

const logout = (req, res) => {
  res.clearCookie('userToken');
  res.redirect('/');
};

module.exports = {
  createUser,
  authenticate,
  verifyUser,
  getRegisterPage,
  getLoginPage,
  getHomePage,
  logout,
};