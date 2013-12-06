App.Views.CheckedTokenItem = Marionette.CompositeView.extend({

    tagName: 'tr',

    render: function() {
        var context = this.model.toJSON();
        context['formattedExecutedDate'] = context['executedDate'].substring(0,10);
        var html = this.template(context);
        $(this.el).html(html);
    },

    initialize: function() {
        this.template = App.Templates.get('checked_item');
    }

});
