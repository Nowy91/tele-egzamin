App.Views.TokenItem = Marionette.ItemView.extend({

    tagName: 'tr',

    events: {
    },

    initialize: function() {
        this.template = App.Templates.get('token_item');
    }

});