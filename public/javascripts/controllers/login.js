Teleegzam.module('Controllers', function (Controller, Teleegzam, Backbone, Marionette, $, _) {

    Controller.Login = {

        index: function () {

            var authentication = $.ajax({
                type: 'GET',
                url: '/is_authenticated'
            });

            $.when(authentication).done(function (session) {
                Teleegzam.Session = session;

                if (Object.keys(session.passport).length === 0) {
                    this.loginView = new App.Views.Login;
                    Teleegzam.mainRegion.show(this.loginView);
                }
                else {
                    Teleegzam.Controllers.Exam.showAll();
                }
            });

        }

    }

});