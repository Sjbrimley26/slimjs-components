module.exports = (app, router) => () => {
  const win = document.createElement("login-window");
  app.appendChild(win);
};
