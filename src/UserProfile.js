var UserProfile = (function () {
  var full_name = "";
  var user_logged = false;

  var getName = function () {
    return full_name;
  };

  var setName = function (name) {
    full_name = name;
  };
  var getLogged = function () {
    return user_logged;
  };

  var setLogged = function (logged) {
    user_logged = logged;
  };

  return {
    getName: getName,
    setName: setName,
    setLogged: setLogged,
    getLogged: getLogged,
  };
})();

export default UserProfile;
