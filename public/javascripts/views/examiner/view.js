App.Views.ExaminerView = Marionette.ItemView.extend({
    events: {
        'click a#edit':'editExaminer',
        'click a.btn-danger': 'deleteExaminer'
    },

    render: function() {
        var context = this.model.toJSON();
        context['formattedCreate'] = context['createdAt'].substring(0,10);
        var html = this.template(context);
        $(this.el).html(html);
    },

    initialize: function() {
        this.template = App.Templates.get('examiner_view');
    },
    editExaminer: function(e){
        e.preventDefault();
        Teleegzam.Controllers.Examiner.editForm(this.model.id);
    },

    deleteExaminer: function(e) {
        e.preventDefault();
        Teleegzam.Controllers.Examiner.deleteExaminer(this.model.id);
    }
})