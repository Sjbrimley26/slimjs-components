const body = document.getElementsByTagName("body")[0];

const { parseHTML } = require("../utils");

const { Menu1, Menu2 } = require("../components/main/MenuTemplates");

module.exports = {
  _currentMenu: null,
  _menu: document.createElement("mini-menu"),

  isOpen: function () {
    return this._currentMenu !== null;
  },

  openMenu: function (type) {
    this.closeMenu();
    this._currentMenu = type;

    body.appendChild(this._menu);

    switch (type) {
      case "Menu 1":
        this._menu.shadowRoot
          .appendChild(
            parseHTML(Menu1)
          );
        break;
      
      case "Menu 2":
        this._menu.shadowRoot
          .appendChild(
            parseHTML(Menu2)
          );
        break;
    }
  },

  closeMenu: function () {
    if (this._currentMenu === null) return null;
    body.removeChild(this._menu);
    this._currentMenu = null;
    this._menu = document.createElement("mini-menu");
  },

  toggleMenu: function (type) {
    if (this._currentMenu === type) {
      return this.closeMenu();
    } else {
      return this.openMenu(type);
    }
  }
};
