App.Views.CheckItem = Marionette.ItemView.extend({

    tagName: 'tr',

    events: {
        'click a': 'checkToken'
    },

    initialize: function() {
        this.template = App.Templates.get('check_item');
    },

    checkToken: function() {

    }

});