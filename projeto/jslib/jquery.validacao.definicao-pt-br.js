
$.fn.validate.text.pt_br = {
		date :   ("Est� data n�o est� em um formato valido"),
		time : ("Hora em formato invalido"),
		email : ("E-Mail inv�lido"),
		integer : "Neste campo somente n�meros s�o aceitos",
		text: ("Este campo est� vazio!"),
		money: "Moeda no formato incorreto",
		radiobox : "Selecione uma op��o",
		checkbox : "Selecione uma op��o",
		cpf : "CPF Inv�lido",
		cnpj : "CNPJ inv�lido",
		cep : "Cep inv�lido"
	};	

	/**
	 * 
	 * 
	 * AQUI � A IMPLEMENTA��O DOS METODOS DE VALIDA��O DOS CAMPOS
	 * 
	 * 
	 */
	$.fn.validate.isValidDate = function( inputObject ){		
		/*
		  Estas express�es regulares v�o do mais simples ao mais completo, da seguinte forma:
			
			Simples - valida apenas o uso de d�gitos, nas posi��es e quantidade certas: 1 a 2 d�gitos para dia e para m�s, 1 a 4 d�gitos para ano.
			M�dia - testa os d�gitos poss�veis em cada posi��o: o primeiro d�gito do dia, se houver, deve ser de 0 a 3 ([0-3]?\d); o primeiro d�gito do m�s, se houver, deve ser 0 ou 1 ([01]?\d); passamos a aceitar apenas 2 ou 4 d�gitos para o ano.
			Avan�ada - garante as faixas de valores corretas para dias 1 a 31 ((0?[1-9]|[12]\d|3[01])) e meses 1 a 12 ((0?[1-9]|1[0-2])). E aqui optamos por for�ar os 2 primeiros d�gitos do ano (correspondentes ao s�culo), quando fornecidos, a serem 19 ou 20 ((19|20)?\d{2}).
			Completa - valida os dias permitidos de acordo com o m�s. Para este �ltimo, foram criados tr�s grupos alternativos de pares dia/m�s:
			Os dias 1 a 29 ((0?[1-9]|[12]\d)) s�o aceitos em todos os meses (1 a 12): (0?[1-9]|1[0-2])
			Dia 30 � v�lido em todos os meses, exceto fevereiro (02): (0?[13-9]|1[0-2])
			Dia 31 � permitido em janeiro (01), mar�o (03), maio (05), julho (07), agosto (08), outubro (10) e dezembro (12): (0?[13578]|1[02]).
			Tradicional - data no formato DD/MM/AAAA, basicamente � a data Completa, por�m sem a opcionalidade do zero � esquerda no dia ou m�s menor que 10 e sem a opcionalidade e verifica��o de s�culo no ano, aceitando qualquer seq��ncia de 4 d�gitos (\d{4}) como ano.
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
		  Existe uma seq��ncia de express�o regular que significa um d�gito (0 a 9): \d. Adicionando um + ap�s essa seq��ncia, significa "uma ou mais ocorr�ncias da seq��ncia precedente". Isto �, um ou mais d�gitos. Note que isso implica o preenchimento obrigat�rio; � melhor que o caso do campo n�o preenchido (vazio) seja tratado � parte. Assim, temos a express�o regular completa para validar u
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
		  A principal especifica��o para regras endere�o de correio eletr�nico (e-mail) � o padr�o Internet RFC 2822: Internet Message Format, se��o 3.4.1 sobre especifica��o de endere�os. Basicamente, o endere�o segue a forma nome-local@dom�nio, onde nome-local especifica o usu�rio, e dom�nio especifica o seu endere�o ou servidor.
		  As regras de nome-local s�o definidas de forma muito ampla na RFC 2822 e portanto s�o bastante dependentes de restri��es espec�ficas adotadas por cada servidor de dom�nio e tecnologia implementada. Pela especifica��o, um nome pode ser uma ou mais "palavras at�micas" sem espa�o, contendo caracteres dentre letras (mai�sculas/min�sculas), d�gitos (0-9) e os s�mbolos ! # $ % & ' * + - / = ? ^ ` { | } ~; as palavras s�o separadas entre si por ponto (.).
		Nos exemplos de express�o regular acima, temos:			
		1	Livre - ReEmail1 aceita nome-local com todos os caracteres permitidos na RFC 2822: [\w!#$%&'*+/=?^`{|}~-]; e o dom�nio tem defini��o bem livre, por nome basicamente fixando apenas que o TLD deve ter entre 2 e 6 caracteres: [A-Za-z]{2,6}; ou por n�mero IP entre colchetes: \[\d{1,3}(\.\d{1,3}){3}\].
		2	Compacto - ReEmail2 limita os caracteres permitidos no nome-local de forma mais compacta e restritiva, por�m cobre os casos mais comuns. Aceita como nome-local uma ou mais palavras separadas por ponto ([\w-]+(\.[\w-]+)*), onde cada palavra � definida por [\w-]+ permitindo assim letra, d�gito, sublinhado e h�fen. Tamb�m limita o tamanho de nomes de dom�nio entre 2 e 63 caracteres apenas com letras, d�gitos, sublinhado e h�fen: [\w-]{2,63}.
		3	Restrito - ReEmail3 � uma varia��o da ReEmail2, mas for�a nomes de dom�nio entre 2 e 63 caracteres, deixa de usar a seq��ncia \w para n�o permitir o sublinhado e garante que n�o h� h�fen nem na primeira nem na �ltima posi��o, conforme RFC 1034/1035. O resultado � o seguinte para representar um nome de dom�nio: [A-Za-z\d][A-Za-z\d-]{0,61}[A-Za-z\d].
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
	     Hor�rio HH:MM simples - aceita dois pares de dois d�gitos separados por dois-pontos (:); pode ser usado para hora:minutos ou ainda para minutos:segundos, por�m n�o valida as faixas de valor v�lidos para os d�gitos, aceitando assim qualquer valor entre 00 e 99.
		 Hor�rio HH:MM 24h - aceita horas na faixa 00-23 e minutos 00-59, separados por dois-pontos.
		 Hor�rio HH:MM 12h - aceita horas na faixa 01-12 e minutos 00-59, separados por dois-pontos.
		 Tempo horas:MM:SS - aceita qualquer quantidade de horas (0 ou mais, um ou mais d�gitos), minutos 00-59 e segundos 00-59, todos separados por dois-pontos.
		 Tempo horas:MM:SS.mili - similar ao anterior, por�m inclui 3 d�gitos finais para milisegundos 000-999, separados dos anteriores por ponto (.).
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
		
		/* O valor financeiro � uma simplifica��o do n�mero decimal visto anteriormente, n�o permitindo sinal e exigindo sempre 2 casas decimais e separador de milhar obrigat�rio. 
		 * Separadores de decimal e milhar est�o no formato em portugu�s: v�rgula e ponto, respectivamente.*/
		
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
		
		// Caso o CEP n�o esteja nesse formato ele � inv�lido!
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
	
	
	
	