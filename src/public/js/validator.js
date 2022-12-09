

function Validator(parameters) {
    var formElement = document.querySelector(parameters.form);
    if(formElement) {
        formElement.onsubmit = function(e) {
        e.preventDefault();
        

        parameters.rules.forEach(function (rule) {
            var inputElement = formElement.querySelector(rule.selector);
            validate(inputElement, rule);
        
        });
    }
    }

    // console.log(parameters.rules);
    var selectorRules = {};
    //Hàm thực hiện validate
    function validate(inputElement, rule){
        var errorMessage;
        var errorElement = inputElement.parentElement.querySelector('.form-message');
        
        var rules = selectorRules[rule.selector];

        for(var i = 0; i < rules.length; i++) {
            errorMessage = rules[i](inputElement.value);
            if(errorMessage) break;
        }

        if(errorMessage){
            errorElement.innerText = errorMessage;
            inputElement.parentElement.classList.add('invalid');
        }
        else{
            errorElement.innerText = '';
            inputElement.parentElement.classList.remove('invalid');
        }
    }

    if(formElement) {
        parameters.rules.forEach(function (rule) {
            //Lưu lại các rules cho mỗi input
            
            if(Array.isArray(selectorRules[rule.selector])) {
                selectorRules[rule.selector].push(rule.test);
            }
            else {
                selectorRules[rule.selector] = [rule.test];
            }
            // selectorRules[rule.selector] = rule.test;

            var inputElement = formElement.querySelector(rule.selector);

            if(inputElement) {
                // Xử lý trường hợp blur khỏi ô input
                inputElement.onblur = function() {
                    // console.log(inputElement.value);
                    validate(inputElement, rule);
                }

                // Xử lý trường hợp đang nhập
                inputElement.oninput = function(){
                    var errorElement = inputElement.parentElement.querySelector('.form-message');
                    errorElement.innerText = '';
                    inputElement.parentElement.classList.remove('invalid');

                }
            }
            // console.log(inputElement);
        });
        console.log(selectorRules);
    }
}
// Định nghĩa các rules:
// Nguyên tắc test function:
//1. Khi có lỗi --> trả ra message thông báo lỗi
//2. Khi hợp lệ --> trả ra undefined
Validator.isRequired = function(selector, message) {
    return {
        selector: selector,
        test: function (value) {
            return value.trim() ? undefined : message ||'Vui lòng nhập trường này !';
        }
    };
}

Validator.isEmail = function(selector, message) {
    return {
        selector: selector,
        test: function (value) {
            var regex =/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return regex.test(value) ? undefined : message || 'Email không hợp lệ !';
        }
    };
}


Validator.minLength = function(selector, min, message) {
    return {
        selector: selector,
        test: function (value) {
            return value.length >= min ? undefined : message || `Vui lòng nhập tối thiểu ${min} ký tự !`;
        }
    };
}
Validator.isConfirmed = function(selector, getConfirmValue, message) {
    return {
        selector: selector,
        test: function (value) {
            return value === getConfirmValue() ? undefined : message ||'Giá trị nhập vào không chính xác';
        }
    }

}