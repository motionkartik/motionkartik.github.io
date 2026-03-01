(function ($) {
    'use strict';
    var form = $('.contact-form'),
        message = $('.messenger-box-contact__msg'),
        form_data;

    // const submit = document.getElementById("submit-form");
    // submit.addEventListener("click", validate);
    // function validate(e) {
    //     const message = document.getElementById('required-msg');

    //     const fullName = document.getElementById("full-name");
    //     const email = document.getElementById("email");
    //     const subject = document.getElementById("subject");
    //     let valid = true;

    //     if (!fullName.value || !email.value || !subject.value) {
    //         message.classList.add('show');
    //         fullName.classList.add("invalid");
    //     } else {
    //         message.classList.remove('show');
    //     }
        
    //     return valid;
    // }


    // Success function
    function done_func(response) {
        // Web3Forms returns JSON by default; try to read a message field, fall back to generic text
        var text = '';
        try {
            if (typeof response === 'object' && response !== null) {
                text = response.message || response.data || '';
            } else {
                // response may be a JSON string
                var obj = JSON.parse(response);
                text = obj.message || obj.data || response;
            }
        } catch (err) {
            text = response;
        }
        if (!text) {
            text = 'Your message was sent successfully.';
        }
        message.fadeIn().removeClass('alert-danger').addClass('alert-success');
        message.text(text);
        setTimeout(function () {
            message.fadeOut();
        }, 3000);
        form.find('input:not([type="submit"]), textarea').val('');
    }

    // fail function
    function fail_func(data) {
        message.fadeIn().removeClass('alert-success').addClass('alert-danger');
        // show error text if available
        var errText = 'An error occurred while sending the message.';
        if (data && data.responseJSON && data.responseJSON.message) {
            errText = data.responseJSON.message;
        } else if (data && data.responseText) {
            errText = data.responseText;
        }
        message.text(errText);
        setTimeout(function () {
            message.fadeOut();
        }, 3000);
    }
    
    form.submit(function (e) {
        e.preventDefault();

        const message = document.getElementById('required-msg');
        const fullName = document.getElementById("full-name");
        const email = document.getElementById("email");
        // ensure hidden subject reflects name
        var hiddenSubject = document.getElementById('hidden-subject');
        if (hiddenSubject) {
            var nameVal = fullName ? fullName.value.trim() : '';
            hiddenSubject.value = 'Website | ' + (nameVal || 'Anonymous');
        }

        if (!fullName.value || !email.value) {
            message.classList.add('show');
            fullName.classList.add("invalid");
            console.log('false');
            return false
        }
        message.classList.remove('show');

        form_data = $(this).serialize();
        $.ajax({
            type: 'POST',
            url: form.attr('action'),
            data: form_data
        })
        .done(done_func)
        .fail(fail_func);
    });
    
})(jQuery);