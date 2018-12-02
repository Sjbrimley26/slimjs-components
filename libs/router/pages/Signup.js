module.exports = (app, router) => () => {
  const win = document.createElement("signup-window");
  app.appendChild(win);
};
