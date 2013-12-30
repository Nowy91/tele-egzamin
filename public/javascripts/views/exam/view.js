App.Views.ExamView = Marionette.ItemView.extend({

    events: {
        'click a.btn-warning': 'editExam',
        'click a.btn-danger': 'deleteExam'
    },
    render: function(){
        var context = this.model.toJSON();
        context['formattedDate'] = context['date'].substring(0,10);
        context['formattedTime'] = context['date'].substring(11,16);
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
            case "study":
            {
                gType="zaliczenie";
                break;
            }
            case "study":
            {
                gType="własne";
                break;
            }
        }
        context['gradesType'] = gType;
        $(this.el).html(this.template(context));
    },

    initialize: function() {
        this.template = App.Templates.get('exam_view');
    },

    deleteExam: function() {
        Teleegzam.Controllers.Exam.deleteExam(this.model.id);
    },

    editExam: function() {
        Teleegzam.Controllers.Exam.editForm(this.model.id);
    }

})