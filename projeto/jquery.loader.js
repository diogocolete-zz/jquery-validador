(function($){

	/**
	 * Importa script dinamicamente,
	 * este metodo carrega o js, e at� que esteja carregado, o script n�o continua
	 */
	$.fn.Import = function( file ){		
		$.ajax({
		  url: file,
		  async : false,
		  dataType: 'script',
		  cache: true,
		  context: document.body
		});
	};	
	
	$.fn.ImportArray = function( aFile ){		
		for( i in aFile ){
			$.fn.Import( aFile[i] );
		}
	}
	
	
})(jQuery);