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
                "exam_add",
                "exam_item",
                "exam_list",
                "examiner_item",
                "examinerList",
                "menu",
                "menu_admin"
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