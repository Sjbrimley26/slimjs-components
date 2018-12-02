const { app, router, head } = require("./globals");

const { 
  setHome,
  setLogin,
  setAbout,
  setSignup,
  setAdmin,
  setConfirmUsers
} = require("./pages");

const setDescription = page => {
  const descriptions = {
    Home: "Rewards.Radio Home Page!",
    Login: "Rewards.Radio Login Page!",
    About: "Rewards.Radio About Page!",
    Signup: "Rewards.Radio Sign-up Page!",
    Admin: "Rewards.Radio Admin Page!"
  };

  const currentDescription = document.querySelector("meta[name=description]");
  const description = document.createElement("meta");
  description.name = "description";
  description.content = descriptions[page];

  currentDescription && head.removeChild(currentDescription);
  head.appendChild(description);
};

const setContent = page => {
  const options = {
    Home: setHome(app, router),
    Login: setLogin(app, router),
    About: setAbout(app, router),
    Signup: setSignup(app, router),
    Admin: setAdmin(app, router),
    ConfirmUsers: setConfirmUsers(app, router)
  };
  options[page]();
  setDescription(page);
};

module.exports = setContent;