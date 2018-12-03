const { Slim } = require('slim-js');

require('../presentational/SignupForm');

Slim.tag(
  'signup-window',
  `<center-box
    data-title="Rewards Sign Up"
    data-contents="<signup-form></signup-form>"
    data-size=600
    data-tall=true
  >
  </center-box>
  `,
  class SignupWindow extends Slim {}
);
