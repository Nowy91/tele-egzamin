App.Views.ExamEdit = Marionette.ItemView.extend({

    events: {
        'submit': 'submit'
    },

    initialize: function() {
        this.template = App.Templates.get('exam_edit');
    },

    render: function(){
        var context = this.model.toJSON();
        var gType;
        switch(context['gradesType'])
        {
            case "study":
            {
                gType="Akademickie";
                break;
            }
            case "school":
            {
                gType="Szkolne";
                break;
            }
            case "credit":
            {
                gType="Zaliczenie";
                break;
            }
            case "custom":
            {
                gType="Własne";
                break;
            }
        }
        context['gradesType'] = gType;
        $(this.el).html(this.template(context));
    },

    submit: function(e) {
        e.preventDefault();

        this.model.set({
            title: $(e.currentTarget).find('input#title').val(),
            date: $(e.currentTarget).find('input#date').val(),
            numberOfStudents: $(e.currentTarget).find('input#numberOfStudents').val(),
            duration: $(e.currentTarget).find('input#duration').val()
        });

        var newGrades = null;
        var gType = $(e.currentTarget).find('select').val();
        if(gType == "Akademickie")this.model.set('gradesType', 'study');
        else if(gType == "Szkolne")this.model.set('gradesType', 'school');
        else if(gType == "Zaliczenie")this.model.set('gradesType', 'credit');
        else
        {
            this.model.set('gradesType', 'custom');

            newGrades = new App.Collections.Grades;
            $('.grade').each(function () {
                var singleGrade = new App.Models.Grade({
                    threshold: $(this).find('.threshold').val(),
                    mark: $(this).find('.mark').val()
                });
                newGrades.add(singleGrade);
            });
        }

        Teleegzam.Controllers.Exam.editExam(this.model, newGrades);
    }

});