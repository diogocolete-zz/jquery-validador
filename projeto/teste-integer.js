$(document).ready(function(){
	
	
	//Existe uma seq��ncia de express�o regular que significa um d�gito (0 a 9): \d. Adicionando um + ap�s essa seq��ncia, significa "uma ou mais ocorr�ncias da seq��ncia precedente". Isto �, um ou mais d�gitos. Note que isso implica o preenchimento obrigat�rio; � melhor que o caso do campo n�o preenchido (vazio) seja tratado � parte. Assim, temos a express�o regular completa para validar u
	var values_test_data = new Array("","123","#123","abc","123 "," 123 ","-123");
	
	
	
	
	
	var objectValidate = $.fn.validate;	
	
	var objectDataTest = function( object ){
		this.object = new Object();
		this.object = object;
	};
	
	$("#area_teste").append("Testando valores inteiros<br>");
	for( test in values_test_data )
	{
			gerador_id = new Date().getMilliseconds();
			
			$("#area_teste").append("<input type='text' id='campo_"+gerador_id+"' name='"+values_test_data[test]+"' value='"+values_test_data[test]+"' />");
			
			var DataTest = new objectDataTest( $( "#campo_"+gerador_id).get()  );
			
			if( objectValidate.isValidInteger( DataTest ) ){
				$("#area_teste").append("<span style='color:blue'>  Campo v�lido</span><br /> ");
			}else{
				$("#area_teste").append("<span style='color:red'> Campo inv�lido</span><br /> ");
			}
	}
	$("#area_teste").append("<br><br>");
});