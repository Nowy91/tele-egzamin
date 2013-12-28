App.Views.Login = Marionette.ItemView.extend({

    events: {
        'submit #examinerLoginForm': 'examinerLogin',
        'submit #studentLoginForm': 'studentLogin'
    },

    initialize: function () {
        this.template = App.Templates.get('login');
    },

    examinerLogin: function (e) {
        e.preventDefault();

        var user = new App.Models.User({
            username: $(e.currentTarget).parent().find('input[name="username"]').val(),
            password: $(e.currentTarget).parent().find('input[name="password"]').val()
        });

        Teleegzam.Controllers.Examiner.login(user);
    },

    studentLogin: function (e) {
        e.preventDefault();

        var token = new App.Models.Token({
            content: $(e.currentTarget).parent().find('input[name="content"]').val()
        });

        Teleegzam.Controllers.Student.login(token);
    }

});