App.Views.ExamList = Backbone.View.extend({

    initialize: function () {
        this.template = App.Templates.get('exam_list');
        this.listenTo(this.collection, 'add', this.addExam);
    },

    render: function() {
        this.$el.html(_.template(this.template));

        this.collection.each(function(exam){
            var examView = new App.Views.ExamItem({model: exam.toJSON()});
            $('tbody').append(examView.el);
        });

        return this;
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