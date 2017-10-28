
module.exports = (function () {

    var fs = require('fs');
    var usersFile;
    var registration_successful = 'Registretion was successful';
    var registration_unsuccessful = 'Registretion was UNSUCCESSFULL email is already registered';


    fs.readFile('./database/users/users.json', 'utf8', function (err, data) {
        usersFile = JSON.parse(data);
    });


    function addNewUser(data, callback) {
        var isExist = isUserExist(data.email);
        if (isExist) {
            callback(registration_unsuccessful);
        } else {
            usersFile.push(data);
            updateUserusersFiles(callback);
        }
    }

    function isUserExist(email) {
        var isExit = false;
        if (usersFile.length === 0) {
            return isExit;
        }
        for (var i = 0; i < usersFile.length; i++) {
            var user = usersFile[i];
            if (user.email === email) {
                isExit = true;
                return isExit;
            }
        }
        return isExit;
    }

    function updateUserusersFiles(callback) {
        fs.writeFile('./database/users/users.json', JSON.stringify(usersFile), function (err) {
            callback(registration_successful);
        });
    }

    function comparePasswords(password) {
        var isExist = false;
        for (var i = 0; i < usersFile.length; i++) {
            var user = usersFile[i];
            if (user.password === password) {
                isExit = true;
                return isExit;
            }
        }
        return isExist;
    }

    function fetchUser(email) {
        for (var i = 0; i < usersFile.length; i++) {
            var user = usersFile[i];
            if (user.email === email) {
                return user;
            }
        }
    }

    function validationLoginData(email, password, cb) {
        var isValid = (isUserExist(email) && comparePasswords(password));
        if (isValid) {
            var user = fetchUser(email);
            var userName = user.userName;
            cb(userName);
        } else {
            cb(undefined);
        }
    }




    return {
        addNewUser: addNewUser,
        validationLoginData: validationLoginData
    };

})();
