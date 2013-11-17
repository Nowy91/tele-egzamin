App.Views.Login = Marionette.ItemView.extend({

    events: {
        'click a.exams': 'exams'
    },

    initialize: function () {
        this.template = App.Templates.get('login');
    },

    exams: function () {
        Teleegzam.ExamController.showAll();
    }

});