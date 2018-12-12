const { Slim } = require('slim-js');
const { setAttributes } = require('../utils');
const { userStore } = require('../../store');
const router = require('../../router');

const initialize = el => {
  const titleSpan = document.createElement('span');
  titleSpan.textContent = el.props.title;
  titleSpan.id = 'titleSpan';

  const buttonSpan = document.createElement('span');
  buttonSpan.id = 'buttonSpan';

  // SETTINGS BUTTON
  const settings = document.createElement('button');
  settings.id = 'settingsButton';
  settings.addEventListener('click', () => {
    if (userStore.isAdmin) {
      router.navigate('../admin');
    } else {
      router.navigate('../settings');
    }
  });

  // LOGOUT BUTTON
  const logout = document.createElement('button');
  logout.id = 'logoutButton';
  setAttributes(logout, {
    textContent: 'Logout'
  });
  logout.addEventListener('click', () => {
    const invalidatedToken = localStorage.getItem('token');
    localStorage.removeItem('token');
    el.render();
    console.log(invalidatedToken);
    window.location.reload();
    // TODO: Invalidate the token on the server
  });

  el.header.appendChild(titleSpan);
  buttonSpan.appendChild(settings);
  buttonSpan.appendChild(logout);
  el.header.appendChild(buttonSpan);
};

Slim.tag(
  'header-bar',
  `<div s:id="header" id="header"></div>
  <style>
    :host {
      contain: content;
    }

    :host * {
      box-sizing: border-box;
    }
    
    #header {
      display: flex;
      height: 80px;
      width: 100vw;
      background: rgba(0, 0, 100, 0.5);
      font-family: Garamond;
      font-size: 1.5em;
      text-shadow: 0 0 10px gold;
      align-items: center;
      color: white;
      padding-left: 10px;
    }

    #titleSpan {
      width: 150px;
    }

    #buttonSpan {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-left: calc(70% - 200px);
    }

    #header #buttonSpan #logoutButton {
      padding: 8px;
      border: hidden;
      border-radius: 5px;
      font-family: Garamond;
      font-size: 1.2rem;
      font-weight: 700;
      background: ghostwhite;
    }

    #header #logoutButton:hover {
      filter: drop-shadow(0 0 5px lightgray);
    }

    #header #buttonSpan #settingsButton {
      background: url(http://icons.iconarchive.com/icons/dtafalonso/android-lollipop/64/Settings-icon.png);
      height: 64px;
      width: 64px;
      border: hidden;
    }

    @media (min-width: 500px) {
      #buttonSpan {
        margin-left: calc(80% - 200px);
      }
    }

    @media (min-width: 920px) {
      #buttonSpan {
        margin-left: calc(90% - 200px);
      }
    }
  </style>
  `,
  class Header extends Slim {
    onRender () {
      initialize(this);
    }

    get useShadow () {
      return true;
    }
  }
);

/*
  <header-bar
    data-title=title
    data-links="3 max, same as sidebar"
  ></header-bar>
*/
