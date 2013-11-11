App.Views.ExamList = Backbone.View.extend({

    templateName: 'exam_list',

    initialize: function () {
        this.render();
    },

    render: function() {
        var that = this;
        App.Templates.get(this.templateName, function (template) {
            that.$el.html(_.template(template));

            $.ajax({
                type: 'GET',
                url: '/exams',
                dataType: 'json',
                success: function(exams) {
                    var collection = new App.Collections.Exams(exams);

                    collection.each(function(exam){
                        var examView = new App.Views.ExamItem({model: exam.toJSON()});
                        $('tbody').append(examView.el);
                    });
                }
            });
        });
    }

});