let playerIndexSymbol = Symbol();

class HumanPlayer {
    constructor(index) {
        this[playerIndexSymbol] = index;
    }

    get index() {
        return this[playerIndexSymbol];
    }

    get name() {
        return "Meat Bag";
    }
}

class ComputerPlayer {
    constructor(index) {
        this[playerIndexSymbol] = index;
    }

    get index() {
        return this[playerIndexSymbol];
    }

    get name() {
        return "Silocone Overlord";
    }

    move(board) {
        let emptySpots = [];
        for (let i = 0; i < 3; i += 1) {
            for (let j = 0; j < 3; j += 1) {
                if (board[i][j] === null) {
                    emptySpots.push([i, j]);
                }
            }
        }

        const moveIndex = Math.floor(Math.random() * emptySpots.length);
        
        const [row, column] = emptySpots[moveIndex];
        board[row][column] = this.index;
    }
}

class Game {
    constructor(humanMovesFirst) {
        this.playerRotation = {
            now: humanMovesFirst ? new HumanPlayer(0) : new ComputerPlayer(0),
            next: humanMovesFirst ? new ComputerPlayer(1) : new HumanPlayer(1)
        };

        this.humanMovesFirst = humanMovesFirst;
        this.board = [
            [null, null, null],
            [null, null, null],
            [null, null, null]
        ];

        if (!humanMovesFirst) {
            this.playerRotation.now.move(this.board);
            this.rotatePlayers();
        }
    }

    makeMove(row, column) {
        this.board[row][column] = this.playerRotation.now.index;
        this.playerRotation.next.move(this.board);
    };

    rotatePlayers() {
        const { now, next } = this.playerRotation;
        this.playerRotation = {now: next, next: now};
    };
}

exports.Game = Game;
