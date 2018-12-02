const { app, router } = require("./globals");
const { 
  clearPage, 
  redirectIfNotAdmin, 
  redirectIfNotLoggedIn 
} = require("./utils");
const setContent = require("./content");

const { userStore, menuStore } = require("../store");

router.hooks({
  before: async function(done) {
    if (
      localStorage.getItem("token") !== null &&
      userStore.isLoggedIn() === false
      ) {
      await userStore.getUser();
    }
    clearPage(app);
    menuStore.closeMenu();
    done();
  }
});

router
  .on({
    login: function() {
      setContent("Login");
    },
    about: function() {
      setContent("About");
      redirectIfNotLoggedIn();
    },
    signup: function() {
      setContent("Signup");
    },
    admin: function() {
      setContent("Admin");
      redirectIfNotAdmin();
    },
    confirmUsers: function() {
      setContent("ConfirmUsers");
      redirectIfNotAdmin();
    },
    "*": function() {
      setContent("Home");
      redirectIfNotLoggedIn();
    }
  })
  .resolve();

module.exports = router;
