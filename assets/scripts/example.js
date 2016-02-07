'use strict';
const myApp = {
  baseURL: 'http://tic-tac-toe.wdibos.com',
};

let players = ['<img src= "http://www.altitudementalhealth.com/wp-content/uploads/2014/01/Apple-and-Orange-tied-together-7509690-300x200.jpg"/>',
'<img src="http://icons.iconarchive.com/icons/bingxueling/fruit-vegetables/128/apple-red-icon.png"/>',
'<img src="http://pngimg.com/upload/orange_PNG766.png">'];
let count = 0;
let gameboard =['', '', '', '', '', '', '', '', ''];
let scoreBoard = [0, 0, 0];  //tie, player 1('x'): apple, player 2('o'): orrange
let announcer = ["Oh no! It's a tie!", "Winner is  "]; // will display with an image of the tie staus or winner
// underneath the statement.
let game = {
  over: false,
};

let getUserGames = function(){ /// put index and player
  $.ajax({
    url: myApp.baseURL + '/games',
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + myApp.user.token,
    },
    data: {}
  })
  .done(function(data){
    console.log(data.games.length);
    $('#gameCounter').html(data.games.length);
  })
  .fail(function(jqxhr) {
    console.error(jqxhr);
  });
};

let winOrTie = function(announcer, index, player) {
  $('#announcement').hide();
  $('#winner').html(announcer[index] + players[player]).show();
  getUserGames();
  game.over =true;
  count = 0;
  scoreBoard[player] += 1;
};

const tie = function(){
  if(count === 9){
    winOrTie(announcer, 0, 0);
    $('#tie').html(scoreBoard[0]);
  }
};

let createGame = function() {
  $.ajax({
    url: myApp.baseURL + '/games',
    method: 'POST',
    headers: {
      Authorization: 'Token token=' + myApp.user.token,
    },
    data: {}
  })
  .done(function(data){
    myApp.game = data.game;
    console.log(data);
  })
  .fail(function(jqxhr) {
    console.error(jqxhr);
  });
};

const reset = function(){
  count = 0;
  gameboard =['', '', '', '', '', '', '', '', ''];
  $('#winner').hide();
  $('.board').children().html("");
  $('#announcement').html("Player 1: Apple turn!").show();
  createGame();
  getUserGames();
};

let resetGame = function(){
  $('#reset').click(function() {
    reset();
    game.over = false;
  });
};


const getWinner = function(player, value){
  if(((gameboard[0] === value) && (gameboard[1] === value) &&(gameboard[2] === value)) ||
    ((gameboard[3] === value) && (gameboard[4] === value) &&(gameboard[5] === value)) ||
    ((gameboard[6] === value) && (gameboard[7] === value) && (gameboard[8] === value)) ||
    ((gameboard[0] === value) && (gameboard[3] === value) &&(gameboard[6] === value)) ||
    ((gameboard[1] === value) && (gameboard[4] === value) &&(gameboard[7] === value)) ||
    ((gameboard[2] === value) && (gameboard[5] === value) &&(gameboard[8] === value)) ||
    ((gameboard[0] === value) && (gameboard[4] === value) &&(gameboard[8] === value)) ||
    ((gameboard[2] === value) && (gameboard[4] === value) &&(gameboard[6] === value)) )
  {
    winOrTie(announcer, 1, player);
    if(value ==='x'){
      $('#x').html(scoreBoard[player]);
    }
    else if(value ==='o'){
      $('#o').html(scoreBoard[player]);
    }
  }
};

let resetScoreBoard = function(){
  $('#x').html("0");
  $('#o').html("0");
  $('#tie').html("0");
  scoreBoard = [0, 0, 0];
};


let hide = function(){
  $('.board').hide();
  $('#reset').hide();
  $('#announcement').hide();
  $('table').hide();
  $('#gameHistory').hide();
  $('#winner').hide();
};

