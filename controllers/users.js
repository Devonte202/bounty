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
  const token = req.cookies.userToken
  
  if (!token) {
    return res.status(401).send('Only logged in users can access this page.');
  }
  const payload = await jwt.verify(token, 'Do Not Open', (err, decoded) =>{
    if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' })
    return decoded
  });
  
  const { email, password } = payload;
  try {
    const user = await User.getUserByEmail(email);

    if (!user) {
      return res.status(403).send('Unauthorized User: User does not exist.');
    }
    
    req.userId = user.user_id;
    req.user = user

    const isValidPassword = await bcrypt.compare(password, user.hashed_password);

    if (isValidPassword) {
      return next();
    }

    return res.status(403).send('Unauthorized User: Try logging in again.');
  }
  catch (err) {
    return res.send(err);
  }
};

const verifyUser = async(req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.getUserByEmail(email);
    if (!user) {
      return res.status(403).send('User does not exist.');
    }

    req.body.userId = user.user_id;

    const isValidPassword = await bcrypt.compare(password, user.hashed_password);

    if (isValidPassword) {
      return jwt.sign({
        userId: user.user_id,
        email,
        password,
        expiresIn: '1h',
      }, 'Do Not Open', (err, encryptedPayload) => {
        res.cookie('userToken', encryptedPayload, { httpOnly: true });
        res.redirect('/home');
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
}

const getLoginPage = (req, res) => {
  res.sendFile(path.join(__dirname ,'../public/views' , 'login.html'))
};

const getHomePage = (req, res) => {
  res.sendFile(path.join(__dirname ,'../public/views' , 'index.html'))
};

const getLoggedInPage = (req, res) => {
  res.sendFile(path.join(__dirname ,'../public/views' , 'home.html'))
};

const getBountyBoard = (req, res) => {
  res.sendFile(path.join(__dirname ,'../public/views' , 'bounties.html'))
};

const getAccount = (req, res) => {
  res.sendFile(path.join(__dirname ,'../public/views' , 'account.html'))
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
  getLoggedInPage,
  getBountyBoard,
  getAccount,
  logout,
};