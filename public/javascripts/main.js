(function () {

    window.App = {
        Models: {},
        Collections: {},
        Controllers: {},
        Layouts: {},
        Views: {},
        Router: {},
        Templates: {
            names: [
                "login",
                "header",
                "dashboard",
                "dashboard_menu",
                "exam_add",
                "exam_item",
                "exam_list",
                "exam_view",
                "exam_menu",
                "exam_edit",
                "examiner_item",
                "examiner_list",
                "examiner_add",
                "examiner_view",
                "examiner_menu",
                "examiner_edit",
                "examiner_password",
                "menu_admin",
                "question_item",
                "question_list",
                "question_add",
                "question_view",
                "question_edit",
                "question_answer_item",
                "question_answer_list"
            ],
            templates: {},

            loadTemplates: function(callback) {

                var that = this;

                var loadTemplate = function(index) {
                    var name = that.names[index];

                    $.ajax({
                        url: '/javascripts/templates/' + name + '.html',
                        success: function(data) {
                            that.templates[name] = _.template($(data).html());
                            index++;
                            if (index < that.names.length) {
                                loadTemplate(index);
                            } else {
                                callback();
                            }
                        }
                    });
                }

                loadTemplate(0);
            },

            get: function(name) {
                return this.templates[name];
            }
        },

        init: function() {
            App.Templates.loadTemplates(function() {
                Teleegzam.start();
            });
        }
    }

})();