const { app, router } = require('./globals');
const { userStore } = require('../store');

const clearPage = div => {
  while (div.firstChild) {
    div.removeChild(div.firstChild);
  }
};

const redirectIfNotLoggedIn = () => {
  if (!userStore.currentUser.hasOwnProperty('username')) {
    clearPage(app);
    router.navigate('login');
  }
};

const redirectIfNotAdmin = () => {
  if (userStore.isAdmin()) {
    return;
  }
  clearPage(app);
  router.navigate('../');
};

module.exports = {
  clearPage,
  redirectIfNotAdmin,
  redirectIfNotLoggedIn
};
