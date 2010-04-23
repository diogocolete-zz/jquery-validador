<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
	"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd"> 
<html 
	xmlns="http://www.w3.org/1999/xhtml"
	xmlns:validate="http://validator" 
	xml:lang="pt-br"> 
<head>
	<meta http-equiv="content-type" content="text/html; charset=iso-8859-1" />
	
	<style type="text/css">
		.input-invalid-information{
			border: solid 1px red;	
		}
		
		.text-invalid-information{
			position: relative;
			font-size: 20px;
			color: red;
		}
		
	</style>
	
	<script type="text/javascript" src="jslib/jquery-1.4.2.min.js"></script>
	<script type="text/javascript" src="jquery.loader.js"></script>
	<script type="text/javascript">
		$(document).ready(function(){

			// importacao requerida
			$().Import( "jquery.validacao.js" );
			
			// inicia a validacao
			$().validate(function( oForm ){
				// funcao sera chamada caso formulario seja invalido
				return true;
			});
			
		});
	</script>
	
</head>
<body>

<h2>FORMULARIO DE TESTE 1 - FUNCOES PT-BR</h2>

<form enctype="application/x-www-form-urlencoded" validate:form="formulario_1" action="">

<fieldset>
	<legend>Dados do Contato</legend>
	<label for="contato_nome">Nome</label>
	<input id="contato_nome" name="contato_nome" type="text" validate:text="true" />
	
	<br />
	
	<label for="contato_sexo">Sexo</label>: 
	Masculino <input type="radio" name="sexo" value="M" validate:radiobox="true" /> 
	Femenino <input type="radio" name="sexo" value="F" validate:radiobox="true" />
	
	<br />
	
	<label for="cpf">CPF: </label>
	<input id="cpf" name="cpf" type="text" value="" validate:cpf="true" mask:cpf="true" />
	
	<br />
	
	<label for="cnpj">CNPJ: </label>
	<input id="cnpj" name="cnpj" type="text" value="" validate:cpf="true" mask:cnpj="true" />
	
	<br />
	
	<label for="cep">CEP: </label>
	<input id="cep" name="cep" type="text" value="" validate:cep="true" mask:cep="true" />
	
	<br />
	
	<label for="contato_desc">Descrição</label>
	<textarea rows="5" cols="15" validate:text="true"></textarea>
	
	<br />
	
	<label for="contato_telefone">Telefone</label>
	<input id="contato_telefone" name="contato_telefone" type="text" value="" validate:text="true" mask:phone="true" />
		
	<br />
		
	<label for="contato_end">Endereço</label>
	<input id="contato_end" name="contato_end" type="text" validate:text="true" />

	<br />

	<label for="contato_dataatual">Data Atual</label>
	<input id="contato_dataatual" name="contato_dataatual" type="text" validate:date="1" />

	<br />

	<label for="ano_nascimento">Ano Nascimento</label>
	<select name="ano_nascimento" id="ano_nascimento" validate:integer="true">
		
		<option></option>

		<?php for($x=1980 ; $x < date("Y")-10;$x++){?>
		<option><?php echo $x;?></option>
		<?php }?>
	</select>
		
	<br />	
		
	<input type="submit" value="Enviar" />	
		
</fieldset>

</form>

<br />

<!-- 

 Descomente para testar os validadores customizados
 
 este teste substituio padrao por um validador que apenas retorna true  
<script type="text/javascript">
	$(document).ready(function(){
		// parametro passado é o arquivo contendo as definicoes de validacao
		$.fn.Import("teste-validador-customizado");
	});
</script>
-->
<script type="text/javascript" src="teste-cpf.js"></script>
<script type="text/javascript" src="teste-email.js"></script>
<script type="text/javascript" src="teste-tempo.js"></script>
<script type="text/javascript" src="teste-date.js"></script>
<script type="text/javascript" src="teste-integer.js"></script>
<script type="text/javascript" src="teste-moeda.js"></script>


<div id="area_teste" style="border: solid 1px red;padding: 10px"></div>

</body>
</html>