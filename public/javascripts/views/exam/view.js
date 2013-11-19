App.Views.ExamView = Marionette.ItemView.extend({

    events: {
        'click a.btn-danger': 'deleteExam'
    },

    initialize: function() {
        this.template = App.Templates.get('exam_view');
    },

    deleteExam: function() {
        Teleegzam.Controllers.Exam.deleteExam(this.model.id);
    }

})