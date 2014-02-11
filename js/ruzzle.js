function Ruzzle (dict) {
	this.dict = dict;

	this.board = new Array(4);
	for (var j = 0; j < 4; j++) {
		this.board[j] = new Array(4);
		for (var i = 0; i < 4; i++) {
			this.board[j][i] = '';
		}
	}
}
