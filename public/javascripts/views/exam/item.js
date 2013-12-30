App.Views.ExamItem = Marionette.ItemView.extend({

    tagName: 'tr',

    events: {
        'click a': 'show'
    },
    render: function() {
        var context = this.model.toJSON();
        context['formattedDate'] = context['date'].substring(0,10);
        var gType;
        switch(context['gradesType'])
        {
            case "study":
            {
                gType="akademickie";
                break;
            }
            case "school":
            {
                gType="szkolne";
                break;
            }
            case "credit":
            {
                gType="zaliczenie";
                break;
            }
            case "custom":
            {
                gType="własne";
                break;
            }
        }
        context['gradesType'] = gType;
        var sType;
        switch(context['status'])
        {
            case "ready":
            {
                sType="<span class='glyphicon glyphicon-ok-circle ready'></span>";
                break;
            }
            case "activated":
            {
                sType="<span class='glyphicon glyphicon-pencil activated'></span>";
                break;
            }
        }
        context['status'] = sType;
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