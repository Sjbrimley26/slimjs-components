const { Slim } = require("slim-js");

Slim.tag(
  "mini-menu",
  `<style>
    :host {
      contain: content;
      display: block;
      position: absolute;
      background: rgba(0,0,30,0.9);
      min-width: 320px;
      height: calc(100vh - 160px);
      width: 100vw;
      top: 80px;
      display: flex;
      flex-direction: column;
      padding: 20px 0 0 20px;
    }

    :host * {
      box-sizing: border-box;
    }

    :host a {
      color: white;
      text-decoration: none;
      border-bottom: 1px dashed white;
      width: 30%;
    }

    :host a:hover {
      filter: drop-shadow(0 0 5px lightblue);
    }

    @media (min-width: 590px) {
      :host {
        left: 15vw;
        width: 30vw;
        height: calc(100vh - 80px);
      }
    }

    @media (min-width: 1000px) {
      :host {
        left: 10vw;
        width: 25vw;
      }
    }
  </style>
  `,
  class MiniMenu extends Slim {
    get useShadow() {
      return true;
    }
  }
);