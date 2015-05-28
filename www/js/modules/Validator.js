/**
 * @jsx React.DOM
 requires: jquery
 */
define(["React", "jquery"], function(React, $) {
    return {
        NOT_EMPTY: 1,
        IS_NUMBER: 2,
        errors: function(val, fieldLabel, validationByte){
            var result = [];
            if((validationByte & this.NOT_EMPTY) && this.isEmpty(val)){
                result.push(fieldLabel + ' can not be empty.');
            }else{
                var val = $.trim(val);
                if((validationByte & this.IS_NUMBER) && !this.isNumber(val)){
                    result.push(fieldLabel + 'should be a number.');
                }
            }
            return result;
        },
        isEmpty: function(val) {
            return $.trim(val) === '';
        },
        isNumber: function(val) {
            var trimmed = $.trim(val);
            return  trimmed === Number(trimmed).toString();
        }
    };
});