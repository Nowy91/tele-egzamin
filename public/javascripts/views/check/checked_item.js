App.Views.CheckedTokenItem = Marionette.CompositeView.extend({

    tagName: 'tr',

    render: function () {
        var context = this.model.toJSON();
        context['formattedExecutedDate'] = context['executedDate'].substring(0, 10);
        var newPoints = context['reachedPoints'].replace(/0*$/, "");
        if (newPoints.indexOf('.') == (newPoints.length - 1))
            context['formattedReachedPoints'] = newPoints.substring(0, (newPoints.length - 1));
        else
            context['formattedReachedPoints'] = newPoints;
        var html = this.template(context);
        $(this.el).html(html);
    },

    initialize: function () {
        this.template = App.Templates.get('checked_item');
    }

});
