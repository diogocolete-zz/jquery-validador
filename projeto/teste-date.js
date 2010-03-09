$(document).ready(function(){
	
	// dados para testar
	var values_test_data = new Array("01/01/2010","01-01-2010","2010-01-01","2010/01/01","");
	var values_test_data_option = new Array(1,2,3,4,5); 
	/**
	    1	Simples - valida apenas o uso de dígitos, nas posições e quantidade certas: 1 a 2 dígitos para dia e para mês, 1 a 4 dígitos para ano.
		
		2	Média - testa os dígitos possíveis em cada posição: o primeiro dígito do dia, se houver, deve ser de 0 a 3 ([0-3]?\d); o primeiro dígito do mês, se houver, deve ser 0 ou 1 ([01]?\d); passamos a aceitar apenas 2 ou 4 dígitos para o ano.
		
		3	Avançada - garante as faixas de valores corretas para dias 1 a 31 ((0?[1-9]|[12]\d|3[01])) e meses 1 a 12 ((0?[1-9]|1[0-2])). E aqui optamos por forçar os 2 primeiros dígitos do ano (correspondentes ao século), quando fornecidos, a serem 19 ou 20 ((19|20)?\d{2}).
		
		4	Completa - valida os dias permitidos de acordo com o mês. Para este último, foram criados três grupos alternativos de pares dia/mês:
		
		5	Os dias 1 a 29 ((0?[1-9]|[12]\d)) são aceitos em todos os meses (1 a 12): (0?[1-9]|1[0-2])
			Dia 30 é válido em todos os meses, exceto fevereiro (02): (0?[13-9]|1[0-2])
			Dia 31 é permitido em janeiro (01), março (03), maio (05), julho (07), agosto (08), outubro (10) e dezembro (12): (0?[13578]|1[02]).
			Tradicional - data no formato DD/MM/AAAA, basicamente é a data Completa, porém sem a opcionalidade do zero à esquerda no dia ou mês menor que 10 e sem a opcionalidade e verificação de século no ano, aceitando qualquer seqüência de 4 dígitos (\d{4}) como ano. 
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
				$("#area_teste").append("<span style='color:blue'> Parametro: "+values_test_data_option[option]+" Campo válido</span><br /> ");
			}else{
				$("#area_teste").append("<span style='color:red'>Parametro: "+values_test_data_option[option]+" Campo inválido</span><br /> ");
			}
		}
	}
	$("#area_teste").append("<br><br>");
});