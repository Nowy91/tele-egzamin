App.Views.Dashboard = Backbone.View.extend({

    el: $('#content'),

    initialize: function () {
        this.template = App.Templates.get('dashboard');
        this.listenTo(Backbone, 'click-add-exam', function () {
            this.addExam();
        }, this);

        this.listenTo(Backbone, 'click-exams-list', function () {
            this.examsList();
        }, this);

        this.render();
    },

    render: function () {
        this.$el.html(_.template(this.template));

        this.menuView = new App.Views.Menu;
        this.menuView.selected = 'exams';
        this.menuView.setElement(this.$('.menu_hook')).render();

        var that = this;

        $.ajax({
            type: 'GET',
            url: '/exams',
            dataType: 'json',
            success: function (exams) {
                that.examCollection = new App.Collections.Exams(exams);
                that.examListView = new App.Views.ExamList({collection: that.examCollection});
                that.examListView.setElement(that.$('.body_hook')).render();
            }
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