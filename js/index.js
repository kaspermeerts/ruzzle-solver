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

	$('.cell').on("input", function () {
		var c = $(this).data('col'), r = $(this).data('row');
		ruzzle.board[r][c] = $(this).val().toUpperCase();
	});
}

function solveBoard () {
	$("#solutions").show();

	$("#solving").show();
	ruzzle.solve();
	$("#solving").hide();

	$("#num-words").text(ruzzle.solutions.length + " words");
	$("#wordlist").empty();
	for (var i = 0; i < ruzzle.solutions.length; i++) {
		sol = ruzzle.solutions[i];
		$("#wordlist").append($("<li>").text(sol.word))
	}
}

function init () {
	var dict = new Trie();

	$("#solutions").hide();
	$("#solve-button").on("click", solveBoard);

	$("#ruzzle-board *").hide();
	$("#loading").show();
	$.get("list.txt")
		.done(function (data) {
			var words = data.split("\n");
			words.forEach(dict.insert, dict);
			$("#ruzzle-board *").show();
			$("#loading").hide();
		})
		.fail(function (data) {
			$("#loading").text("Failed to load the dictionary...");
		});

	ruzzle = new Ruzzle(dict);
	createBoard();
}

$(document).ready(init);
