App.Views.Menu = Backbone.View.extend({

    templateName: 'menu',

    initialize: function () {
        this.render();
    },

    render: function () {
        var that = this;
        App.Templates.get(this.templateName, function (template) {
            that.$el.html(_.template(template, {menuId: '#aktualne'}));
            return that;
        });
    }

});
