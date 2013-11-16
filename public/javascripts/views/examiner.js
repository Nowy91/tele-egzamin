App.Views.ExaminerItem = Backbone.View.extend({

    tagName: 'tr',

    initialize: function() {
        this.template = App.Templates.get('examiner_item');
        this.render();
    },

    render: function() {
        this.$el.html(_.template(this.template, this.model));
        return this;
    }

});