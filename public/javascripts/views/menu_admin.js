App.Views.MenuAdmin = Backbone.View.extend({

    templateName: 'menu_admin',

    initialize: function () {
    },

    events: {
        'click a.examiners': 'examiners',
        'click a.add_examiner': 'addExaminer'
    },

    render: function () {
        var that = this;
        App.Templates.get(this.templateName, function (template) {
            that.$el.html(_.template(template, {menuId: that.selected}));
        });
        return this;
    },

    examiners: function() {

    },

    addExaminer: function() {

    }

});
