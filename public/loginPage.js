"use strict";

let userForm = new UserForm();

userForm.loginFormCallback = function(data) {
    ApiConnector.login(data, function(response) {
        if (response.success === true) {
            location.reload();
        } else {
            userForm.setLoginErrorMessage(response.error);
        }
    })
}

userForm.registerFormCallback = function(data) {
    ApiConnector.register(data, function(response) {
        if (response.success === true) {
            location.reload();
        } else {
            userForm.setRegisterErrorMessage(response.error);
        }
    })
}