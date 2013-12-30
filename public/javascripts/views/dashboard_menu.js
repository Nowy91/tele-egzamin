App.Views.Menu = Marionette.ItemView.extend({

    events: {
        'click a.exams': 'exams'
    },

    initialize: function () {
        this.template = App.Templates.get('dashboard_menu');
    },

    exams: function() {
        Teleegzam.Controllers.Exam.showAll();
    }
});
