const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { Game } = require('./game');

const games = [];
let globalGameId = 1;

app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PATCH, DELETE");
  next();
});

app.get('/games', function (req, res) {
  res.json(games.map(tuple => {
    return Object.assign({}, tuple.game.asObject(), { id: tuple.id });
  }));
});

app.post('/games', function (req, res) {
  const hmf = req.body.humanMovesFirst;

  if (typeof hmf === 'undefined') {
    res.status(400);
    res.json({
      message: `Missing specification "humanMovesFirst".`
    });
  } else {
    const game = new Game(hmf);
    games.push({
      id: globalGameId,
      game
    });

    res.status(201);
    res.setHeader('Location', `/games/${globalGameId}`);
    res.json(games.map(tuple => {
      return Object.assign({}, tuple.game.asObject(), { id: tuple.id });
    }));

    globalGameId += 1;
  }
});

app.get('/games/:id', (req, res) => {
  const gameId = req.params.id;
  const tuple = games.find(tuple => tuple.id == gameId);
  if (tuple) {
    res.json(tuple.game.asObject());
  } else {
    res.status(404);
    res.json({
      message: `Could not find game with id ${gameId}`
    });
  }
});

app.delete('/games/:id', (req, res) => {
  const gameId = Number.parseInt(req.params.id);
  const index = games.findIndex(tuple => tuple.id === gameId);

  if (index >= 0) {
    games.splice(index, 1);
  }
  res.end();
});

app.patch('/games/:id', (req, res) => {
  const gameId = Number.parseInt(req.params.id);
  const { instruction, row, column } = req.body;
  const tuple = games.find(tuple => tuple.id === gameId);

  if (tuple && instruction === 'move') {
    if (tuple.game.makeMove(row, column)) {
      res.json(tuple.game.asObject());
    } else {
      res.status(409);
      res.json({
        message: `Cannot move in that spot`,
        row,
        column
      });
    }
  } else if (tuple && instruction !== 'move') {
    res.status(415);
    res.json({
      message: `Cannot support the instruction "${instruction}".`
    });
  } else {
    res.status(404);
    res.json({
      message: `Game not found with id of ${gameId}`
    });
  }
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
