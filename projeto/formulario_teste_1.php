<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
	"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd"> 
<html 
	xmlns="http://www.w3.org/1999/xhtml" 
	xml:lang="pt-br"> 
<head>
	<meta http-equiv="content-type" content="text/html; charset=iso-8859-1" />
	
	<style type="text/css">
		.input-invalid-information{
			border: solid 1px red;	
		}
	</style>
	
	<script type="text/javascript" src="jquery-1.4.2.min.js"></script>
	<script type="text/javascript" src="jquery.validacao.js"></script>
	<script type="text/javascript">
		$(document).ready(function(){
			$("body").validate();		
		});
	</script>
	
</head>
<body>

<h2>FORMULARIO DE TESTE 1</h2>

<form enctype="application/x-www-form-urlencoded" validate:form="formulario_1">

<fieldset>
	<legend>Dados do Contato</legend>
	<label for="contato_nome">Nome</label>
	<input id="contato_nome" name="contato_nome" type="text" validate:text="true" />
	
	<br />
	
	<label for="contato_sexo">Sexo</label>: 
	Masculino <input type="radio" name="sexo" value="M" validate:radiobox="true" /> 
	Femenino <input type="radio" name="sexo" value="F" validate:radiobox="true" />
	
	<br />
	
	<label for="contato_desc">Descrição</label>
	<textarea rows="5" cols="15" validate:text="true"></textarea>
	
	<br />
	
	<label for="contato_telefone">Telefone</label>
	<input id="contato_telefone" name="contato_telefone" type="text" value="" validate:text="true" />
		
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

<script type="text/javascript" src="teste-email.js"></script>

<script type="text/javascript" src="teste-date.js"></script>
<script type="text/javascript" src="teste-integer.js"></script>
<!-- 		
/*	
	{ns : ":date" , callback : $.fn.validate.isValidDate },
	{ns: ":integer" , callback : $.fn.validate.isValidInteger },
	{ns: ":text" , callback : $.fn.validate.isValidText },
	{ns: ":cpf"  , callback : $.fn.validate.isValidCpf },
	{ns: ":cnpj" , callback : $.fn.validate.isValidCnpj },
	{ns: ":email" , callback : $.fn.validate.isValidEmail },
	{ns: ":time" , callback : $.fn.validate.isValidTempo },
	{ns: ":money-pt-br" , callback : $.fn.validate.isValidMoeda },
	{ns: ":radiobox" , callback : $.fn.validate.isValidRadiobox },
	{ns: ":checkbox" , callback: $.fn.validate.isValidCheckbox }
*/
	
 -->

<div id="area_teste" style="border: solid 1px red;padding: 10px"></div>

</body>
</html>