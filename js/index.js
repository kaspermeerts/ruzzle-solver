var ruzzle;

function createBoard () {
	var $grid = $("#grid");

	for (var r = 0; r < 4; r++) {
		var row = $("<div></div>");
		for (var c = 0; c < 4; c++) {
			var cell = $("<input />", {
				class: "cell",
				maxlength: "1"
			});
			cell.data({col: c, row: r});
			row.append(cell);
		}
		$grid.append(row);
	}

	$('.cell').change(function(){
		var c = $(this).data('col'), r = $(this).data('row');
		ruzzle.board[r][c] = $(this).val().toUpperCase();
	});
}


function init () {
	$("#solve-button").click(function () {
		$("#solutions").fadeIn();
	});

	$("#solutions").hide();
	ruzzle = new Ruzzle({});
	createBoard();
}

$(document).ready(init);
