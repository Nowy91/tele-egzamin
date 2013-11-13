App.Views.ExamAdd = Backbone.View.extend({

    templateName: 'exam_add',

    events: {
        'submit': 'submit'
    },

    initialize: function() {
        this.render();
    },

    render: function() {
        var that = this;
        App.Templates.get(this.templateName, function (template) {
            that.$el.html(_.template(template));
        });
        return this;
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

        this.collection.add(newExam);
    }

});