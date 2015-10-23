$(function(){
	function setStepSize(){
		var boxLength = $(".steps .step").length;
		var boxSize = parseInt($(".steps .step").css("width"));
		var screenSize = $(window).innerWidth();
		var spacing = screenSize < 768 ? 10 : 20;

		$(".steps").css("width", ((boxSize*boxLength)+((boxLength+1)*spacing)) + "px");
	}

	setStepSize();

	$(window).resize(function(){
		setStepSize();
	})
})