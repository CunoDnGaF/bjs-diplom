"use strict";

let userForm = new UserForm();

userForm.loginFormCallback = function(data) {
    ApiConnector.login(data, function(response) {
        if (response.success === true) {
            location.reload();
        } else {
            alert(response.error);
        }
        console.log(response);
    })
}

userForm.registerFormCallback = function(data) {
    ApiConnector.register(data, function(response) {
        if (response.success === true) {
            location.reload();
        } else {
            alert(response.error);
        }
        console.log(response);
    })
}