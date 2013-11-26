App.Views.ExaminerItem = Marionette.ItemView.extend({
    tagName: 'tr',
    events: {
        'click a': 'show'
    },
    render: function() {
        var context = this.model.toJSON();
        context['formattedCreate'] = context['createdAt'].substring(0,10);
        context['formattedUpdate'] = context['updatedAt'].substring(0,10);
        var html = this.template(context);
        $(this.el).html(html);
    },

    initialize: function() {
        this.template = App.Templates.get('examiner_item');
    },
    show: function(e) {
        e.preventDefault();
        Teleegzam.Controllers.Examiner.showExaminer(this.model.id);
    }
});