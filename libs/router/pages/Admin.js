const createSidebar = require('../../components/main/BarAndLinks');

module.exports = (app, router) => () => {
  const header = document.createElement('header-bar');
  header.setAttribute('data-title', 'Admin Options');
  const sidebar = createSidebar();
  const body = document.createElement('main-content');
  body.setAttribute(
    'data-contents',
    `<p style="color: white">
      <ul>
        <li><a href="confirmUsers" data-navigo>Verify Users</a></li>
      </ul>
    </p>
    <style>
      a {
        color: white;
      }
    </style>
    `
  );
  app.appendChild(header);
  app.appendChild(body);
  app.appendChild(sidebar);
};
