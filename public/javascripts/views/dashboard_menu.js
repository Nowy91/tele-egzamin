App.Views.Menu = Marionette.ItemView.extend({

    events: {
        'click a.exams': 'exams',
        'click a.add_exam': 'addExam'
    },

    initialize: function () {
        this.template = App.Templates.get('dashboard_menu');
    },

    exams: function() {
        Teleegzam.Controllers.Exam.showAll();
    },

    addExam: function() {
        Teleegzam.Controllers.Exam.addForm();
    }

});
