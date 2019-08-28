function validateEmailAddress(email) {
  var expression = /@/;
  if (expression.test(String(email).toLowerCase())) {
    return true;
  } else {
    res.status(400).send({
      success: false,
      message: "The email format is incorrect."
    });
    return false;
  }
}

function validateName(name) {
  if (name == null || name.length == 0) {
    res.status(400).send({
      success: false,
      message: "name is required"
    });
    return false;
  } else return true;
}

// password is invalid...

function validatePassword(password) {
  if (password.length < 8) {
    res.status(400).send({
      success: false,
      message: "The password must have at least 8 characters"
    });
    return false;
  } else return true;
}
function validateRole(role) {
  if (role == null || role.length == 0) {
    res.status(400).send({
      success: false,
      message: "role  is required"
    });
    return false;
  } else return true;
}
module.exports = {
  emailValidate: validateEmailAddress,
  nameValidate: validateName,
  passwordValidate: validatePassword,
  roleValidate: validateRole
};
