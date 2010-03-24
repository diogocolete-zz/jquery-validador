$(document).ready(function(){
	
	// dados para testar
	var values_test_data = new Array("12345678909" , "123.456.789-09" , "" , "123.456.789.09" ,"_123.456.789.09");
	var values_test_data_option = [0]; 	
	
	var objectValidate = $.fn.validate;	
	
	var objectDataTest = function( object , option ){
		this.object = new Object();
		this.object = object;
		this.value = option;
	};
	
	$("#area_teste").append("Testando CPF<br>");
	for( test in values_test_data )
	{
		for( option in values_test_data_option ){
			
			gerador_id = new Date().getMilliseconds();
			
			$("#area_teste").append("<input type='text' id='campo_"+gerador_id+"' name='"+values_test_data[test]+"' value='"+values_test_data[test]+"' />");
			
			var DataTest = new objectDataTest( $( "#campo_"+gerador_id).get() , values_test_data_option[option] );
			
			
			
			if( objectValidate.isValidCpf( DataTest ) ){
				$("#area_teste").append("<span style='color:blue'> Parametro: "+values_test_data_option[option]+" Campo válido</span><br /> ");
			}else{
				$("#area_teste").append("<span style='color:red'>Parametro: "+values_test_data_option[option]+" Campo inválido</span><br /> ");
			}
		}
		$("#area_teste").append("<hr />");
	}
	$("#area_teste").append("<br><br>");
});