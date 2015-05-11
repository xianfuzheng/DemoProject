$(document).ready(function(){
	
	var validFaceValues = ['2','3','4','5','6','7','8','9','10','J','Q','K','A'];
	var validSuitValues = ['S','C','D','H'];

	//on change event
	$(".card-input").on('change textInput input',function(){
		$this = $(this);
		var $cardTarget = $("#"+$this.data("card-target"));
		var cardNumber = $this.val();

		var splitedCardNumber = splitCardNumber(cardNumber);

		//only if it is a valid card object
		if(splitedCardNumber && splitedCardNumber.length == 2){
			$this.data('face-value',splitedCardNumber[0]);

			updateCard($cardTarget,splitedCardNumber[0],splitedCardNumber[1]);

			var cardResult = 0;
			$(".card-input").each(function(index,cardObj){
				cardResult += parseInt($(cardObj).data('face-value'))+1;
			});
			$("#textResult").val(cardResult);
		}
	});

	// random btn event
	$("#btnRandomCards").click(function(){
		getRandomCards();
	});

	//update card image
	function updateCard( $cardDivObj,faceValueIdx, suitIdx){
		//validate value
		$cardDivObj.css('background-position', 
			'-'+(faceValueIdx*225)+'px -'+(suitIdx*315)+'px');
	}
	
	// return null if it's not valid
	// otherwise return  indexes 
	function splitCardNumber(cardNumber){
		var length = cardNumber.length;

		if(length !=2 && length!=3){
			return null;
		}

		var suitValue = cardNumber.charAt(length-1);
		var faceValue = cardNumber.substring(0,length-1);

		var suitValueIdx = getValueIdx(validSuitValues,suitValue);
		var faceValueIdx = getValueIdx(validFaceValues,faceValue);
		if(suitValueIdx < 0 || faceValueIdx < 0){
			return null;
		}

		return [faceValueIdx+1,suitValueIdx];
	}

	function getRandomCards(){
		
		$(".card-input").each(function(index,cardObj){
			var random1 = Math.floor(Math.random()*validFaceValues.length);
			var random2 = Math.floor(Math.random()*validSuitValues.length);

			var faceValue = validFaceValues[random1];
			var suitValue = validSuitValues[random2];
			$(cardObj).val(faceValue+suitValue);
			$(cardObj).trigger("change");
		});
	}
	function getValueIdx(valuesInArray, searchValue){	
		var idx = -1;
		searchValue = searchValue.toUpperCase();
		$.each(valuesInArray, function( index, value ) {
		  if(value == searchValue){
			  idx =  index;
		  }
		});
		return idx;
	}

	getRandomCards();
	window.ParsleyValidator
	  .addValidator('validCardNumber', function (value) {
		return splitCardNumber(value)!=null;
	  }, 32)
	.addMessage('en', 'validCardNumber', 'faceValue is from 2-A,suit value is one of S,C,D,H')


	$(".card-input").parsley();
	
});