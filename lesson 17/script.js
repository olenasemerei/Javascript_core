let timer2 = "0:61";

$(document).ready(function () {
	$(".checkResult").attr("disabled", true);

	let interval;
	let timer2 = "0:61";
	function timerStart() {
		let timer = timer2.split(":");
		let minutes = parseInt(timer[0], 10);
		let seconds = parseInt(timer[1], 10);
		--seconds;
		minutes = seconds < 0 ? --minutes : minutes;
		seconds = seconds < 0 ? 59 : seconds;
		seconds = seconds < 10 ? "0" + seconds : seconds;
		minutes = (minutes < 10) ?  minutes : minutes;
		if(minutes==0 && seconds==0){
			clearInterval(interval);
			$(".modalLost").removeClass('hidden');
		} else {
			$(".countDown").html(minutes + ":" + seconds);
			$(".timerLeft").html(minutes + ":" + seconds);
			timer2 = minutes + ":" + seconds;
		}
	};


	let pieces = createPieces(true);
	$('#pieceContainer').html(pieces);

	$('.startGame').click(function () {

		$(".startGame").attr("disabled", true);
		$(".checkResult").attr("disabled", false);
		interval = setInterval(timerStart, 1000);

		let pieces = $('#pieceContainer div')
		pieces.each(function () {
			let leftPosition = Math.floor(Math.random() * 290) + 'px'
			let topPosition = Math.floor(Math.random() * 290) + 'px'
			$(this).addClass("draggablePiece").css({
				position: 'absolute',
				left: leftPosition,
				top: topPosition,
			})
			$('#pieceContainer').append($(this));
		});

		let emptyString = createPieces(false);
		$("#puzzleContainer").html(emptyString);
		implementLogic();
	});

	$(".newGame").click(function () {
		
		$(".newGame").attr("disabled", true);
		$(".startGame").attr("disabled", true);
		$(".checkResult").attr("disabled", false);
		$(".countDown").html('01' + ":" + '00');
		interval = setInterval(timerStart, 1000);

		let pieces = $('#pieceContainer div')
		pieces.each(function () {
			let leftPosition = Math.floor(Math.random() * 290) + 'px'
			let topPosition = Math.floor(Math.random() * 290) + 'px'
			$(this).addClass("draggablePiece").css({
				position: 'absolute',
				left: leftPosition,
				top: topPosition,
			})
			$('#pieceContainer').append($(this));
		});

		let emptyString = createPieces(false);
		$("#puzzleContainer").html(emptyString);
		implementLogic();
		

	});

	$(".checkResult").click(function () {
		// clearInterval(interval);
		function checkIfPuzzleSolved() {
			if ($("#puzzleContainer .droppedPiece").length != 16) {
				$(".modalSure").removeClass('hidden');
				return false;
			}
			for (let k = 0; k < 16; k++) {
				let item = $("#puzzleContainer .droppedPiece:eq(" + k + ")");
				let order = item.data("order");
				if (k != order) {
					$(".modalSure").removeClass('hidden');
					return false;
				}
			}
			$(".modalSure").removeClass('hidden');
			return true;
		};
		checkIfPuzzleSolved();
	});


	$(".close1").on("click", function () {
		$(".modalLost").addClass('hidden');
		$(".startGame").attr("disabled", false);
		location.reload()
	});

	$(".close").on("click", function () {
		$(".modalSure").addClass('hidden');
	});

	$(".close").on("click", function () {
		$(".modalWell").addClass('hidden');
	});

	

	let check=true;
	$('.checkImg').click(function () {
		// 	$(".modalSure").addClass('hidden');
		// $(".modalLost").removeClass('hidden');
		// if ($("#puzzleContainer .droppedPiece").length != 16) {
		// 	$(".modalSure").removeClass('hidden');
		// 	 return false;
		// }
		for (let k = 0; k < 16; k++) {
			let item = $("#puzzleContainer .droppedPiece:eq(" + k + ")");
			let order = item.data("order");
			if (k != order) {
				$(".modalSure").removeClass('hidden');
					check = false;
				break;
			}
		}
		if (check) {
			$('.modalWell').removeClass('hidden');
			clearInterval(interval);
			$(".checkResult").attr("disabled", true);
		}
		else {
			$('.modalSure').addClass('hidden');
			$('.modalLost').removeClass('hidden');
			clearInterval(interval);
			$(".checkResult").attr("disabled", true);
		}
		check = true;
	})

	function createPieces(withImage) {
		let rows = 4;
		let columns = 4;
		let pieces = "";
		for (let i = 0, top = 0, order = 0; i < rows; i++, top -= 100) {
			for (let j = 0, left = 0; j < columns; j++, left -= 100, order++) {
				if (withImage) {
					pieces +=
						"<div style='background-position:" +
						left +
						'px ' +
						top +
						"px;' class='piece' data-order=" + order + "></div>";
				}
				else {
					pieces += "<div style='background-image: none;' class='piece droppableSpace'></div>";
				}
			}
		}
		return pieces;
	};


	function implementLogic() {
		$(".draggablePiece").draggable({
			revert: "invalid",
			start: function () {
				if ($(this).hasClass("droppedPiece")) {
					$(this).removeClass("droppedPiece");
					$(this).parent().removeClass("piecePresent")
				}
			}
		});
		$(".droppableSpace").droppable({
			hoverClass: "ui-state-hightlight",
			accept: function () {
				return !$(this).hasClass("piecePresent")
			},
			drop: function (event, ui) {
				let draggableElement = ui.draggable;
				let droppedOn = $(this);
				droppedOn.addClass("piecePresent");
				$(draggableElement).addClass("droppedPiece").css({
					top: 0,
					left: 0,
					position: "relative"
				}).appendTo(droppedOn);
				
			}
		});
	};



});






