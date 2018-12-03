const { Slim } = require('slim-js');

const { url } = require('../../../config');

require('../container/CenterBox');
require('../presentational/LoginForm');

Slim.tag(
  'login-window',
  `<center-box
    data-title="iBusiness.Exchange"
    data-contents='<login-form  
      data-login-action="${url}/login"
      data-signup-action="${url}/newUser"
    />'
    data-size=400
  />`,
  class LoginWindow extends Slim {
    get useShadow () {
      return true;
    }
  }
);
