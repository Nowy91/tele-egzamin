App.Views.ExamView = Marionette.ItemView.extend({

    events: {
        'click a.btn-danger': 'deleteExam'
    },

    initialize: function() {
        this.template = App.Templates.get('exam_view');
    },

    deleteExam: function() {
        Teleegzam.ExamController.deleteExam(this.model.id);
    }

})