App.Views.ExecutedTokenList = Marionette.CompositeView.extend({

    itemView: App.Views.CheckItem,
    itemViewContainer: 'tbody',

    initialize: function () {
        this.template = App.Templates.get('check_list');
    }

});
