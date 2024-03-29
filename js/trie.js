function Trie() {
	return this._init();
}

Trie.prototype = {
	_init: function () {
		this.keys = {};
		this._end = false;
	},

	insert: function (word) {
		if (word.length === 0) {
			this._end = true;
			return;
		}

		var letter = word.charAt(0);
		var rest = word.substring(1);
		if (!this.keys[letter])
			this.keys[letter] = new Trie();

		this.keys[letter].insert(rest);
	},

	lookup: function (word) {
		if (word.length === 0)
			return this._end;

		var letter = word.charAt(0);
		var rest = word.substring(1);
		if (this.keys[letter])
			return this.keys[letter].lookup(rest);
	},
};
