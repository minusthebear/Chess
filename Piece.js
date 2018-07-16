var Piece = function(x, y, type, color) {
    this.id = x;
    this.type = type;
    this.white = color
    this.taken = false;
    this.untouched = true;
    this.position = {
        x: x,
        y: y
    }
};

Piece.prototype.checkIfOppositeColor = function(board, x, y) {

    if (!board[x][y]) {
        return true;
    }

    if (board[x][y].white === this.white) {
        return false;
    }
    return true;
};

Piece.prototype.setPosition = function(x, y) {
    this.position.x = x;
    this.position.y = y;
};

module.exports = Piece;