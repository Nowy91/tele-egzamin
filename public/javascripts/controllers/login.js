Teleegzam.module('Controllers', function (Controller, Teleegzam, Backbone, Marionette, $, _) {

    Controller.Login = {
        index: function () {
            this.loginView = new App.Views.Login;
            Teleegzam.mainRegion.show(this.loginView);
        }
    }

});