'use strict';

let players = ['<img src="http://icons.iconarchive.com/icons/bingxueling/fruit-vegetables/128/apple-red-icon.png"/>', '<img src="http://pngimg.com/upload/orange_PNG766.png">', '<img src= "http://www.altitudementalhealth.com/wp-content/uploads/2014/01/Apple-and-Orange-tied-together-7509690-300x200.jpg"/>'];
let count = 0;
let gameboard =['', '', '', '', '', '', '', '', ''];
let playerScore = [0,0];
let tieScore = 0;



const reset = function(){
  count = 0;
  gameboard =['', '', '', '', '', '', '', '', ''];
  $('#winner').hide();
  $('.board').children().html("");
  // $('.board').show();
  $('#announcement').html("Player 1: Apple turn!").show();

};

const tie = function(){
  if(count === 9){
    tieScore += 1;
    // $('.board').hide();
    $('#winner').html('Oh No! A Tie!' + players[2]).show();
    $('#tie').html(tieScore);
    $('#announcement').hide();

  }
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
      // $('.board').hide();
      $('#announcement').hide();
      $('#winner').html("winner is " + players[player]).show();

      playerScore[player] += 1;
      if(value ==='x'){
        $('#x').html(playerScore[player]);
      }
      else if(value ==='o'){
        $('#o').html(playerScore[player]);
      }



  }
};


$(document).ready(function() {
  $('#winner').hide();
    $('.board').children().click(function() {
      if($(this).html() === '') {
        if(count % 2 === 0){
          $(this).html(players[0]);
          count +=1;
          gameboard[event.target.id] ='x';
          // alert(event.target.id);
          console.log(gameboard);
          $('#announcement').html("Player 2: Orange turn!");
          getWinner(0, 'x');
          tie();

        }
        else {
          $(this).html(players[1]);
          count +=1;
          gameboard[event.target.id] ='o';
          // alert(event.target.id);
          console.log(gameboard);
          $('#announcement').html("Player 1: Apple turn!");
          getWinner(1, 'o');
          tie();
        }
      }
    });


    $('#reset').click(function() {
      reset();
    });
});
module.exports = true;
