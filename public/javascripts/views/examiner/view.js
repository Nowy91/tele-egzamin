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
        Teleegzam.Controllers.Examiner.editForm(this.model.id);
    },
    deleteExaminer: function(e) {
        e.preventDefault();
        Teleegzam.Controllers.Examiner.deleteExaminer(this.model.id);
    }
})