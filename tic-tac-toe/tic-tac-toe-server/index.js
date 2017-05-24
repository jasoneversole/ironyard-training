const express = require('express');
const bodyParser = require('body-parser');
const { Game } = require('./game');

const app = express();

const games = [];
let globalGameId = 1;

app.use(bodyParser.json());

app.get('/games', function(request, response){
    response.json(games);
});

app.post('/games', function(request, response) {
    const humanMovesFirst = request.body.humanMovesFirst;
    const game = new Game(humanMovesFirst);
    games.push({
        id: globalGameId, 
        game
    });

    response.status(201);
    response.setHeader('Location', `/games/${globalGameId}`);
    response.end();

    globalGameId += 1;
});

app.get('/games/:id', function(request, response){
    const gameId = Number.parseInt(request.params.id);
    const tuple = games.find(tuple => tuple.id === gameId);
    if (tuple){
        response.json(tuple.game);
    } else {
        response.status(404);
        response.end();
    }
});

app.delete('/games/:id', function(request, response){
    const gameId =  Number.parseInt(request.params.id);
    const gameIndex = games.findIndex(tuple => tuple.id === gameId);
    if (gameIndex >= 0) {
        games.splice(gameIndex, 1);
    } else{
        response.status(404);
        response.end();
    }
    response.end();
});

app.patch('/games/:id', function(request, response){
    const { instruction, row, column} = request.body;    
    const gameId = Number.parseInt(request.params.id);
    const tuple = games.find(tuple => tuple.id === gameId);
    if (tuple) {
        tuple.game.makeMove(row, column);
        response.json(tuple.game);
    } else {
        response.status(404);
        response.end();
    }
});

app.listen(3000, function () {
    console.log('tic-tac-toe is listening on port 3000...');
});
