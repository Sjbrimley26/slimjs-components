const { profilePOST } = require('../api');

module.exports = {
  currentUser: {},

  getUser: async function () {
    this.currentUser = await profilePOST();
    return this.currentUser;
  },

  isLoggedIn: function () {
    if (this.currentUser.hasOwnProperty('username')) {
      return true;
    }
    return false;
  },

  isAdmin: function () {
    const { currentUser } = this;
    if (this.isLoggedIn() && currentUser.isAdmin) {
      return true;
    }
    return false;
  }
};
