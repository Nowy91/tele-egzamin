App.Views.Menu = Marionette.ItemView.extend({

    events: {
        'click a.exams': 'exams',
        'click a.add_exam': 'addExam'
    },

    initialize: function () {
        this.template = App.Templates.get('dashboard_menu');
    },

    exams: function() {
        this.switchSelectedItem('exams');
        Teleegzam.ExamController.showAll();
    },

    addExam: function() {
        this.switchSelectedItem('add_exam');
        Teleegzam.ExamController.addForm();
    },

    switchSelectedItem: function(name) {
        $('li.active').removeClass('active');
        $('a.' + name).parent().addClass('active');
    }

});
