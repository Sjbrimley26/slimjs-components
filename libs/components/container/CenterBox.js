const { Slim } = require('slim-js');
const { addStyles } = require('../utils');
const debounce = require('lodash/debounce');
const { parseHTML } = require('../../utils');

Slim.tag(
  'center-box',
  `<div s:id="centerBoxDiv" class="center-box">
    <span s:id="titleSpan" class="title-span"></span>
    <span s:id="bodySpan" class="body-span"></span>
  </div>
  <style>
  :host {
    contain: content;
  }
  
  .center-box {
    min-width: 310px;
    max-width: 100vw;
    position: absolute;
    background: rgba(19, 63, 102, 0.472);
    text-align: center;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-radius: 10px;
    border: 1px solid darkslategray;
    padding: 10px;
  }
  
  .center-box .title-span {
    font-size: 1.4em;
    width: 70%;
    background: ghostwhite;
    box-shadow: 0 0 10px rgba(220, 220, 230, 0.644);
    border: hidden;
    border-radius: 5px;
    align-self: center;
    z-index: 5;
    font-family: Garamond;
    font-variant: petite-caps;
    font-weight: 600;
  }
  
  .center-box .body-span {
    justify-self: center;
    padding-top: 20px;
    overflow-y: auto;
  }

  @media(min-width: 400px) {
    .center-box .title-span {
      font-size: 1.8em;
    }
  }
  </style>`,
  class CenterBox extends Slim {
    onBeforeCreated () {
      const resizer = debounce(() => {
        resize(this);
      }, 100);
      window.removeEventListener('resize', resizer);
      window.addEventListener('resize', resizer);
    }

    onRender () {
      initialize(this);
      resize(this);
    }

    get useShadow () {
      return true;
    }
  }
);

const initialize = element => {
  const { title, body, contents } = element.props;
  element.titleSpan.textContent = title || '';
  element.bodySpan.textContent = body || '';

  const contentsEl =
    contents && parseHTML(contents);

  element.centerBoxDiv.appendChild(contentsEl);
};

const resize = element => {
  const { size, tall } = element.props;
  const bodyWidth = document.body.clientWidth;
  let renderedSize = size;

  if (size > bodyWidth) {
    renderedSize = bodyWidth;
  }

  let left = `calc(50% - ${renderedSize / 2 - 5}px)`;

  if (renderedSize < 320) {
    left = `calc(50% - 155px)`;
  }

  if (renderedSize < 320 && renderedSize >= bodyWidth) {
    left = '5px';
  }

  if (tall) {
    addStyles(element.centerBoxDiv, {
      width: `${renderedSize - 10}px`,
      'min-height': '100%',
      top: '0',
      left
    });
  } else {
    addStyles(element.centerBoxDiv, {
      width: `${renderedSize - 10}px`,
      height: `${renderedSize}px`,
      top: `calc(50% - ${renderedSize / 2}px)`,
      left
    });
  }
};
