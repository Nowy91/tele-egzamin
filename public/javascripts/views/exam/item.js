App.Views.ExamItem = Marionette.ItemView.extend({

    tagName: 'tr',

    events: {
        'click a': 'show'
    },
    render: function() {
        var context = this.model.toJSON();
        context['formattedDate'] = context['date'].substring(0,10);
        var html = this.template(context);
        $(this.el).html(html);
    },

    initialize: function() {
        this.template = App.Templates.get('exam_item');
    },

    show: function() {
        Teleegzam.Controllers.Exam.showExam(this.model.id);
    }

});