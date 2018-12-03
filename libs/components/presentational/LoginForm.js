const { Slim } = require('slim-js');
const axios = require('axios');
const router = require('../../router');

const { userStore } = require('../../store');
/* eslint-disable no-useless-escape */

require('../presentational/EmailInput');
require('../presentational/PasswordInput');

Slim.tag(
  'login-form',
  `<div s:id="loginForm" id="loginForm" class="loginForm" >
    <form s:id="actualLoginForm" id="actualLoginForm" action="#" method="post">
      <email-input></email-input>
      <br/>
      <password-input></password-input>
      <br/>
      <span class="buttonSpan">
        <button type="button" s:id="signUpButton" id="signUpButton">Sign Up</button>
        <button type="submit">&nbsp;Login&nbsp;</button>
      </span>
    </form>
  </div>
  <style>
    :host {
      height: 80%;
      margin-top: 20px;
      contain: content;
    }

    .loginForm form {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100%;
    }
    
    .loginForm {
      height: 80%;
    }

    .loginForm .buttonSpan {
      display: inline-flex;
      justify-content: space-evenly;
      width: 60%;
    }

    #signUpButton:hover {
      padding: 7px!important;
    }

    .loginForm .buttonSpan button {
      border: 1px solid darkgray!important;
      box-shadow: 0 0 2px darkgray;
      font-family: Garamond;
      font-variant: small-caps;
      font-size: 1.2em;
      font-weight: 800;
      background: ghostwhite;
    }

    .loginForm .buttonSpan button:hover {
      border: 3px inset lightgray!important;
      padding: 5px;
    }

    .loginForm input, button {
      box-shadow: 0 0 5px black;
      padding: 9px;
      border-radius: 6px;
      border: 1px solid darkgray;
    }

    .loginForm input, button:placeholder-shown {
      box-shadow: 0 0 10px darkgray;
    }

    .loginForm input:valid, .loginForm button:valid {
      border: 3px solid lightgreen;
      box-shadow: 0 0 2px darkgray;
      padding: 7px;
    }

    .loginForm input, button:active, .loginForm input, button:focus {
      outline: none;
    }
  </style>
  `,
  class LoginForm extends Slim {
    onRender () {
      this.loginForm.addEventListener('submit', formSubmit(this));
      this.signUpButton.addEventListener('click', signUpSubmit(this));
    }

    get useShadow () {
      return true;
    }
  }
);

const getInputValues = targetOrElement => {
  const target = targetOrElement.elements;
  const inputs = Array.from(target)
    .map(({ name, value }) => {
      if (!name) {
        return;
      }
      return { name, value };
    })
    .filter(Boolean);

  const [email, password] = inputs;
  return [email.value, password.value];
};

const formSubmit = element => e => {
  e.preventDefault();
  const url = element.props['login-action'];
  const [email, password] = getInputValues(e.target);
  axios
    .post(url, {
      username: email,
      password
    })
    .then(res => res.data)
    .then(({ token }) => localStorage.setItem('token', token))
    .then(async () => userStore.getUser())
    .then(() => router.navigate('../'))
    .catch(err => {
      if (!err.hasOwnProperty('response')) return;
      if (err.response.status === 500) {
        const mI = err.response.data.indexOf('<pre>') + 5;
        const eI = err.response.data.indexOf('<br>');
        const message = err.response.data.substring(mI, eI);
        alert(message);
      }
    });
};

const signUpSubmit = element => e => {
  e.preventDefault();
  router.navigate('../signup');
};
