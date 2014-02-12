function Ruzzle (dict) {
	return this._init(dict);
}

Ruzzle.prototype = {
	_init: function (dict) {
		this.solutions = [];
		this.dict = dict;

		this.board = new Array(4);
		for (var j = 0; j < 4; j++) {
			this.board[j] = new Array(4);
			for (var i = 0; i < 4; i++) {
				this.board[j][i] = '';
			}
		}
	},

	// XXX I have never seen an X, Y or Q, so I don't know their actual
	// scores
	LETTER_SCORES : {
		A: 1, B: 4, C: 5, D: 2, E: 1, F: 4, G: 3, H: 4, I: 2,
		J: 4, K: 3, L: 3, M: 3, N: 1, O: 1, P: 4, Q: 9, R: 2,
		S: 2, T: 2, U: 2, V: 4, W: 5, X: 9, Y: 9, Z: 5
	},

	_traverse: function (sols, partial_word, partial_path, newRow, newCol) {
		// Check if this is a valid position
		if (newRow < 0 || newRow >= 4 || newCol < 0 || newCol >= 4)
			return;

		// Check if we haven't been at this position yet
		for (var i = 0; i < partial_path.length; i++) {
			if (partial_path[i].row === newRow &&
			    partial_path[i].col === newCol) {
				return;
			}
		}
		var letter = this.board[newRow][newCol];
		if (letter === "")
			return;
		var word = partial_word + letter;
		// Check if the current partial word is a prefix of an existing word
		var result = this.dict.lookup(word);
		if (result === undefined)
			return;
		var path = partial_path.concat({row: newRow, col: newCol});
		if (result) {
			var newSolution = {
				word: word,
				path: path,
				score: 0,
			};
			sols.push(newSolution);
		}

		this._traverse(sols, word, path, newRow - 1, newCol - 1);
		this._traverse(sols, word, path, newRow - 1, newCol    );
		this._traverse(sols, word, path, newRow - 1, newCol + 1);
		this._traverse(sols, word, path, newRow    , newCol - 1);
		this._traverse(sols, word, path, newRow    , newCol + 1);
		this._traverse(sols, word, path, newRow + 1, newCol - 1);
		this._traverse(sols, word, path, newRow + 1, newCol    );
		this._traverse(sols, word, path, newRow + 1, newCol + 1);
	},

	solve: function () {
		this.solutions = [];
		var sols = [];

		for (var r = 0; r < 4; r++) {
			for (var c = 0; c < 4; c++) {
				this._traverse(sols, "", [], r, c);
			}
		}

		for (var i = 0; i < sols.length; i++) {
			var sol = sols[i];
			for (var j = 0; j < this.solutions.length; j++) {
				if (this.solutions[j].word === sol.word)
					break;
			}
			if (j < this.solutions.length) {
				if (sol.score > this.solutions[j].score)
					this.solutions[j] = sol;
			} else {
				this.solutions.push(sol);
			}
		}

		this.solutions.sort(function(a, b) { return b.word.length - a.word.length; });
	}
};
