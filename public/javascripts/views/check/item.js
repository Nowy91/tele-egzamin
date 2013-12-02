App.Views.CheckItem = Marionette.ItemView.extend({

    tagName: 'tr',

    events: {
        'click a': 'checkToken'
    },

    render: function() {
        var context = this.model.toJSON();
        context['formattedExecutedDate'] = context['executedDate'].substring(0,10);
        var html = this.template(context);
        $(this.el).html(html);
    },

    initialize: function() {
        this.template = App.Templates.get('check_item');
    },

    checkToken: function() {
        Teleegzam.Controllers.Check.showToken(this.model.get('content'));
    }

});