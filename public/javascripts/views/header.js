App.Views.Header = Marionette.ItemView.extend({

    events: {
        'click a.logout': 'logout'
    },

    serializeData: function () {
        var viewData = {};
        viewData.username = Teleegzam.Session.passport.username === undefined
            ? false
            : Teleegzam.Session.passport.username;

        viewData.token = Teleegzam.Session.passport.token === undefined
            ? false
            : Teleegzam.Session.passport.token;

        return viewData;
    },

    initialize: function () {
        this.template = App.Templates.get('header');

    },

    logout: function () {
        var logout = $.ajax({
            type: 'GET',
            url: '/logout'
        });

        $.when(logout).done(function () {
            Teleegzam.Controllers.Login.index();
        });
    }

});