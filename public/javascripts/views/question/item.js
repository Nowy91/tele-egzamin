App.Views.QuestionItem = Marionette.ItemView.extend({

    tagName: 'tr',

    events: {
        'click a': 'show'
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
        this.template = App.Templates.get('question_item');
    },

    show: function(e) {
        e.preventDefault();
        Teleegzam.Controllers.Question.showSingle(this.model.id);
    }
});