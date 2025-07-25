function AgendaSteps(show, hide, direction, Step){
	var index = 0;
	index = Step;
	if (direction == 0)
	{
		//steps
		$("#step" + index.toString() + " span ").removeClass("circle-full");
		$("#step" + index.toString() + " span ").addClass("circle");
		$("#step" + (index+1).toString() + " span ").removeClass("circle");
		$("#step" + (index+1).toString() + " span ").addClass("circle-full");

		$(hide).animate({left:'-500px'},350,
			function()
			{ 
				$(hide).removeClass('stepVisible');
				$(hide).addClass('stepHidden');
				$(show).removeClass('stepHidden');
				$(show).addClass('stepVisible');
				$(show).animate({left:'0px'},350)
			}
		);
	}
	else //once hit on Voltar
	{
		//steps
		$("#step" + index.toString() + " span ").removeClass("circle-full");
		$("#step" + index.toString() + " span ").addClass("circle");
		$("#step" + (index-1).toString() + " span ").removeClass("circle");
		$("#step" + (index-1).toString() + " span ").addClass("circle-full");
				
		$(hide).animate({left:'500px'},350,
			function()
			{ 
				$(hide).removeClass('stepVisible');
				$(hide).addClass('stepHidden');
				$(show).removeClass('stepHidden');
				$(show).addClass('stepVisible');
				$(show).animate({left:'0px'},350)
			}
		);
	}
}
jQuery.fn.center = function () {
    this.css("position","absolute");
    this.css("top", Math.max(0, (($(window).height() - $("#calendar").outerHeight()) / 2) + 
                                                $(window).scrollTop()) + "px");
    this.css("left", Math.max(0, (($(window).width() - $("#calendar").outerWidth()) / 2) + 
                                                $(window).scrollLeft()) + "px");
    return this;
}