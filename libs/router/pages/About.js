const createSidebar = require("../../components/main/BarAndLinks");

module.exports = (app, router) => () => {
  const header = document.createElement("header-bar");
  header.setAttribute("data-title", "Have any questions?");
  const sidebar = createSidebar();
  const body = document.createElement("main-content");
  body.setAttribute(
    "data-contents",
    `<p style="color: white">
      Rewards.Radio is a place where cool stuff happens.
    </p>
    `
  );
  app.appendChild(header);
  app.appendChild(body);
  app.appendChild(sidebar);
};
