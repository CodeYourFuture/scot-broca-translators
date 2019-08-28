const { INTERPRETER, USER } = require("./roles");
function validateEmailAddress(email) {
  var expression = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (expression.test(String(email).toLowerCase())) {
    return true;
  } else {
    return false;
  }
}

function validateName(name) {
  if (name == null || name.length == 0) {
    return false;
  } else {
    return true;
  }
}

// password is invalid...

function validatePassword(password) {
  return password.length > 8;
}
function validateRole(role) {
  return role === INTERPRETER || role === USER;
}
module.exports = {
  emailValidate: validateEmailAddress,
  nameValidate: validateName,
  passwordValidate: validatePassword,
  roleValidate: validateRole
};
