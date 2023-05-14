"use strict";

let logoutButton = new LogoutButton();

logoutButton.action = function() {
    ApiConnector.logout(function(responce) {
        if (responce.success === true) {
            location.reload();
        }
    })
};

ApiConnector.current(function(responce) {
    if (responce.success === true) {
        ProfileWidget.showProfile(responce.data);
    }
});

let ratesBoard = new RatesBoard();

function getCurrencyRates() {
    ApiConnector.getStocks(function(responce) {
        if (responce.success === true) {
            ratesBoard.clearTable();
            ratesBoard.fillTable(responce.data);
        }
    })
}

getCurrencyRates();

setInterval(getCurrencyRates, 60000);

let moneyManager = new MoneyManager();

moneyManager.addMoneyCallback = function(data) {
    ApiConnector.addMoney(data, function(responce) {
        if (responce.success === true) {
            ProfileWidget.showProfile(responce.data);
            moneyManager.setMessage(true, "Баланс пополнен");
        } else {
            moneyManager.setMessage(false, responce.data);
        }
    })
};

moneyManager.conversionMoneyCallback = function(data) {
    ApiConnector.convertMoney(data, function(responce) {
        if (responce.success === true) {
            ProfileWidget.showProfile(responce.data);
            moneyManager.setMessage(true, "Валюта сконвертирована");
        } else {
            moneyManager.setMessage(false, responce.data);
        }
    })
};

moneyManager.sendMoneyCallback = function(data) {
    ApiConnector.transferMoney(data, function(responce) {
        if (responce.success === true) {
            ProfileWidget.showProfile(responce.data);
            moneyManager.setMessage(true, "Валюта переведена");
        } else {
            moneyManager.setMessage(false, responce.data);
        }
    })
};

let favoritesWidget = new FavoritesWidget();

ApiConnector.getFavorites(function(responce) {
    if (responce.success === true) {
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(responce.data);
        moneyManager.updateUsersList(responce.data);
    }
});

favoritesWidget.addUserCallback = function(data) {
    ApiConnector.addUserToFavorites(data, function(responce) {
        if (responce.success === true) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(responce.data);
            moneyManager.updateUsersList(responce.data);
            moneyManager.setMessage(true, "Пользователь добавлен");
        } else {
            favoritesWidget.setMessage(false, response.data);
        }
    });
}

favoritesWidget.removeUserCallback = function(id) {
    ApiConnector.removeUserFromFavorites(id, function(responce) {
        if (responce.success === true) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(responce.data);
            moneyManager.updateUsersList(responce.data);
            moneyManager.setMessage(true, "Пользователь удален");
        } else {
            favoritesWidget.setMessage(false, response.data);
        }
    });
}



