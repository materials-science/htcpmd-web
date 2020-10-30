const validate = {}

/**
 * @description twice password confirmation
 * @param {String} pass1
 * @param {String} pass2
 */
validate.password_confirmation = function (rule, pass1, pass2) {
  return pass1 == pass2
}

/**
 * @description twice password confirmation
 * @param {String} value
 */
validate.is_clean_string = function (rule, value, callback) {
  const reg = /^[_a-zA-Z0-9]+$/;
  if (value == '' || value == undefined || value == null) {
    callback();
  } else {
    if (!reg.test(value)) {
      callback(new Error('仅由英文字母，数字以及下划线组成'));
    } else {
      callback();
    }
  }
}

export default validate
