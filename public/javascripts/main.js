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
                "examiner_item",
                "examinerList",
                "menu_admin",
                "question_item",
                "question_list",
                "question_add",
                "question_view"
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