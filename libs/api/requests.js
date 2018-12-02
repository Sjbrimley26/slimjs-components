const {
  axWithToken,
  ax
} = require("./axiosConfig");

const axios = require("axios");

const router = require("../router");

const { url } = require("../../config");

const profilePOST = async () => {
  let response;

  await axWithToken({
      method: "POST",
      url: "/profile",
      headers: {
        'Content-Type': 'text/plain'
      },
    })
    .then(res => response = res.data)
    .catch(err => response = err)

  return response

};

const newUserPOST = async (details) => {
  axios
    .post(url + "/newUser", {
      ...details
    })
    .then(res => {
      if (res.status === 200) {
        console.log("Why won't it navigate?");
        const href = window.location.href;
        const eI = href.indexOf("/sign");
        window.location.href = href.substring(0, eI) + "/login";
      } else {
        throw new Error("There was a problem during account registration.");
      }
    })
    .catch(err => {
      if (!err.hasOwnProperty("response")) return;
      if (err.response.status === 500) {
        const mI = err.response.data.indexOf("<pre>") + 5;
        const eI = err.response.data.indexOf("<br>");
        const message = err.response.data.substring(mI, eI);
        alert(message);
      }
    });
};

const changePasswordPOST = async ({
  email,
  existingPassword,
  newPassword
}) => {
  let response;

  await axWithToken({
      method: "POST",
      url: "/changePassword",
      headers: {
        'Content-Type': 'application/json'
      },
      data: JSON.stringify({
        email,
        existingPassword,
        newPassword
      })
    })
    .then(res => {
      if (res.data.message == "Password changed!") {
        response = res.data.message;
      } else {
        alert("Invalid existing password!");
      }
    })
    .catch(err => response = err)

  return response
};

const getUnverifiedUsers = async () => {
  const users = [];
  let response;

  await axWithToken({
      method: "POST",
      url: "/unverified",
      headers: {
        'Content-Type': 'text/plain'
      },
    })
    .then(res => response = res.data)
    .catch(err => response = err);

  return response
};

module.exports = {
  profilePOST,
  newUserPOST,
  changePasswordPOST,
  getUnverifiedUsers
};