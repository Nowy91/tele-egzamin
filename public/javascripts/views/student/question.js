App.Views.StudentQuestion = Marionette.ItemView.extend({

    render: function () {
        var context = this.model.toJSON();
        var newPoints = context['maxPoints'].replace(/0*$/, "");
        if (newPoints.indexOf('.') == (newPoints.length - 1)) {
            newPoints = newPoints.substring(0, (newPoints.length - 1));
        }
        context['formattedMaxPoints'] = newPoints;
        var html = this.template(context);
        $(this.el).html(html);
    },
    initialize: function() {
        this.template = App.Templates.get('student_question');
    }

})