let show = function(){
  $('.board').show();
  $('#reset').show();
  $('#announcement').show();
  $('table').show();
  $('#gameHistory').show();
  $('#winner').hide();
};


let signUp = function(e) {
    e.preventDefault();
    var formData = new FormData(e.target);
    $.ajax({
      url: myApp.baseURL + '/sign-up',
      method: 'POST',
      contentType: false,
      processData: false,
      data: formData,
    }).done(function(data) {
      myApp.user = data.user;
      console.log(data);
    }).fail(function(jqxhr) {
      console.error(jqxhr);
    });
  };


let signIn = function(e){
  e.preventDefault();
  var formData = new FormData(e.target);
  $.ajax({
    url: myApp.baseURL + '/sign-in',
    method: 'POST',
    contentType: false,
    processData: false,
    data: formData,
  })
  .done(function(data) {
    myApp.user = data.user;
    console.log(data);
    reset();
    resetScoreBoard();
    game.over = false;
    show();

  })
  .fail(function(jqxhr) {
    console.error(jqxhr);
  });
};

let signOut = function(e) {
  e.preventDefault();
  var formData = new FormData(e.target);
  $.ajax({
    url: myApp.baseURL + '/sign-out/' + myApp.user.id,
    method: 'DELETE',
    headers: {
    Authorization: 'Token token=' + myApp.user.token,
    },
    contentType: false,
    processData: false,
    data: formData,
  })
  .done(function(data) {
    console.log(data);
    hide();
  })
  .fail(function(jqxhr) {
    console.error(jqxhr);
  });
};

let changePassword = function(e) {
  e.preventDefault();
  if (!myApp.user) {
    alert('Wrong password!');
    return;
  }
  var formData = new FormData(e.target);
  $.ajax({
    url: myApp.baseURL + '/change-password/' + myApp.user.id,
    // url: 'http://httpbin.org/post',
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + myApp.user.token,
    },
    contentType: false,
    processData: false,
    data: formData,
  }).done(function(data) {
    console.log(data);
  }).fail(function(jqxhr) {
    console.error(jqxhr);
  });
};

let showGame = function(){ /// put index and player
  $.ajax({
    url: myApp.baseURL + '/games/' + myApp.game.id,
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + myApp.user.token,
    },
    data: {}
  })
  .done(function(data){
    myApp.game = data.game;
    console.log(data);
    getUserGames();
  })
  .fail(function(jqxhr) {
    console.error(jqxhr);
  });
};


let updateGame = function(player, index){ /// put index and player
  $.ajax({
    url: myApp.baseURL + '/games/' + myApp.game.id,
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + myApp.user.token,
    },
    data: {
      "game": {
        "cell": {
          "index": index,
          "value": player,
        },
      // "over": true
      }
    }
  })
  .done(function(data){
    myApp.game = data.game;
    getUserGames();
    console.log(data);
    showGame();
  })
  .fail(function(jqxhr) {
    console.error(jqxhr);
  });
};

let startGame = function(player, letter, announcePlayer, fruit){
  gameboard[event.target.id] = letter;
  updateGame(letter, event.target.id);
  $('#announcement').html('Player ' + announcePlayer + ' : ' + fruit +  ' turn!');
  getWinner(player, letter);
  count +=1;
  tie();
};

let playGame = function(){
  $('#winner').hide();
  $('.board').children().click(function() {
    if(game.over === false) {
      if($(this).html() === '') {
        if(count % 2 === 0){
          startGame(1, 'x', 2, 'Orange');
          $(this).html(players[1]);
        }
        else {
          startGame(2, 'o', 1, 'Apple');
          $(this).html(players[2]);
        }
      }
    }
  });
};

let init = function() {
  $('#sign-up').on('submit', signUp);
  $('#sign-in').on('submit', signIn);
  $('#sign-out').on('submit', signOut);
  $('#change-password').on('submit', changePassword);
};

$(document).ready(function() {
  hide();
  playGame();
  init();
  resetGame();
});

module.exports = true;
