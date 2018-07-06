var Piece = function(x, y, color) {
    this.id = x;
    this.white = color
    this.taken = false;
    this.untouched = true;
    this.position = {
        x: x,
        y: y
    }
};

Piece.prototype.checkIfOppositeColor = function(board, x, y) {
    if (board[x][y].white === this.white) {
        return false;
    }
    return true;
};

module.exports = Piece;