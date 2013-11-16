App.Views.ExamAdd = Backbone.View.extend({

    events: {
        'submit': 'submit'
    },

    initialize: function() {
        this.template = App.Templates.get('exam_add');
        this.render();
    },

    render: function() {
        this.$el.html(_.template(this.template));
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