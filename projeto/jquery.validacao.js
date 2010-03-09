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
	$.fn.validate = function(  ){
		$.fn.validate.Load();	
	};	
	
	$.fn.validate.text = {};
	$.fn.validate.text.pt_br = {
		date : "Está data não está em um formato valido",
		time : "Hora em formato invalido",
		email : "E-Mail inválido",
		integer : "Neste campo somente números são aceitos",
		text: "Este campo está vazio!",
		money: "Moeda no formato incorreto",
		radiobox : "Selecione uma opção",
		checkbox : "Selecione uma opção"
	};
		
	/**
	 * 
	 * 
	 * AQUI É A IMPLEMENTAÇÃO DOS METODOS DE VALIDAÇÃO DOS CAMPOS
	 * 
	 * 
	 */
	$.fn.validate.isValidDate = function( inputObject ){		
		/*
		  Estas expressões regulares vão do mais simples ao mais completo, da seguinte forma:
			
			Simples - valida apenas o uso de dígitos, nas posições e quantidade certas: 1 a 2 dígitos para dia e para mês, 1 a 4 dígitos para ano.
			Média - testa os dígitos possíveis em cada posição: o primeiro dígito do dia, se houver, deve ser de 0 a 3 ([0-3]?\d); o primeiro dígito do mês, se houver, deve ser 0 ou 1 ([01]?\d); passamos a aceitar apenas 2 ou 4 dígitos para o ano.
			Avançada - garante as faixas de valores corretas para dias 1 a 31 ((0?[1-9]|[12]\d|3[01])) e meses 1 a 12 ((0?[1-9]|1[0-2])). E aqui optamos por forçar os 2 primeiros dígitos do ano (correspondentes ao século), quando fornecidos, a serem 19 ou 20 ((19|20)?\d{2}).
			Completa - valida os dias permitidos de acordo com o mês. Para este último, foram criados três grupos alternativos de pares dia/mês:
			Os dias 1 a 29 ((0?[1-9]|[12]\d)) são aceitos em todos os meses (1 a 12): (0?[1-9]|1[0-2])
			Dia 30 é válido em todos os meses, exceto fevereiro (02): (0?[13-9]|1[0-2])
			Dia 31 é permitido em janeiro (01), março (03), maio (05), julho (07), agosto (08), outubro (10) e dezembro (12): (0?[13578]|1[02]).
			Tradicional - data no formato DD/MM/AAAA, basicamente é a data Completa, porém sem a opcionalidade do zero à esquerda no dia ou mês menor que 10 e sem a opcionalidade e verificação de século no ano, aceitando qualquer seqüência de 4 dígitos (\d{4}) como ano.
		 */		
		var reDate = new Array();
		reDate[1] = /^\d{1,2}\/\d{1,2}\/\d{1,4}$/;
		reDate[2] = /^[0-3]?\d\/[01]?\d\/(\d{2}|\d{4})$/;
		reDate[3] = /^(0?[1-9]|[12]\d|3[01])\/(0?[1-9]|1[0-2])\/(19|20)?\d{2}$/;
		reDate[4] = /^((0?[1-9]|[12]\d)\/(0?[1-9]|1[0-2])|30\/(0?[13-9]|1[0-2])|31\/(0?[13578]|1[02]))\/(19|20)?\d{2}$/;
		reDate[5] = /^((0[1-9]|[12]\d)\/(0[1-9]|1[0-2])|30\/(0[13-9]|1[0-2])|31\/(0[13578]|1[02]))\/\d{4}$/;
		
		if( !reDate[ inputObject.value ].test( $(inputObject.object).val() ) ){
			$.fn.validate.message = $.fn.validate.options.language.date;
			return false;
		}else{
			return true;
		}
	};
	$.fn.validate.isValidInteger = function( inputObject ){		
		/*
		  Existe uma seqüência de expressão regular que significa um dígito (0 a 9): \d. Adicionando um + após essa seqüência, significa "uma ou mais ocorrências da seqüência precedente". Isto é, um ou mais dígitos. Note que isso implica o preenchimento obrigatório; é melhor que o caso do campo não preenchido (vazio) seja tratado à parte. Assim, temos a expressão regular completa para validar u
		 */
		reDigits = /^\d+$/;
		if( !reDigits.test( $(inputObject.object).val().trim() ) ){			
			$.fn.validate.message = $.fn.validate.options.language.integer;
			return false;
		}else{
			return true;
		}
	};
	$.fn.validate.isValidEmail = function( inputObject ){		
		/*
		  A principal especificação para regras endereço de correio eletrônico (e-mail) é o padrão Internet RFC 2822: Internet Message Format, seção 3.4.1 sobre especificação de endereços. Basicamente, o endereço segue a forma nome-local@domínio, onde nome-local especifica o usuário, e domínio especifica o seu endereço ou servidor.
		  As regras de nome-local são definidas de forma muito ampla na RFC 2822 e portanto são bastante dependentes de restrições específicas adotadas por cada servidor de domínio e tecnologia implementada. Pela especificação, um nome pode ser uma ou mais "palavras atômicas" sem espaço, contendo caracteres dentre letras (maiúsculas/minúsculas), dígitos (0-9) e os símbolos ! # $ % & ' * + - / = ? ^ ` { | } ~; as palavras são separadas entre si por ponto (.).
		Nos exemplos de expressão regular acima, temos:
			
		1	Livre - ReEmail1 aceita nome-local com todos os caracteres permitidos na RFC 2822: [\w!#$%&'*+/=?^`{|}~-]; e o domínio tem definição bem livre, por nome basicamente fixando apenas que o TLD deve ter entre 2 e 6 caracteres: [A-Za-z]{2,6}; ou por número IP entre colchetes: \[\d{1,3}(\.\d{1,3}){3}\].
		2	Compacto - ReEmail2 limita os caracteres permitidos no nome-local de forma mais compacta e restritiva, porém cobre os casos mais comuns. Aceita como nome-local uma ou mais palavras separadas por ponto ([\w-]+(\.[\w-]+)*), onde cada palavra é definida por [\w-]+ permitindo assim letra, dígito, sublinhado e hífen. Também limita o tamanho de nomes de domínio entre 2 e 63 caracteres apenas com letras, dígitos, sublinhado e hífen: [\w-]{2,63}.
		3	Restrito - ReEmail3 é uma variação da ReEmail2, mas força nomes de domínio entre 2 e 63 caracteres, deixa de usar a seqüência \w para não permitir o sublinhado e garante que não há hífen nem na primeira nem na última posição, conforme RFC 1034/1035. O resultado é o seguinte para representar um nome de domínio: [A-Za-z\d][A-Za-z\d-]{0,61}[A-Za-z\d].

		*/
		var reEmail = new Array();
		reEmail[1] = /^[\w!#$%&'*+\/=?^`{|}~-]+(\.[\w!#$%&'*+\/=?^`{|}~-]+)*@(([\w-]+\.)+[A-Za-z]{2,6}|\[\d{1,3}(\.\d{1,3}){3}\])$/;
		reEmail[2] = /^[\w-]+(\.[\w-]+)*@(([\w-]{2,63}\.)+[A-Za-z]{2,6}|\[\d{1,3}(\.\d{1,3}){3}\])$/;
		reEmail[3] = /^[\w-]+(\.[\w-]+)*@(([A-Za-z\d][A-Za-z\d-]{0,61}[A-Za-z\d]\.)+[A-Za-z]{2,6}|\[\d{1,3}(\.\d{1,3}){3}\])$/;		
		if( !reEmail[ inputObject.value ].test( $(inputObject.object).val().trim() )){
			$.fn.validate.message = $.fn.validate.options.language.email;
			return false;
		}else{
			return true;
		}
	};
	$.fn.validate.isValidTempo = function( inputObject ){		
		/*
	     Horário HH:MM simples - aceita dois pares de dois dígitos separados por dois-pontos (:); pode ser usado para hora:minutos ou ainda para minutos:segundos, porém não valida as faixas de valor válidos para os dígitos, aceitando assim qualquer valor entre 00 e 99.
		 Horário HH:MM 24h - aceita horas na faixa 00-23 e minutos 00-59, separados por dois-pontos.
		 Horário HH:MM 12h - aceita horas na faixa 01-12 e minutos 00-59, separados por dois-pontos.
		 Tempo horas:MM:SS - aceita qualquer quantidade de horas (0 ou mais, um ou mais dígitos), minutos 00-59 e segundos 00-59, todos separados por dois-pontos.
		 Tempo horas:MM:SS.mili - similar ao anterior, porém inclui 3 dígitos finais para milisegundos 000-999, separados dos anteriores por ponto (.).
		*/
		var reTime = new Array();
		reTime[1] = /^\d{2}:\d{2}$/;
		reTime[2] = /^([0-1]\d|2[0-3]):[0-5]\d$/;
		reTime[3] = /^(0[1-9]|1[0-2]):[0-5]\d$/;
		reTime[4] = /^\d+:[0-5]\d:[0-5]\d$/;
		reTime[5] = /^\d+:[0-5]\d:[0-5]\.\d{3}\d$/;
		if( reTime[ inputObject.value ].test( $(inputObject.object).val() ) )
		{
			$.fn.validate.message = $.fn.validate.options.language.time;
			return false;
		}else{
			return true;
		}
	};	
	
	$.fn.validate.isValidMoeda = function( inputObject ){		
		/* O valor financeiro é uma simplificação do número decimal visto anteriormente, não permitindo sinal e exigindo sempre 2 casas decimais e separador de milhar obrigatório. Separadores de decimal e milhar estão no formato em português: vírgula e ponto, respectivamente.*/
		reMoeda = /^\d{1,3}(\.\d{3})*\,\d{2}$/;
		if(! reMoeda.test( $(inputObject.object).val() ) ){
			$.fn.validate.message = $.fn.validate.options.language.money;
			return false;
		}else{
			return true;
		}
	};
	$.fn.validate.isValidCpf = function( inputObject ){
		alert('desenvolvimento');
	};
	$.fn.validate.isValidCnpj = function( inputObject ){
		alert('desenvolvimento');
	};
	$.fn.validate.isValidText = function( inputObject ){
		if( !( $(inputObject.object).val() != "" ) ){
			$.fn.validate.message = $.fn.validate.options.language.text;
			return false;
		}else{
			return true;
		}
	};
	$.fn.validate.isValidRadiobox = function( inputObject ){		
		if( !( $("input[name="+inputObject.object.name+"]").is(":checked")  ) )
		{
			$.fn.validate.message = $.fn.validate.options.language.radiobox;
			return false;
		}
		else{
			return true;
		}
	};
	
	$.fn.validate.isValidCheckbox = function( inputObject ){		
		if( !( $("input[name="+inputObject.object.name+"]").is(":checked")  ) )
		{
			$.fn.validate.message = $.fn.validate.options.language.radiobox;
			return false;
		}
		else{
			return true;
		}
	};
	
	/**
	 *  
	 *  Opcoes do plugin
	 *  
	 *  
	 */	
	$.fn.validate.options = {
			namespace_url: "http://validate.com",
			namespace_validate: "validate",
			namespace_mask: "mask",
			required : [
				{ns : ":date" , callback : $.fn.validate.isValidDate },
				{ns: ":integer" , callback : $.fn.validate.isValidInteger },
				{ns: ":text" , callback : $.fn.validate.isValidText },
				{ns: ":cpf"  , callback : $.fn.validate.isValidCpf },
				{ns: ":cnpj" , callback : $.fn.validate.isValidCnpj },
				{ns: ":email" , callback : $.fn.validate.isValidEmail },
				{ns: ":time" , callback : $.fn.validate.isValidTempo },
				{ns: ":money-pt-br" , callback : $.fn.validate.isValidMoeda },
				{ns: ":radiobox" , callback : $.fn.validate.isValidRadiobox },
				{ns: ":checkbox" , callback: $.fn.validate.isValidCheckbox }
			],
			mask : [
			    {ns: ":date"},
			    {ns: ":cpf"},
			    {ns: ":cnpj"}
			],
			language: $.fn.validate.text.pt_br
	};
	
	// abrigo para os objetos formData
	$.fn.validate.elements = [];
	
	// mensagem do plugin para ser exibida pela funcao notifica
	$.fn.validate.message = "";
	
	/**
	 *  carrega os campos que deverao ser validados
	 *  gera um array de objetos complexo
	 */
	$.fn.validate.Load = function(){
		
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
			
			$.fn.validate.elements.push( objTemp );
			
		});
		
		$.fn.validate.notifica = function( input ){
			
			$(input.object).addClass("input-invalid-information");
			input.object.focus();
			alert($.fn.validate.message);
			
		};
		
		$.fn.validate.validateSubmit = function( form ){
			// varre os formularios carregados
			for( i in $.fn.validate.elements  ){
				oForm = $.fn.validate.elements[i];
				// verifica se o formulario que acionou o evento
				if( oForm.formNS == $(form).attr("validate:form") ){
					// varre os campos para validar
					for( i in oForm.formInputValidate )
					{
						oInput = oForm.formInputValidate[i];
						/// aplica a funcao de validacao
						if( oInput.type.callback( oInput )  == false ){							
							$.fn.validate.notifica( oInput );					
							return false;
						}
					}					
				}				
			}
		};
		
	};
	
})(jQuery);

