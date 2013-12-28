App.Views.Header = Marionette.ItemView.extend({

    events: {
        'click a.logout': 'logout'
    },

    serializeData: function () {
        var viewData = {};
        viewData.username = Teleegzam.Session.passport.username === undefined
            ? true
            : Teleegzam.Session.passport.username;

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