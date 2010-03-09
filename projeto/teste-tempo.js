$(document).ready(function(){	
	// dados para testar
	var values_test_data = new Array( "" , "01:01" , "23:59" , "12:00" , "12:59:59" , "23:59:59:59" );
	var values_test_data_option = new Array(1,2,3,4,5);
	var values_test_data_label = new Array( "Hor�rio HH:MM simples" , "Hor�rio HH:MM 24h" , "Hor�rio HH:MM 12h","Tempo horas:MM:SS","Tempo horas:MM:SS.mili");
	/*
     1 Hor�rio HH:MM simples - aceita dois pares de dois d�gitos separados por dois-pontos (:); pode ser usado para hora:minutos ou ainda para minutos:segundos, por�m n�o valida as faixas de valor v�lidos para os d�gitos, aceitando assim qualquer valor entre 00 e 99.
	 2 Hor�rio HH:MM 24h - aceita horas na faixa 00-23 e minutos 00-59, separados por dois-pontos.
	 3 Hor�rio HH:MM 12h - aceita horas na faixa 01-12 e minutos 00-59, separados por dois-pontos.
	 4 Tempo horas:MM:SS - aceita qualquer quantidade de horas (0 ou mais, um ou mais d�gitos), minutos 00-59 e segundos 00-59, todos separados por dois-pontos.
	 5 Tempo horas:MM:SS.mili - similar ao anterior, por�m inclui 3 d�gitos finais para milisegundos 000-999, separados dos anteriores por ponto (.).
	*/	
	
	var objectValidate = $.fn.validate;
	
	var objectDataTest = function( object , option ){
		this.object = new Object();
		this.object = object;
		this.value = option;
	};
	
	$("#area_teste").append("Testando Tempo<br>");
	for( test in values_test_data )
	{
		for( option in values_test_data_option ){
			
			gerador_id = new Date().getMilliseconds();
			
			$("#area_teste").append("<input type='text' id='campo_"+gerador_id+"' name='"+values_test_data[test]+"' value='"+values_test_data[test]+"' />");
			
			var DataTest = new objectDataTest( $( "#campo_"+gerador_id).get() , values_test_data_option[option] );
			
			if( objectValidate.isValidTime( DataTest ) ){
				$("#area_teste").append("<span style='color:blue'>opcao: "+values_test_data_option[option]+" "+values_test_data_label[option]+" Campo v�lido</span><br /> ");
			}else{
				$("#area_teste").append("<span style='color:red'>opcao: "+values_test_data_option[option]+" "+values_test_data_label[option]+" Campo inv�lido</span><br /> ");
			}
		}
		$("#area_teste").append("<hr />");
	}
	$("#area_teste").append("<br><br>");
});