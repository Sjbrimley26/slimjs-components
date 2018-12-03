const { Slim } = require('slim-js');
const { bindDataAttributesToProps } = require('./utils');

Slim.plugin('create', element => {
  bindDataAttributesToProps(element);
});
