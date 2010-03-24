(function($){
	
	/**
	 * 
	 * objeto formData e um molde de objeto para ser tratado pelo plugin
	 * dentro dos campos formInputValidate e formInputMask existe um array com os objetos no seguinte formato
	 * {
	 * value: attr,
	 * type: maskTxt,
	 * namespace: namespace_mask,
	 * object: inputObject
	 * }
	 * 
	 * AS REFERENCIAS DE EXPRESSOES REGULARES FORAM TIRADAS PARTE DO SITE	 * 
	 *  http://www.mhavila.com.br/topicos/web/valform.html
	 * 
	 * 
	 */ 
	formData = function(){
		this.formNS = "";
		this.formObject = {};
		this.formInputValidate = [];
		this.formInputMask = [];		
	};
	/**
	 * 
	 *  Construtor ele chama o metodo load para iniciar os formularios
	 *  
	 */
	$.fn.validate = function( callback_form_invalid ){
		$.fn.validate.Load();
		$.fn.validate.checkFormValid = callback_form_invalid;
	};
	
	// textos da validacao
	$.fn.validate.text = {};
	
	
	
	// abrigo para os objetos formData
	$.fn.validate.elements = [];
	
	// mensagem do plugin para ser exibida pela funcao notifica
	$.fn.validate.message = "";
	
	// opcoes do sistema
	$.fn.validate.options = {};
	
	// pasta com as bibliotecas e definicoes para validacao
	$.fn.validate.jslib = "jslib/";
	
	// linguage
	$.fn.validate.language = "pt-br";
	
	/**
	 *  carrega os campos que deverao ser validados
	 *  gera um array de objetos complexo
	 */
	$.fn.validate.Load = function(){
		
		base = $.fn.validate.jslib;
		var load = [];
		load.push( base + "jquery.maskedinput-1.2.2.js" );
		load.push( base + "jquery.maskMoney.0.2.js" );
		load.push( base + "jquery.validacao.definicao-"+$.fn.validate.language+".js" );
		load.push( base + "jquery.mask."+$.fn.validate.language+".js" );
		$().ImportArray(load);
		
		/** 
		 * 
		 *  Opcoes do plugin
		 *  
		 */	
		$.fn.validate.options = {
				namespace_url: "http://validate.com",
				namespace_validate: "validate",
				namespace_mask: "mask",
				required : [
					{ns : ":date" , callback : $.fn.validate.isValidDate  },
					{ns: ":integer" , callback : $.fn.validate.isValidInteger },
					{ns: ":text" , callback : $.fn.validate.isValidText   },
					{ns: ":cpf"  , callback : $.fn.validate.isValidCpf    },
					{ns: ":cnpj" , callback : $.fn.validate.isValidCnpj   },
					{ns: ":email" , callback : $.fn.validate.isValidEmail },
					{ns: ":time" , callback : $.fn.validate.isValidTime   },
					{ns: ":money-pt-br" , callback : $.fn.validate.isValidMoney },
					{ns: ":radiobox" , callback : $.fn.validate.isValidRadiobox },
					{ns: ":checkbox" , callback: $.fn.validate.isValidCheckbox }
				],
				mask : [
				    {ns: ":date" , definition : $.fn.validate.mask.date },
				    {ns: ":cpf" , definition : $.fn.validate.mask.cpf },
				    {ns: ":cnpj" , definition : $.fn.validate.mask.cnpj },
				    {ns: ":phone" , definition : $.fn.validate.mask.phone },
				    {ns: ":money" , definition : $.fn.validate.mask.money }
				],
				language: $.fn.validate.text.pt_br
		};
				
		// espaco para nomes de validacao
		namespace = $.fn.validate.options.namespace_url;
		namespace_validate = $.fn.validate.options.namespace_validate;
		namespace_mask = $.fn.validate.options.namespace_mask;
		
		$("html").attr("xmlns:"+namespace_validate , namespace );
		$("html").attr("xmlns:"+namespace_mask , namespace );
		
		$("form").each(function( i , formObject ){
			
			// verifica se é para validar o formulario
			if( $(formObject).attr("validate:form") == ""){
				continue;
			}
			
			objTemp =  new formData();
			objTemp.formObject = formObject;
			objTemp.formNS = $(formObject).attr("validate:form");
			
			// busca os campos para carregar
			$(formObject).find("input,select,textarea").each(function( x , inputObject ){				
				// verifica se o campo e para ser validado
				$.each( $.fn.validate.options.required , function( reqx , requiredTxt ){					
					attr = $(inputObject).attr( namespace_validate + requiredTxt.ns );
					
					if(attr != "" && attr != undefined ){
						
						objTemp.formInputValidate.push({
							value: attr,
							type: requiredTxt,
							namespace: namespace_validate,
							object: inputObject
						});
						
					}
				});
				
				// verifica se o campo e para ser mascarado
				$.each( $.fn.validate.options.mask , function( masx , maskTxt ){					
					attr = $(inputObject).attr( namespace_mask + maskTxt.ns );					
					if(attr != "" && attr != undefined ){
						objTemp.formInputMask.push({
							value: attr,
							type: maskTxt,
							namespace: namespace_mask,
							object: inputObject
						});
					}
				});				
				
				
			});
			
			$(objTemp.formObject).bind("submit",function(){				
				return $.fn.validate.validateSubmit( this );
			});
			
			$.fn.validate.elements.push( objTemp ); // adiciona o objeto a lista de formularios			
			$.fn.validate.mask.Load( objTemp ); // carrega as mascaras do formulario
			
		});
		
		$.fn.validate.notifica = function( input ){			
			$(input.object).addClass("input-invalid-information");
			input.object.focus();
			alert( $.fn.validate.message );
		};
		
		$.fn.validate.checkFormValid = function( oForm ){
			return true;
		};
		
		$.fn.validate.validateSubmit = function( form ){
			
			// varre os formularios carregados
			for( i in $.fn.validate.elements  ){
				oForm = $.fn.validate.elements[i];
				// verifica se o formulario que acionou o evento
				if( oForm.formNS == $(form).attr("validate:form") ){
					
					// varre os campos para validar
					for( i in oForm.formInputValidate ){
						
						oInput = oForm.formInputValidate[i];
						
						// aplica a funcao de validacao
						if( oInput.type.callback( oInput )  == false ){
							$.fn.validate.notifica( oInput );
							return false;
						}
						
					}					
					return $.fn.validate.checkFormValid( oForm );					
				}
			}
			
		};
		
	};
	
})(jQuery);

