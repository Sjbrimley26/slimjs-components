const { Slim } = require('slim-js');
/* eslint-disable no-useless-escape */

Slim.tag(
  'email-input',
  `<input
      aria-label="Email Input"
      type="email"
      name="email"
      placeholder="Email"
      required
      pattern="^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
    />`,
  class EmailInput extends Slim {}
);
