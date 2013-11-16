App.Views.Index = Backbone.View.extend({

    el: $("#content"),

    initialize: function () {
        this.template = App.Templates.get('index');
        this.render();
    },

    render: function () {
        this.$el.html(_.template(this.template));
        return this;
    }

});