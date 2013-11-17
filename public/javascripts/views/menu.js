App.Views.Menu = Marionette.ItemView.extend({

    events: {
        'click a.exams': 'exams',
        'click a.add_exam': 'addExam'
    },

    initialize: function () {
        this.template = App.Templates.get('menu');
    },

    exams: function() {
        Teleegzam.ExamController.showAll();
    },

    addExam: function() {
        Teleegzam.ExamController.addForm();
    }

});
