const bindDataAttributesToProps = el => {
  const attributes = Object.values(el.attributes)
    .filter(attribute => attribute.name.includes("data-"))
    .map(({ name, nodeValue }) => {
      return {
        name: name.slice(5),
        value: nodeValue
      };
    });

  el.props = attributes.reduce((data, value) => {
    data[value.name] = value.value;
    return data;
  }, {});
};

const addStyles = (el, options) => {
  Object.keys(options).forEach(attr => {
    el.style[attr] = options[attr];
  });
};

function parseFunction(str) {
  const fnBodyIndex = str.indexOf("{");

  const fnBodu = str.substring(fnBodyIndex + 1, str.lastIndexOf("}"));

  const fnDeclare = str.substring(0, fnBodyIndex);

  const fnParams = fnDeclare.substring(
    fnDeclare.indexOf("(") + 1,
    fnDeclare.lastIndexOf(")")
  );

  const args = fnParams.split(",");

  args.push(fnBodu);

  function Fn() {
    return Function.apply(this, args);
  }
  Fn.prototype = Function.prototype;

  return new Fn();
}

const setAttributes = (el, options) => {
  Object.keys(options).forEach(attr => {
    if (attr === "textContent") {
      el.textContent = options[attr];
      return;
    }
    el.setAttribute(attr, options[attr]);
  });
};

function getUrlVars() {
  /* eslint-disable */
  var vars = {};
  var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(
    m,
    key,
    value
  ) {
    vars[key] = value;
  });
  return vars;
  /* eslint-enable */
}

module.exports = {
  bindDataAttributesToProps,
  addStyles,
  parseFunction,
  setAttributes,
  getUrlVars
};
