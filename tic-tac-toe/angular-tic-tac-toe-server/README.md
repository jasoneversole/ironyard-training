# Angular Tic-Tac-Toe Server

1. Clone or download.
1. Run `npm install` to install dependencies.
1. Run `npm start` to start the server on port 3000.

## The API

**GET** `/games` lists the games

**POST** `/games` creates a new game in
the collection and returns the list of
games.

**GET** `/games/:id` returns the game
for that given identifier.

**DELETE** `/games/:id` removes the game
from the server

**PATCH** `/games/:id` makes a move in the
game IFF the payload of the body looks like

```json
{
  "instruction": "move",
  "row": «index»,
  "column": «index»
}
```
