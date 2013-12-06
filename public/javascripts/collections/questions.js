App.Collections.Questions = Backbone.PageableCollection.extend({

    model: App.Models.Question,
    mode: 'client',

    state: {
        pageSize: 10,
        sortKey: 'content',
        order: 1
    }

});