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
  return password.length >= 8;
}
function roleValidate(role) {
  return role === INTERPRETER || role === USER;
}

function dateValidate(date) {
  var regex = new RegExp(
    "([0-9]{4}[-](0[1-9]|1[0-2])[-]([0-2]{1}[0-9]{1}|3[0-1]{1}))"
  );
  var dateOk = regex.test(date);
  if (dateOk) {
    return true;
  } else {
    return false;
  }
}

const validateFutureDate = date => {
  const newDate = new Date(date);
  const todayDate = new Date();
  if (newDate >= todayDate) {
    return true;
  } else {
    return false;
  }
};

module.exports = {
  validateFutureDate: validateFutureDate,
  emailValidate: emailValidate,
  nameValidate: nameValidate,
  passwordValidate: passwordValidate,
  roleValidate: roleValidate,
  dateValidate: dateValidate
};
