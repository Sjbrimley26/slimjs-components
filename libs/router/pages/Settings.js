const createSidebar = require('../../components/main/BarAndLinks');

module.exports = (app, router) => () => {
  const header = document.createElement('header-bar');
  header.setAttribute('data-title', 'Rewards.Radio');
  const sidebar = createSidebar();
  const body = document.createElement('main-content');
  body.setAttribute(
    'data-contents',
    `<p style="color:white">
      This is the settings page!
    </p>`
  );
  app.appendChild(header);
  app.appendChild(body);
  app.appendChild(sidebar);
};
