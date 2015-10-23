$(function(){
	$(".tenho-interesse").on("click", function(){
		$(this).hide();

		$(".contato .form").fadeIn();
	});

	$(".form .saiba-mais").on("click", function(e){
		e.preventDefault();

		if ($(".name input").val() == "" || 
				$(".email input").val() == "" || 
				$(".company-name input").val() == "") {
			alert("Todos os campos são de preenchimento obrigatório.");
		}
		else {
			$(".contato .form").hide();
			$(".agradecimento").fadeIn();
		}
	})
})