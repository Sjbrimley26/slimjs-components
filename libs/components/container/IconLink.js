const { Slim } = require("slim-js");
const { parseFunction } = require("../utils");
const router = require("../../router");
const { menuStore } = require("../../store");

const addButtonAction = element => {
  const { action } = element.props;
  
  if (action.indexOf("{") === -1) {
    if (action.includes("openMenu") ) {
      const type = action.substring(action.indexOf(" ") + 1);
      // append attributes to position it correctly
      const toggle = menuStore.toggleMenu.bind(menuStore, type);
      element.iconLink.addEventListener("click", toggle);

    } else {
      element.iconLink.addEventListener("click", () => {
        router.navigate(action);
      });
    }
  } else {
    element.iconLink.addEventListener("click", () => {
      menuStore.closeMenu();
      parseFunction(action);
    });
  }
};

Slim.tag(
  "icon-link",
  `<div class="iconLinkDiv">
    <button
      s:id="iconLink"
      class="iconLink"
    ></button>
  </div>
  <style>
    :host {
      contain: content;
      padding: 0;
      margin: 0;
      height: 60px;
      width: 60px;
      border: hidden;
      border-radius: 5px;
      overflow: hidden;
    }

    :host * {
      box-sizing: border-box;
    }
    
    :host(:hover) {
      filter: drop-shadow(0 0 3px lightgray);
    }

    :host .iconLinkDiv {
      height: 100%;
      width: 100%;
    }

    .iconLink img {
      position: absolute;
      height: 55px!important;
      width: 55px!important;
      top: 2.5px;
      left: 2.5px;
    }

    .iconLinkDiv .iconLink, .iconLinkDiv .iconLink .iconImg {
      width: 60px;
      height: 60px;
      padding: 0;
    }

    :host(.active) {
      filter: drop-shadow(0 0 5px lightgray);
    }
  </style>
  `,
  class IconLink extends Slim {
    onRender() {
      const { label, icon } = this.props;
      this.iconLink.setAttribute("name", label);
      this.iconLink.setAttribute("aria-label", label);
      /*
      const note = document.createElement("label");
      note.setAttribute("for", label);
      // TODO: Append the label nicely
      */
      const img = document.createElement("img");
      img.src = icon;
      img.className = "iconImg";
      img.setAttribute("alt", label + " link");
      this.iconLink.appendChild(img);
      addButtonAction(this);
    }

    get useShadow() {
      return true;
    }
  }
);

/*
  <icon-link
    data-icon="url"
    data-label="name"
    data-action="url or function"
  ></icon-link>
*/
