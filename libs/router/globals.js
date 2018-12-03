const Navigo = require('navigo');
const router = new Navigo('/');

const app = document.getElementById('mainBody');
const head = document.getElementsByTagName('head')[0];

module.exports = {
  app,
  head,
  router
};
