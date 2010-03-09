$(document).ready(function(){
	
	//Existe uma seqüência de expressão regular que significa um dígito (0 a 9): \d. Adicionando um + após essa seqüência, significa "uma ou mais ocorrências da seqüência precedente". Isto é, um ou mais dígitos. Note que isso implica o preenchimento obrigatório; é melhor que o caso do campo não preenchido (vazio) seja tratado à parte. Assim, temos a expressão regular completa para validar u
	var values_test_data = new Array("","10.01","10,01","R$ 10,01");
	
	
	var objectValidate = $.fn.validate;	
	
	var objectDataTest = function( object ){
		this.object = new Object();
		this.object = object;
	};
	
	$("#area_teste").append("Testando valores monetarios<br>");
	for( test in values_test_data )
	{
			gerador_id = new Date().getMilliseconds();
			
			$("#area_teste").append("<input type='text' id='campo_"+gerador_id+"' name='"+values_test_data[test]+"' value='"+values_test_data[test]+"' />");
			
			var DataTest = new objectDataTest( $( "#campo_"+gerador_id).get()  );
			
			if( objectValidate.isValidMoney( DataTest ) ){
				$("#area_teste").append("<span style='color:blue'>  Campo válido</span><br /> ");
			}else{
				$("#area_teste").append("<span style='color:red'> Campo inválido</span><br /> ");
			}
	}
	$("#area_teste").append("<br><br>");
});