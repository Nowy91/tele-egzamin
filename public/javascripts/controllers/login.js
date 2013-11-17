Teleegzam.module('LoginController', function(Controller, Teleegzam, Backbone, Marionette, $, _) {

    Controller.index = function() {
        var loginView = new App.Views.Login;
        Teleegzam.mainRegion.show(loginView);
    };

});