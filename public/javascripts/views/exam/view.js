App.Views.ExamView = Marionette.ItemView.extend({

    events: {
        'click a.btn-warning': 'editExam',
        'click a.btn-danger': 'deleteExam'
    },

    initialize: function() {
        this.template = App.Templates.get('exam_view');
    },

    deleteExam: function() {
        Teleegzam.Controllers.Exam.deleteExam(this.model.id);
    },

    editExam: function() {
        Teleegzam.Controllers.Exam.editForm(this.model.id);
    }

})