App.Views.TokenItem = Marionette.ItemView.extend({

    tagName: 'tr',

    events: {
    },

    render: function() {
        var context = this.model.toJSON();
        context['formattedCreatedAt'] = context['createdAt'].substring(0,10);
        var html = this.template(context);
        $(this.el).html(html);
    },

    initialize: function() {
        this.template = App.Templates.get('token_item');
    }

});