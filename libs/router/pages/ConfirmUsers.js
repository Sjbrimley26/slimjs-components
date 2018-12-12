const createSidebar = require('../../components/main/BarAndLinks');
const { getUnverifiedUsers } = require('../../api');
const { addStyles } = require('../../components/utils');
const { parseHTML } = require('../../utils');

module.exports = (app, router) => () => {
  let bodyContents = ``;
  const header = document.createElement('header-bar');
  header.setAttribute('data-title', 'Activate Users');
  const sidebar = createSidebar();
  const body = document.createElement('main-content');

  const submitter = document.createElement('button');
  submitter.type = 'submit';
  submitter.classList.add('submitter');
  submitter.textContent = 'Activate';
  addStyles(submitter, {
    position: 'absolute',
    height: '30px',
    width: '80px',
    top: 'calc(80% - 20px)',
    left: 'calc(80% - 30px)',
    'border-radius': '5px'
  });
  app.appendChild(submitter);
  app.appendChild(header);
  app.appendChild(body);
  app.appendChild(sidebar);

  getUnverifiedUsers().then(users => {
    users.forEach(({ username, fullname }) => {
      bodyContents +=
      `<li>${fullname}: ${username} <input type="checkbox"/></li>
      `;
    });
    body.setAttribute(
      'data-contents',
      `
      <ul>
        <li>Name / Email Address</li>
        ${bodyContents}
      </ul>
      <style>
        ul {
          background: rgba(0,0,0,0.8);
          height: 100%;
        }

        li {
          color: white;
        }

        li input {
          transform: translate(10px, 3px);
          height: 15px;
          width: 15px;
        }
      </style>
      `
    );
  });
};
