App.Views.CheckedTokenList = Marionette.CompositeView.extend({

    itemView: App.Views.CheckedTokenItem,
    itemViewContainer: 'tbody',

    initialize: function () {
        this.template = App.Templates.get('checked_list');
    }

});
