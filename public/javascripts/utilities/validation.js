Teleegzam.module('Validator', function (Validator, Teleegzam, Backbone, Marionette, $, _) {

    Validator.Form = {

        messages: function (inputs) {

            delete inputs['isValid'];

            // Czyszczenie wszystkich etykiet z błędami
            _.each($('input, textarea'), function (input) {

                $(input).parent().removeClass('has-error');
                if ($(input).next().is('label')) {
                    $(input).next().remove();
                }
            });

            // Iteracja po wszystkich otrzymanych input'ach z błędami
            _.each(inputs, function (messages, key) {

                var $label = $("<label></label>").addClass('control-label');
                var $input = $('input#' + key);
                var $textarea = $('textarea#' + key);

                // Iteracja po wszystkich otrzymanych błędach w ramach jednego input'a
                _.each(messages, function (message) {

                    $input.parent().addClass('has-error');
                    $input.after($label.attr('for', key).text(message));
                    $textarea.parent().addClass('has-error');
                    $textarea.after($label.attr('for', key).text(message));
                });
            });

            if (inputs.alert !== undefined) {
                $.notify(inputs.alert);
            }
        }
    }

});