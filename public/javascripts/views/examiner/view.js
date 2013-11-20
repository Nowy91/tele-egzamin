App.Views.ExaminerView = Marionette.ItemView.extend({
    events: {
        'click a#edit':'editExaminer',
        'click a.btn-danger': 'deleteExaminer'
    },
    initialize: function() {
        this.template = App.Templates.get('examiner_view');
    },
    editExaminer: function(e)
    {
        e.preventDefault();
        Teleegzam.ExaminerController.editForm(this.model);
    },
    deleteExaminer: function(e) {
        e.preventDefault();
        Teleegzam.ExaminerController.deleteExaminer(this.model.id);
    }
})