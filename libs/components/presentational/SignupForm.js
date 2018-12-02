const { Slim } = require("slim-js");

const { newUserPOST } = require("../../api");
const { url } = require("../../../config");

require("./PasswordInput");
require("./EmailInput");

const titleCase = string => {
  let words = string.split(" ");
  words = words.map(word => {
    word = word.substring(0, 1).toUpperCase() + word.substring(1).toLowerCase();
    return word;
  });
  return words.join(" ");
};

const TextInput = (name, { required } = { required: false }) => {
  /* eslint-disable no-useless-escape, prettier/prettier */
  const lower = name.toLowerCase().replace(/ /g, "");
  const title = titleCase(name);
  const isPassword = name === "password" || name === "confirm password";

  if (isPassword) {
    return `
    <span>
      <label for="password">${title}</label>
      <password-input></password-input>
    </span>
    <br>`
  } else {
    return `
    <span>
      <label for="${lower}">${title}</label>
      <input 
        type="text"
        name="${lower}"
        id="${lower}" 
        ${required && "required"} 
        ${!required && 'placeholder = "Optional"'}
        ${isPassword && 'pattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"'}
      />
    </span>
    <br/>
  `;
  }
};

Slim.tag(
  "signup-form",
  `<div>
    <form s:id="theForm" action="#" method="post">
      <span>
        <label for="email">Email</label>
        <email-input></email-input>
      </span>
      ${TextInput("password", { required: true })}
      ${TextInput("confirm password", { required: true })}
      ${TextInput("full name", { required: true })}
      ${TextInput("phone number")}
      <span class="questionSpan">Is this a business or personal account?</span>
      <br>
      <span>
        <label for="business">Business</label>
        <input type="radio" id="business" name="accountType" value="business" required>
        <label for="personal">Personal</label>
        <input type="radio" id="personal" name="accountType" value="personal">
      </span>
      <br>
      <span>
        <button type="submit">Sign Up</button>
      </span>
    </form>
  </div>
  <style>

    :host {
      contain: content;
    }

    email-input input {
      padding-top: 4px;
      padding-bottom: 2px;
    }

    password-input input {
      padding-top: 4px;
      padding-bottom: 2px;
    }

    :host div form {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
    }

    :host div form button[type="submit"] {
      margin-left: 60%;
      padding: 6px;
      border-radius: 4px;
      font-weight: 800;
      font-family: Garamond;
      background: lightgreen;
      font-size: 1.2rem;
    }

    :host div form span {
      width: 80%;
      display: block;
      position: relative;
      margin-bottom: 8px;
    }

    :host div form .questionSpan {
      background: white;
      display: inline-block;
      font-weight: 700;
      font-family: Garamond;
      align-self: center;
      width: 60%;
      padding: 4px;
      border-radius: 4px;
    }

    :host div form span label {
      background: white;
      display: inline-block;
      padding: 4px;
      border-radius: 4px;
      font-weight: 700;
      font-family: Garamond;
      width: 120px;
    }

    :host div form span input[type="text"] {
      padding-top: 4px;
      padding-bottom: 2px;
      background: gray;
    }

    :host div form span input[type="text"]::placeholder {
      color: black;
    }

    :host div form span input[type="text"]:required {
      background: white;
    }

    :host div form span input[type="text"]:active, :host div form span input[type="text"]:focus {
      outline: none;
    }

  </style>
  `,
  class SignupForm extends Slim {
    get useShadow() {
      return true;
    }

    onRender() {
      this.theForm.addEventListener("submit", submitForm(this.theForm));
    }
  }
);

const submitForm = form => e => {
  try {
    e.preventDefault();

    form.removeEventListener("submit", submitForm(form));
    
    const elements = Array.from(form.elements);

    const inputs = elements.filter(el => {
      const isText = ["text", "email", "password"].includes(el.type)
      const isChecked = el.checked;
      return isText || isChecked;
    });
      
    const data = inputs.reduce((details, el) => {
      if (el.name === "password") {
        if (details.hasOwnProperty("password")) {
          if (details.password !== el.value) {
            throw new Error("Passwords don't match");
          }
        }
      }
      if (el.value) {
        details[el.name] = el.value;
      }
      return details;
    }, {});

    newUserPOST(data);

  } catch (err) {
    alert(err);
  }
};
