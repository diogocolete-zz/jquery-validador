$(document).ready(function(){
	
	// dados para testar
	var values_test_data = new Array("fulano@gmail.com","fulano#gmail.com"," fulano@gmail.com.br "," www.fulano@gmail.com ","www.fulano.com.br","@gmail.com","fulano@","fulano@gmail","fulano@br","fulano @gmail.com","_fulano@gmail.com");
	var values_test_data_option = new Array(1,2,3); 
	/*
	1	Livre - ReEmail1 aceita nome-local com todos os caracteres permitidos na RFC 2822: [\w!#$%&'*+/=?^`{|}~-]; e o dom�nio tem defini��o bem livre, por nome basicamente fixando apenas que o TLD deve ter entre 2 e 6 caracteres: [A-Za-z]{2,6}; ou por n�mero IP entre colchetes: \[\d{1,3}(\.\d{1,3}){3}\].
	2	Compacto - ReEmail2 limita os caracteres permitidos no nome-local de forma mais compacta e restritiva, por�m cobre os casos mais comuns. Aceita como nome-local uma ou mais palavras separadas por ponto ([\w-]+(\.[\w-]+)*), onde cada palavra � definida por [\w-]+ permitindo assim letra, d�gito, sublinhado e h�fen. Tamb�m limita o tamanho de nomes de dom�nio entre 2 e 63 caracteres apenas com letras, d�gitos, sublinhado e h�fen: [\w-]{2,63}.
	3	Restrito - ReEmail3 � uma varia��o da ReEmail2, mas for�a nomes de dom�nio entre 2 e 63 caracteres, deixa de usar a seq��ncia \w para n�o permitir o sublinhado e garante que n�o h� h�fen nem na primeira nem na �ltima posi��o, conforme RFC 1034/1035. O resultado � o seguinte para representar um nome de dom�nio: [A-Za-z\d][A-Za-z\d-]{0,61}[A-Za-z\d].
	*/	
	
	
	var objectValidate = $.fn.validate;	
	
	var objectDataTest = function( object , option ){
		this.object = new Object();
		this.object = object;
		this.value = option;
	};
	
	$("#area_teste").append("Testando Emails<br>");
	for( test in values_test_data )
	{
		for( option in values_test_data_option ){
			
			gerador_id = new Date().getMilliseconds();
			
			$("#area_teste").append("<input type='text' id='campo_"+gerador_id+"' name='"+values_test_data[test]+"' value='"+values_test_data[test]+"' />");
			
			var DataTest = new objectDataTest( $( "#campo_"+gerador_id).get() , values_test_data_option[option] );
			
			if( objectValidate.isValidEmail( DataTest ) ){
				$("#area_teste").append("<span style='color:blue'> Parametro: "+values_test_data_option[option]+" Campo v�lido</span><br /> ");
			}else{
				$("#area_teste").append("<span style='color:red'>Parametro: "+values_test_data_option[option]+" Campo inv�lido</span><br /> ");
			}
		}
	}
	$("#area_teste").append("<br><br>");
});