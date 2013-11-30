App.Views.QuestionView = Marionette.ItemView.extend({

    events: {
        'click a.editQuestion': 'editQuestion',
        'click a.btn-danger': 'deleteQuestion',
        'click a.editAnswersForm': 'editAnswersForm'
    },

    render: function() {
        var context = this.model.toJSON();
        var newPoints = context['maxPoints'].replace(/0*$/, "");
        if(newPoints.indexOf('.')==(newPoints.length-1))context['formattedMaxPoints'] = newPoints.substring(0,(newPoints.length-1));
        else context['formattedMaxPoints'] = newPoints;
        var html = this.template(context);
        $(this.el).html(html);
    },

    initialize: function() {
        this.template = App.Templates.get('question_view');
    },

    deleteQuestion: function(e) {
        e.preventDefault();
        Teleegzam.Controllers.Question.delete();
    },

    editQuestion: function(e) {
        e.preventDefault();
        Teleegzam.Controllers.Question.editForm();
    },
    editAnswersForm: function (e) {
        e.preventDefault();
        Teleegzam.Controllers.Question.editAnswersForm();
    }
})