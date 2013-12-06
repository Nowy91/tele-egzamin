App.Collections.Tokens = Backbone.PageableCollection.extend({

    model: App.Models.Token,
    mode: 'client',

    state: {
        pageSize: 10,
        sortKey: 'createdAt',
        order: 1
    }

});