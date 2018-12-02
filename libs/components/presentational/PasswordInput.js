const { Slim } = require("slim-js");

Slim.tag(
  "password-input",
  `<input
    aria-label="Password Input"
    name="password"
    type="password"
    placeholder="Password"
    required
    minlength="6"
    autocomplete="on"
    pattern="^.*(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!#$%&?]).*$"
    title="Password must contain at least 1 capital letter, 1 lowercase letter, 1 number, and 1 special character (!,#,$,%,&, or ?)"
  />`,
  class PasswordInput extends Slim {}
);
