const createSidebar = require("../../components/main/BarAndLinks");
const { getUnverifiedUsers } = require("../../api");
const { addStyles } = require("../../components/utils");

module.exports = (app, router) => () => {
  let bodyContents = ``;
  getUnverifiedUsers().then(users => {
    users.forEach(({ username, fullname }) => {
      bodyContents += 
      `<li>${fullname}: ${username} <input type="checkbox"/></li>
      `;
    });

    const header = document.createElement("header-bar");
    header.setAttribute("data-title", "Activate Users");
    const sidebar = createSidebar();
    const body = document.createElement("main-content");
    body.setAttribute(
      "data-contents",
      `<p style="color: white">
        <ul>
          <li>Name / Email Address</li>
          ${bodyContents}
        </ul>
      </p>
      <style>
        li {
          color: white;
        }

        li input {
          transform: translate(10px, 3px);
          height: 15px;
          width: 15px;
        }
      </style>
      `
    );
    const submitter = document.createElement("button");
    submitter.type = "submit";
    submitter.classList.add("submitter");
    submitter.textContent = "Activate";
    addStyles(submitter, {
      position: "absolute",
      height: "30px",
      width: "80px",
      top: "calc(80% - 20px)",
      left: "calc(80% - 30px)",
      "border-radius": "5px"
    });
    app.appendChild(submitter);
    app.appendChild(header);
    app.appendChild(body);
    app.appendChild(sidebar);
  });
};