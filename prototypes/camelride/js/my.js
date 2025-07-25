
$(document).bind('pageshow', function () {

		var totalFee = 610;
		$("h3 span#total").text(totalFee);
		
		$("#checkbox-1a").click(function(){
			if($(this).is(':checked'))
				totalFee = totalFee + 610 ;
			else
				totalFee = totalFee - 610 ;
			$("h3 span#total").text(totalFee);
		});
		
		$("#checkbox-2a").click(function(){
			if($(this).is(':checked'))
				totalFee = totalFee + 610 ;
			else
				totalFee = totalFee - 610 ;
			$("h3 span#total").text(totalFee);
		});
				
		$("#checkbox-3a").click (function(){
			if($(this).is(':checked'))
				totalFee = totalFee + 610 ;
			else
				totalFee = totalFee - 610 ;
			$("h3 span#total").text(totalFee);
		});
});