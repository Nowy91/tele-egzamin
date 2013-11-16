App.Views.ExaminerList = Backbone.View.extend({

    initialize: function() {
        this.template = App.Templates.get('examinerList');
    },

    render: function () {
        this.$el.html(_.template(this.template));

        $.ajax({
            type: 'GET',
            url: '/examiners',
            dataType: 'json',
            success: function (examiners) {
                var collection = new App.Collections.ExaminersCollection(examiners);
                collection.each(function (examiner) {
                    var examinerView = new App.Views.ExaminerItem({model: examiner.toJSON()});
                    $('tbody').append(examinerView.el);
                });
            }
        });
    }
});
