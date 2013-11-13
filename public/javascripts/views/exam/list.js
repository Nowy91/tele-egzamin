App.Views.ExamList = Backbone.View.extend({

    templateName: 'exam_list',

    initialize: function () {
        this.listenTo(this.collection, 'add', this.addExam);
    },

    render: function() {
        var that = this;
        App.Templates.get(this.templateName, function (template) {
            that.$el.html(_.template(template));

            that.collection.each(function(exam){
                var examView = new App.Views.ExamItem({model: exam.toJSON()});
                $('tbody').append(examView.el);
            });
        });
    },

    addExam: function(data) {
        var that = this;
        $.ajax({
            type: 'POST',
            url: '/exam/add',
            data: data.toJSON(),
            success: function() {
                that.render();
            }
        });
    }

});