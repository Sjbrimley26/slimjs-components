const { Slim } = require('slim-js');

Slim.tag(
  'side-bar',
  `<div s:id="sidebar" id="sidebar">
  </div>
  <style>
    :host {
      contain: content;
    }

    :host * {
      box-sizing: border-box;
    }
    
    #sidebar {
      min-height: 80px;
      max-height: 80px;
      background: rgba(0, 0, 100, 0.5);
      position: absolute;
      width: 100vw;
      display: flex;
      justify-content: space-around;
      align-items: center;
    }

    @media (min-width: 590px) {
      #sidebar {
        top: 80px;
        height: 100vh;
        max-height: calc(100vh - 80px);
        width: 15vw;
        flex-direction: column;
      }
    }
  
    @media (min-width: 1000px) {
      #sidebar {
        width: 10vw;
      }
    }
  </style>
  `,
  class Sidebar extends Slim {
    onRender () {
      if (!this.props.links) {
        return;
      }
      this.props.links = JSON.parse(this.props.links);
      this.props.links.forEach(({ icon, label, action }) => {
        const wip = document.createElement('icon-link');
        wip.setAttribute('data-label', label);
        wip.setAttribute('data-icon', icon);
        wip.setAttribute('data-action', action);
        this.sidebar.appendChild(wip);
      });
    }

    get useShadow () {
      return true;
    }
  }
);

// 5 links max at current size / dimensions
/*
  <side-bar
    data-links="[{ icon, label, action }, ...]"
*/
