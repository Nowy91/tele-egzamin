App.Views.Login = Marionette.ItemView.extend({

    events: {
        'submit #examinerLoginForm': 'examinerLogin',
        'click a.student': 'student'
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

    student: function (e) {
        e.preventDefault();
        token = $(e.currentTarget).parent().find('input#studentToken').val();

        if (token) {
            Teleegzam.Controllers.Student.check(token);
        }
    }

});