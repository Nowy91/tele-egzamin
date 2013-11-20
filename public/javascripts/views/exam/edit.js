App.Views.ExamEdit = Marionette.ItemView.extend({

    events: {
        'submit': 'submit'
    },

    initialize: function() {
        this.template = App.Templates.get('exam_edit');
    },

    submit: function(e) {
        e.preventDefault();

        this.model.set({
            title: $(e.currentTarget).find('input#title').val(),
            date: $(e.currentTarget).find('input#date').val(),
            numberOfStudents: $(e.currentTarget).find('input#numberOfStudents').val(),
            duration: $(e.currentTarget).find('input#duration').val(),
            status: $(e.currentTarget).find('input#status').val()
        });

        Teleegzam.Controllers.Exam.editExam(this.model);
    }

});