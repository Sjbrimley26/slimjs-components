const { Slim } = require('slim-js');
const { setAttributes } = require('../utils');

const initialize = el => {
  const titleSpan = document.createElement('span');
  titleSpan.textContent = el.props.title;
  el.header.appendChild(titleSpan);

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
  el.header.appendChild(logout);
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

    #header span {
      width: 30%;
    }

    #header #logoutButton {
      margin-left: calc(60% - 70px);
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
