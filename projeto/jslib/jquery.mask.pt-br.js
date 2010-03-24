	/**
	 * 
	 * AQUI É A IMPLEMENTAÇÃO DAS MASCARAS DE DADOS
	 * 
	 */

	$.fn.validate.mask = {};

	$.fn.validate.mask.Load = function(){
		
		for( x in objTemp.formInputMask )
		{
			oInput =  objTemp.formInputMask[x];
			oInput.type.definition( oInput );
		}		
	};
	
	$.fn.validate.mask.date = function( inputObject ){
		$(inputObject.object).mask( "99/99/9999" );
	};
	
	$.fn.validate.mask.cpf = function( inputObject ){
		$(inputObject.object).mask( "999.999.999-99" );
	};
	
	$.fn.validate.mask.cnpj = function( inputObject ){
		$(inputObject.object).mask( "99.999.999/9999-99" );
	};
	
	$.fn.validate.mask.money = function( inputObject ){
		$(inputObject.object).maskMoney({symbol:"R$",decimal:",",thousands:"."});
	};
	
	$.fn.validate.mask.phone = function( inputObject ){
		$(inputObject.object).mask( "(99) 9999-9999" );
	};