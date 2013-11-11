App.Models.Exam = Backbone.Model.extend({
    defaults: {
        title: "Some title",
        date: "2012-02-26",
        duration: 30,
        numberOfStudents: 16,
        status: 'active'
    }
});

App.Collections.Exams = Backbone.Collection.extend({
    model: App.Models.Exam
});