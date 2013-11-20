App.Collections.Questions = Backbone.Collection.extend({

    model: App.Models.Question,
    comparator: 'id'
});