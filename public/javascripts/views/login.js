App.Views.Login = Marionette.ItemView.extend({

    events: {
        'click a.exams': 'exams',
        'click .student': 'student'
    },

    initialize: function () {
        this.template = App.Templates.get('login');
    },

    exams: function () {
        Teleegzam.Controllers.Exam.showAll();
    },

    student: function (e) {
        e.preventDefault();
        token = $(e.currentTarget).parent().find('input#studentToken').val();

        if (token) {
            Teleegzam.Controllers.Student.check(token);
        }
    }

});