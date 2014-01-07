(function () {

    window.App = {
        Models: {},
        Collections: {},
        Controllers: {},
        Layouts: {},
        Views: {},
        Router: {},
        Socket: {},
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
                "exam_execute",
                "exam_grade_item",
                "exam_grade_list",
                "exam_grade_input",
                "exam_grade_edit",
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
                "question_answer_list",
                "question_answer_input",
                "question_answer_edit",
                "token_list",
                "token_item",
                "student_start",
                "student_question",
                "student_exam",
                "student_layout",
                "student_open_answer",
                "student_check_answer",
                "student_check_answer_list",
                "student_image_answer",
                "student_upload",
                "student_upload_list",
                "check_item",
                "check_list",
                "check_question_item",
                "check_question_list",
                "check_answer_list",
                "check_answer_item",
                "checked_item",
                "checked_list"
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

        socketConnection: function() {
            if (Object.keys(this.Socket).length === 0) {
                this.Socket = io.connect();
            }
            else {
                this.Socket.socket.connect();
            }
        },

        init: function(callback) {
            (function ($) {
                $.whenDone = function (options, callback) {
                    $.when(options).done(function(data) {

                        if (options.resonseJSON === undefined) {
                            callback(data);
                        }
                        else {
                            if (options.responseJSON.status !== undefined
                                && options.responseJSON.status === 'unathorized') {
                                Teleegzam.Router.navigate('/', {trigger: true});
                            }
                            else {
                                callback(data);
                            }
                        }

                    });
                }
            })(jQuery);

            App.Templates.loadTemplates(function() {
                Teleegzam.start();

                if (callback) {
                    callback();
                }
            });
        }
    }

})();