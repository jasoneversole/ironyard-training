const playerIndexSymbol = Symbol();
const playerRotationSymbol = Symbol();
const boardStateSymbol = Symbol();
const gameBoardSymbol = Symbol();
const tripletsSymbol = Symbol();

class MeatBag {
  constructor(index) {
    this[playerIndexSymbol] = index;
  }

  get index() {
    return this[playerIndexSymbol];
  }
}

class SiliconOverlord {
  constructor(index) {
    this[playerIndexSymbol] = index;
  }

  get index() {
    return this[playerIndexSymbol];
  }

  move(board) {
    let boardState = board.state;
    let emptySpots = [];
    for (let i = 0; i < 3; i += 1) {
      for (let j = 0; j < 3; j += 1) {
        if (boardState[i][j] === null) {
          emptySpots.push([i, j]);
        }
      }
    }

    const moveIndex = Math.floor(Math.random() * emptySpots.length);
    const [row, column] = emptySpots[moveIndex];
    board.placeMark(row, column, this.index);
  }
}

class Triplet {
  constructor(first, second, third) {
    this.first = first;
    this.second = second;
    this.third = third;
  }

  same(state) {
    const first = state[this.first[0]][this.first[1]];
    const second = state[this.second[0]][this.second[1]];
    const third = state[this.third[0]][this.third[1]];
    if (first === second && second === third && third !== null) {
      return third;
    }
  }
}

class Board {
  constructor() {
    this[boardStateSymbol] = [
      [null, null, null],
      [null, null, null],
      [null, null, null]
    ];
    this[tripletsSymbol] = [
      new Triplet([0, 0], [0, 1], [0, 2]),
      new Triplet([1, 0], [1, 1], [1, 2]),
      new Triplet([2, 0], [2, 1], [2, 2]),
      new Triplet([0, 0], [1, 0], [2, 0]),
      new Triplet([0, 1], [1, 1], [2, 1]),
      new Triplet([0, 2], [1, 2], [2, 2]),
      new Triplet([0, 0], [1, 1], [2, 2]),
      new Triplet([2, 0], [1, 1], [0, 2])
    ];
  }

  get state() {
    return [
      this[boardStateSymbol][0].slice(0),
      this[boardStateSymbol][1].slice(0),
      this[boardStateSymbol][2].slice(0),
    ];
  }

  placeMark(row, column, index) {
    let s = this[boardStateSymbol];
    if (this.winner !== undefined) {
      return false;
    }
    if (row < 0 || row > 2) {
      return false;
    }
    if (column < 0 || column > 2) {
      return false;
    }
    if (s[row][column] !== null) {
      return false;
    }
    s[row][column] = index;
    return true;
  }

  get winner() {
    let s = this[boardStateSymbol];
    let triplets = this[tripletsSymbol];
    return triplets
      .map(t => t.same(s))
      .reduce((acc, val) => typeof val !== 'undefined' ? val : acc, undefined);
  }
}

class Game {
  constructor(humanMovesFirst) {
    this.humanMovesFirst = humanMovesFirst;
    this[gameBoardSymbol] = new Board();

    this[playerRotationSymbol] = {
      now: humanMovesFirst ? new MeatBag(0) : new SiliconOverlord(0),
      next: humanMovesFirst ? new SiliconOverlord(1) : new MeatBag(1)
    };

    if (!humanMovesFirst) {
      this[playerRotationSymbol].now.move(this[gameBoardSymbol]);
      const { now, next } = this[playerRotationSymbol];
      this[playerRotationSymbol] = { now: next, next: now };
    }
  }

  makeMove(row, column) {
    let board = this[gameBoardSymbol];
    let result = board.placeMark(row, column, this[playerRotationSymbol].now.index);
    if (!result) {
      return false;
    }
    this[playerRotationSymbol].next.move(board);
    return true;
  }

  get board() {
    return this[gameBoardSymbol].state;
  }

  get winner() {
    return this[gameBoardSymbol].winner;
  }

  asObject() {
    return {
      humanIndex: this.humanMovesFirst ? 0 : 1,
      board: this.board,
      winner: this.winner
    };
  }
}

exports.Game = Game;
