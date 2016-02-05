'use strict';
const myApp = {
  baseURL: 'http://tic-tac-toe.wdibos.com',
};


let players = ['<img src="http://icons.iconarchive.com/icons/bingxueling/fruit-vegetables/128/apple-red-icon.png"/>', '<img src="http://pngimg.com/upload/orange_PNG766.png">', '<img src= "http://www.altitudementalhealth.com/wp-content/uploads/2014/01/Apple-and-Orange-tied-together-7509690-300x200.jpg"/>'];
let count = 0;
let gameboard =['', '', '', '', '', '', '', '', ''];
let playerScore = [0,0];
let tieScore = 0;

let game = {
  over: false,
};


const reset = function(){
  count = 0;
  gameboard =['', '', '', '', '', '', '', '', ''];
  $('#winner').hide();
  $('.board').children().html("");
  $('#announcement').html("Player 1: Apple turn!").show();
};

const tie = function(){
  if(count === 9){
    tieScore += 1;
    // $('.board').hide();
    $('#winner').html('Oh No! A Tie!' + players[2]).show();
    $('#tie').html(tieScore);
    $('#announcement').hide();
    game.over =true;
  }
};

const getWinner = function(player, value, game){
  if(((gameboard[0] === value) && (gameboard[1] === value) &&(gameboard[2] === value)) ||
    ((gameboard[3] === value) && (gameboard[4] === value) &&(gameboard[5] === value)) ||
    ((gameboard[6] === value) && (gameboard[7] === value) && (gameboard[8] === value)) ||
    ((gameboard[0] === value) && (gameboard[3] === value) &&(gameboard[6] === value)) ||
    ((gameboard[1] === value) && (gameboard[4] === value) &&(gameboard[7] === value)) ||
    ((gameboard[2] === value) && (gameboard[5] === value) &&(gameboard[8] === value)) ||
    ((gameboard[0] === value) && (gameboard[4] === value) &&(gameboard[8] === value)) ||
    ((gameboard[2] === value) && (gameboard[4] === value) &&(gameboard[6] === value)) )
  {
    $('#announcement').hide();
    $('#winner').html("winner is " + players[player]).show();
    game.over = true;
    count = 0;
    playerScore[player] += 1;
    if(value ==='x'){
      $('#x').html(playerScore[player]);
    }
    else if(value ==='o'){
      $('#o').html(playerScore[player]);
    }
  }
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
    console.log(data);
  })
  .fail(function(jqxhr) {
    console.error(jqxhr);
  });
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



let hide = function(){
  $('.board').hide();
  $('#reset').hide();
  $('#announcement').hide();
  $('table').hide();
};
$(document).ready(function() {
  hide();

  $('#sign-up').on('submit', function(e) {
    e.preventDefault();
    var formData = new FormData(e.target);
    $.ajax({
      url: myApp.baseURL + '/sign-up',
      // url: 'http://httpbin.org/post',
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
  });


  $('#sign-in').on('submit', function signin(e) {
    e.preventDefault();
    var formData = new FormData(e.target);
    $.ajax({
      url: myApp.baseURL + '/sign-in',
      // url: 'http://httpbin.org/post',
      method: 'POST',
      contentType: false,
      processData: false,
      data: formData,
    }).done(function(data) {
      myApp.user = data.user;
      console.log(data);
      createGame();
      $('.board').show();
      $('#reset').show();
      $('#announcement').show();
      $('table').show();
    }).fail(function(jqxhr) {
      console.error(jqxhr);
    });
  });

  $('#sign-out').on('submit', function(e) {
    e.preventDefault();
    var formData = new FormData(e.target);
    $.ajax({
      url: myApp.baseURL + '/sign-out/' + myApp.user.id,
      // url: 'http://httpbin.org/post',
      method: 'DELETE',
      headers: {
      Authorization: 'Token token=' + myApp.user.token,
      },
      contentType: false,
      processData: false,
      data: formData,
    }).done(function(data) {
      console.log(data);
      hide();
    }).fail(function(jqxhr) {
      console.error(jqxhr);
    });
  });

  $('#change-password').on('submit', function(e) {
    e.preventDefault();
    if (!myApp.user) {
      console.error('Wrong!');
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
      console.log('successful data');
      console.log(data);
    }).fail(function(jqxhr) {
      console.error(jqxhr);
    });
  });
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
      console.log("showgame");
      console.log(myApp.game);
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
      "over": false
      }
    }
  })
  .done(function(data){
    myApp.game = data.game;
    console.log(data);
    showGame();
  })
  .fail(function(jqxhr) {
    console.error(jqxhr);
  });
};

  $('#winner').hide();
  $('.board').children().click(function() {
    if(game.over === false) {
      if($(this).html() === '') {
        if(count % 2 === 0){
          $(this).html(players[0]);
          gameboard[event.target.id] ='x';
          updateGame('x',event.target.id);
          // alert(event.target.id);
          console.log(gameboard);
          $('#announcement').html("Player 2: Orange turn!");
          getWinner(0, 'x', game);
          count +=1;
          tie();

        }
        else {
          $(this).html(players[1]);
          gameboard[event.target.id] ='o';
          updateGame('o',event.target.id);
          // alert(event.target.id);
          console.log(gameboard);
          $('#announcement').html("Player 1: Apple turn!");
          getWinner(1, 'o', game);
          count +=1;
          tie();
        }
      }
    }
  });

    $('#reset').click(function() {
      reset();
      game.over = false;
    });
});
module.exports = true;
