
$.fn.validate.text.pt_br = {
		date :   ("Está data não está em um formato valido"),
		time : ("Hora em formato invalido"),
		email : ("E-Mail inválido"),
		integer : "Neste campo somente números são aceitos",
		text: ("Este campo está vazio!"),
		money: "Moeda no formato incorreto",
		radiobox : "Selecione uma opção",
		checkbox : "Selecione uma opção",
		cpf : "CPF Inválido",
		cnpj : "CNPJ inválido",
		cep : "Cep inválido"
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
	$.fn.validate.isValidTime = function( inputObject ){		
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
		if( reTime[ inputObject.value ].test( $(inputObject.object).val().trim() ) )
		{
			$.fn.validate.message = $.fn.validate.options.language.time;
			return false;
		}
		else{
			return true;
		}
	};	
	
	$.fn.validate.isValidMoney = function( inputObject ){		
		
		/* O valor financeiro é uma simplificação do número decimal visto anteriormente, não permitindo sinal e exigindo sempre 2 casas decimais e separador de milhar obrigatório. 
		 * Separadores de decimal e milhar estão no formato em português: vírgula e ponto, respectivamente.*/
		
		reMoeda = /^\d{1,3}(\.\d{3})*\,\d{2}$/;
		if(! reMoeda.test( $(inputObject.object).val() ) ){
			$.fn.validate.message = $.fn.validate.options.language.money;
			return false;
		}else{
			return true;
		}
	};
	$.fn.validate.isValidCpf = function( inputObject ){
		
		$.fn.validate.message = $.fn.validate.options.language.cpf;
		
		value = $(inputObject.object).val(); 
		value = value.replace('.','');
		value = value.replace('.','');
		cpf = value.replace('-','');
		while(cpf.length < 11) cpf = "0"+ cpf;
		var expReg = /^0+$|^1+$|^2+$|^3+$|^4+$|^5+$|^6+$|^7+$|^8+$|^9+$/;
		var a = [];
		var b = new Number;
		var c = 11;
		for (i=0; i<11; i++){
			a[i] = cpf.charAt(i);
			if (i < 9) b += (a[i] * --c);
		}
		if ((x = b % 11) < 2) { a[9] = 0 } else { a[9] = 11-x }
		b = 0;
		c = 11;
		for (y=0; y<10; y++) b += (a[y] * c--);
		if ((x = b % 11) < 2) { a[10] = 0; } else { a[10] = 11-x; }
		if ((cpf.charAt(9) != a[9]) || (cpf.charAt(10) != a[10]) || cpf.match(expReg)) return false;
		return true;
		
		
	};
	$.fn.validate.isValidCnpj = function( inputObject ){
		
		alert( $.fn.validate.options.language.cnpj );
		
		$.fn.validate.message = $.fn.validate.options.language.cnpj;
		
		value = $(inputObject.object).val();
		cnpj = value.replace(/\D/g,"");
		while(cnpj.length < 14) cnpj = "0"+ cnpj;
		var expReg = /^0+$|^1+$|^2+$|^3+$|^4+$|^5+$|^6+$|^7+$|^8+$|^9+$/;
		var a = [];
		var b = new Number;
		var c = [6,5,4,3,2,9,8,7,6,5,4,3,2];

		for (i=0; i<12; i++){
		a[i] = cnpj.charAt(i);
		b += a[i] * c[i+1];
		}

		if ((x = b % 11) < 2) { a[12] = 0 } else { a[12] = 11-x }
		b = 0;
		for (y=0; y<13; y++) {
		b += (a[y] * c[y]);
		}

		if ((x = b % 11) < 2) { a[13] = 0; } else { a[13] = 11-x; }
		if ((cnpj.charAt(12) != a[12]) || (cnpj.charAt(13) != a[13]) || cnpj.match(expReg) ) return false;
		return true;
		
		
	};
	
	$.fn.validate.isValidCep = function(){
		
		// Caso o CEP não esteja nesse formato ele é inválido!
        var objER = /^[0-9]{2}\.[0-9]{3}-[0-9]{3}$/;
        
		if(! objER.test( $(inputObject.object).val() ) ){
			$.fn.validate.message = $.fn.validate.options.language.cep;
			return false;
		}else{
			return true;
		}
		
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
	
	
	
	