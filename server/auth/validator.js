const { INTERPRETER, USER } = require("./roles");
function emailValidate(email) {
  var expression = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (expression.test(email.toLowerCase())) {
    return true;
  } else {
    return false;
  }
}

function nameValidate(name) {
  if (name == null || name.length == 0) {
    return false;
  } else {
    return true;
  }
}

function passwordValidate(password) {
  return password.length > 8;
}
function roleValidate(role) {
  return role === INTERPRETER || role === USER;
}
module.exports = {
  emailValidate: emailValidate,
  nameValidate: nameValidate,
  passwordValidate: passwordValidate,
  roleValidate: roleValidate
};
