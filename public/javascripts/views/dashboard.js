App.Views.Dashboard = Backbone.View.extend({

    el: $('#content'),
    templateName: 'dashboard',

    initialize: function () {
        this.listenTo(Backbone, 'click-add-exam', function () {
            this.addExam();
        }, this);

        this.listenTo(Backbone, 'click-exams-list', function () {
            this.examsList();
        }, this);

        this.render();
    },

    render: function () {
        var that = this;
        App.Templates.get(this.templateName, function (template) {
            that.$el.html(_.template(template));

            that.menuView = new App.Views.Menu;
            that.menuView.selected = 'exams';
            that.menuView.setElement(that.$('.menu_hook')).render();

            $.ajax({
                type: 'GET',
                url: '/exams',
                dataType: 'json',
                success: function(exams) {
                    that.examCollection = new App.Collections.Exams(exams);
                    that.examListView = new App.Views.ExamList({collection: that.examCollection});
                    that.examListView.setElement(that.$('.body_hook')).render();
                }
            });
        });
        return this;
    },

    examsList: function () {
        this.menuView.selected = 'exams';
        this.menuView.render();

        if (this.examListView == null) {
            this.examListView = new App.Views.ExamList;
            this.examListView.setElement(this.$('.body_hook'));
        }

        this.examListView.render();
    },

    addExam: function () {
        this.menuView.selected = 'add_exam';
        this.menuView.render();

        if (this.examAddView == null) {
            this.examAddView = new App.Views.ExamAdd({collection: this.examCollection});
            this.examAddView.setElement(this.$('.body_hook'));
        }

        this.examAddView.render();
    }

});