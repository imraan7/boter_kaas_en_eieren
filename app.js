var express = require('express');
var app = express();

var bodyParser = require('body-parser')

app.use(express.static('public'));

app.use(bodyParser.json()); //support json-encoded bodies
app.use(bodyParser.urlencoded({ //support url-encoded bodies
    extended: true
}))

const initialGame = {
    playfield: [
        ['', '', '', ],
        ['', '', '', ],
        ['', '', '']
    ],
    turn: false,
    player1: "X",
    player2: "O",
    counter: 0,
}
var game = Object.assign({}, initialGame)

const initialResult = {
    status : "playing",
    winner : "",
    turn : game.turn
}
var result = Object.assign({}, initialResult)

app.get('/playfield', function(req, res) {
    res.send(game.playfield)
});

app.post('/turn', function(req, res) {
    const row = req.body.row
    const col = req.body.col

    if ("undefined" === typeof game.playfield[row] || "undefined" === typeof game.playfield[row][col]) {
        return res.send("je kan me niet hacken")
    } else if (row > 3 || col > 3) {
        return res.send("je kan me niet hacken")
    }

    var found = false

    //turn bepalen
    if (game.counter % 2 === 0) {
        game.turn = false
    }
    if (game.counter % 2 === 1) {
        game.turn = true
    }
    console.log(game.playfield);
    //controleer of een aangeklikte vak al bezet is
    if (game.playfield[row][col] !== '') {
        game.counter = game.counter - 1 // reset de turn
        found = true
    }

    //plaats de zet in de array
    if (found == false) {
        if (game.turn === false) {
            game.playfield[row][col] = game.player1;
        } else {
            game.playfield[row][col] = game.player2;
        }
    }

    //zet beurt aan de tegenstander
    game.counter++

    if(game.counter === 9){
        result.status = "ended"
        result.winner = "draw"
    }
    //horizontaal
    if (game.playfield[0][0] === game.playfield[1][0] && game.playfield[0][0] === game.playfield[2][0]) {
        if (game.playfield[0][0] === game.player1) {
            result.status = "ended"
            result.winner = game.player1
        } else if (game.playfield[0][0] === game.player2) {
            result.status = "ended"
            result.winner = game.player2
        }
    }
    if (game.playfield[0][1] === game.playfield[1][1] && game.playfield[0][1] === game.playfield[2][1]) {
        if (game.playfield[0][1] === game.player1) {
            result.status = "ended"
            result.winner = game.player1
        } else if (game.playfield[0][1] === game.player2) {
            result.status = "ended"
            result.winner = game.player2
        }
    }
    if (game.playfield[0][2] === game.playfield[1][2] && game.playfield[0][2] === game.playfield[2][2]) {
        if (game.playfield[0][2] === game.player1) {
            result.status = "ended"
            result.winner = game.player1
        } else if (game.playfield[0][2] === game.player2) {
            result.status = "ended"
            result.winner = game.player2
        }
    }
    //verticaal
    if (game.playfield[0][0] === game.playfield[0][1] && game.playfield[0][0] === game.playfield[0][2]) {
        if (game.playfield[0][0] === game.player1) {
            result.status = "ended"
            result.winner = game.player1
        } else if (game.playfield[0][0] === game.player2) {
            result.status = "ended"
            result.winner = game.player2
        }
    }
    if (game.playfield[1][0] === game.playfield[1][1] && game.playfield[1][0] === game.playfield[1][2]) {
        if (game.playfield[1][0] === game.player1) {
            result.status = "ended"
            result.winner = game.player1
        } else if (game.playfield[1][0] === game.player2) {
            result.status = "ended"
            result.winner = game.player2
        }
    }
    if (game.playfield[2][0] === game.playfield[2][1] && game.playfield[2][0] === game.playfield[2][2]) {
        if (game.playfield[2][0] === game.player1) {
            result.status = "ended"
            result.winner = game.player1
        } else if (game.playfield[2][0] === game.player2) {
            result.status = "ended"
            result.winner = game.player2
        }
    }
    //kruislings
    if (game.playfield[0][0] === game.playfield[1][1] && game.playfield[0][0] === game.playfield[2][2]) {
        if (game.playfield[0][0] === game.player1) {
            result.status = "ended"
            result.winner = game.player1
        } else if (game.playfield[0][0] === game.player2) {
            result.status = "ended"
            result.winner = game.player2
        }
    }
    if (game.playfield[2][0] === game.playfield[1][1] && game.playfield[2][0] === game.playfield[0][2]) {
        if (game.playfield[2][0] === game.player1) {
            result.status = "ended"
            result.winner = game.player1
        } else if (game.playfield[2][0] === game.player2) {
            result.status = "ended"
            result.winner = game.player2
        }
    }

    res.send(result)
});
app.delete('/turn', function(req, res) {
    game = Object.assign({}, initialGame)
    game.playfield = [
        ['', '', '', ],
        ['', '', '', ],
        ['', '', '']
    ]
    result = Object.assign({}, initialResult)
    res.send(game.playfield)
});
app.listen(3000, function() {
    console.log('App listening on port 3000');
})
