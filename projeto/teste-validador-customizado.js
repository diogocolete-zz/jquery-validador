
var testCustomFunction = function( object ){	
	return true;
}

$.fn.validate.isValidDate = testCustomFunction;
$.fn.validate.isValidInteger = testCustomFunction;
$.fn.validate.isValidText = testCustomFunction;
$.fn.validate.isValidCpf  = testCustomFunction;
$.fn.validate.isValidCnpj = testCustomFunction;
$.fn.validate.isValidEmail = testCustomFunction;
$.fn.validate.isValidTime = testCustomFunction;
$.fn.validate.isValidMoney = testCustomFunction;
$.fn.validate.isValidRadiobox = testCustomFunction;
$.fn.validate.isValidCheckbox = testCustomFunction;
