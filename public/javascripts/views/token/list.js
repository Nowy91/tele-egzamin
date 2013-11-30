App.Views.ActiveTokenList = Marionette.CompositeView.extend({

    events: {
        'click a.btn-success': 'generateTokens'
    },

    itemView: App.Views.TokenItem,
    itemViewContainer: 'tbody',

    initialize: function () {
        this.template = App.Templates.get('token_list');
    },

    generateTokens: function() {
        Teleegzam.Controllers.Token.generate();
    }

});