App.Views.ExamAdd = Marionette.ItemView.extend({

    events: {
        'submit': 'submit'
    },

    initialize: function() {
        this.template = App.Templates.get('exam_add');
    },

    submit: function(e) {
        e.preventDefault();

        var newExam = new App.Models.Exam({
            title: $(e.currentTarget).find('input#title').val(),
            date: $(e.currentTarget).find('input#date').val(),
            numberOfStudents: $(e.currentTarget).find('input#numberOfStudents').val(),
            duration: $(e.currentTarget).find('input#duration').val(),
            status: $(e.currentTarget).find('input#status').val()
        });

        var newGrades = null;
        var gType = $(e.currentTarget).find('select').val();
        if(gType == "Akademickie")newExam.set('gradesType', 'study');
        else if(gType == "Szkolne")newExam.set('gradesType', 'school');
        else if(gType == "Zaliczenie")newExam.set('gradesType', 'credit');
        else
        {
            newExam.set('gradesType', 'custom');
            
        }

        Teleegzam.Controllers.Exam.addExam(newExam, newGrades);
    }

});