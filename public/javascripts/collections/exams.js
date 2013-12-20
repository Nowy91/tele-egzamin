App.Collections.Exams = Backbone.PageableCollection.extend({

    model: App.Models.Exam,
    mode: "client",

    state: {
        pageSize: 10,
        sortKey: 'title',
        order: 1
    }

});