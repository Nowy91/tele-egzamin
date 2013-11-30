App.Views.QuestionEdit = Marionette.ItemView.extend({

    events: {
        'submit': 'submit'
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
        this.template = App.Templates.get('question_edit');
    },

    submit: function(e) {
        e.preventDefault();

        var newQuestion = new App.Models.Question({
            content: $(e.currentTarget).find('#content').val(),
            maxPoints: $(e.currentTarget).find('input#maxpoints').val(),
            examId: this.model.id
        });

        Teleegzam.Controllers.Question.edit(newQuestion);
    }

});