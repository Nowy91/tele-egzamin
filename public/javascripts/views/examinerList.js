    App.Views.ExaminerList = Backbone.View.extend({
        templateName: 'examinerList',
       render: function () {

            var that = this;

             App.Templates.get(this.templateName, function (template) {

             that.$el.html(_.template(template));
                 $.ajax({
                     type: 'GET',
                     url: '/examiners',
                     dataType: 'json',
                     success: function(examiners) {
                         var collection = new App.Collections.ExaminersCollection(examiners);
                         collection.each(function(examiner){
                             var examinerView = new App.Views.ExaminerItem({model: examiner.toJSON()});
                             $('tbody').append(examinerView.el);
                         });
                     }
                 });
             });

        }
    });
