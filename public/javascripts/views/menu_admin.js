App.Views.MenuAdmin = Backbone.View.extend({

    initialize: function () {
        this.template = App.Templates.get('menu_admin');
    },

    events: {
        'click a.examiners': 'examiners',
        'click a.add_examiner': 'addExaminer'
    },

    render: function () {
        this.$el.html(_.template(this.template, {menuId: this.selected}));
        return this;
    },

    examiners: function() {

    },

    addExaminer: function() {

    }

});
