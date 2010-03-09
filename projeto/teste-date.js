$(document).ready(function(){
	
	// dados para testar
	var values_test_data = new Array("01/01/2010","01-01-2010","2010-01-01","2010/01/01","");
	var values_test_data_option = new Array(1,2,3,4,5); 
	/**
	    1	Simples - valida apenas o uso de d�gitos, nas posi��es e quantidade certas: 1 a 2 d�gitos para dia e para m�s, 1 a 4 d�gitos para ano.
		
		2	M�dia - testa os d�gitos poss�veis em cada posi��o: o primeiro d�gito do dia, se houver, deve ser de 0 a 3 ([0-3]?\d); o primeiro d�gito do m�s, se houver, deve ser 0 ou 1 ([01]?\d); passamos a aceitar apenas 2 ou 4 d�gitos para o ano.
		
		3	Avan�ada - garante as faixas de valores corretas para dias 1 a 31 ((0?[1-9]|[12]\d|3[01])) e meses 1 a 12 ((0?[1-9]|1[0-2])). E aqui optamos por for�ar os 2 primeiros d�gitos do ano (correspondentes ao s�culo), quando fornecidos, a serem 19 ou 20 ((19|20)?\d{2}).
		
		4	Completa - valida os dias permitidos de acordo com o m�s. Para este �ltimo, foram criados tr�s grupos alternativos de pares dia/m�s:
		
		5	Os dias 1 a 29 ((0?[1-9]|[12]\d)) s�o aceitos em todos os meses (1 a 12): (0?[1-9]|1[0-2])
			Dia 30 � v�lido em todos os meses, exceto fevereiro (02): (0?[13-9]|1[0-2])
			Dia 31 � permitido em janeiro (01), mar�o (03), maio (05), julho (07), agosto (08), outubro (10) e dezembro (12): (0?[13578]|1[02]).
			Tradicional - data no formato DD/MM/AAAA, basicamente � a data Completa, por�m sem a opcionalidade do zero � esquerda no dia ou m�s menor que 10 e sem a opcionalidade e verifica��o de s�culo no ano, aceitando qualquer seq��ncia de 4 d�gitos (\d{4}) como ano. 
	 */
	
	
	
	
	var objectValidate = $.fn.validate;	
	
	var objectDataTest = function( object , option ){
		this.object = new Object();
		this.object = object;
		this.value = option;
	};
	
	$("#area_teste").append("Testando Datas<br>");
	for( test in values_test_data )
	{
		for( option in values_test_data_option ){
			
			gerador_id = new Date().getMilliseconds();
			
			$("#area_teste").append("<input type='text' id='date_"+gerador_id+"' name='"+values_test_data[test]+"' value='"+values_test_data[test]+"' />");
			
			var DataTest = new objectDataTest( $( "#date_"+gerador_id).get() , values_test_data_option[option] );
			
			if( objectValidate.isValidDate( DataTest ) ){
				$("#area_teste").append("<span style='color:blue'> Parametro: "+values_test_data_option[option]+" Campo v�lido</span><br /> ");
			}else{
				$("#area_teste").append("<span style='color:red'>Parametro: "+values_test_data_option[option]+" Campo inv�lido</span><br /> ");
			}
		}
	}
	$("#area_teste").append("<br><br>");
});