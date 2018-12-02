// Designed to work with my header and sidebar / footer

const { Slim } = require("slim-js");

const { parseHTML } = require("../../utils");

const initialize = element => {
  const { contents } = element.props;
  if (contents === undefined) {
    return;
  }
  const contentsEl = parseHTML(contents);
  element.mainContent.appendChild(contentsEl);
};

Slim.tag(
  "main-content",
  `<div s:id="mainContent" id="mainContent"></div>
  <style>
    :host * {
      box-sizing: border-box;
    }

    #mainContent {
      height: calc(100vh - 160px);
      width: 100vw;
      background: rgba(200, 0, 50, 0.5);
      overflow-y: auto;
    }
    
    #mainContent * {
      margin: 0;
      padding: 10px;
    }
  
    @media (min-width: 590px) {
      #mainContent {
        height: calc(100vh - 80px);
        width: 75vw;
        margin-left: 15vw;
      }
    }
  
    @media (min-width: 1000px) {
      #mainContent {
        width: 80vw;
        margin-left: 10vw;
      }
    }
  </style>`,
  class MainContent extends Slim {
    onRender() {
      initialize(this);
    }

    get useShadow() {
      return true;
    }
  }
);
