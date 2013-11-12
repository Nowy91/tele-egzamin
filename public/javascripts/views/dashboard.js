App.Views.Dashboard = Backbone.View.extend({

    el: $('#content'),
    templateName: 'dashboard',

    initialize: function () {
        this.listenTo(Backbone, 'click-add-exam', function () {
            this.addExam();
        }, this );

        this.listenTo(Backbone, 'click-exams-list', function () {
            this.examsList();
        }, this );
    },

    render: function () {
        var that = this;
        App.Templates.get(this.templateName, function (template) {
            that.$el.html(_.template(template));

            that.menu.setElement(that.$('.menu_hook')).render();
            that.body.setElement(that.$('.body_hook')).render();
        });
        return this;
    },

    examsList: function() {
        this.menu.selected = 'exams';
        this.menu.render();

        this.body = new App.Views.ExamList;
        this.body.setElement(this.$('.body_hook')).render();
    },

    addExam: function() {
        this.menu.selected = 'add_exam';
        this.menu.render();

        this.body = new App.Views.ExamAdd;
        this.body.setElement(this.$('.body_hook')).render();
    }

});