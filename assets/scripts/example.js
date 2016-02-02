'use strict';

let players = ['X', 'O'];
let count = 0;
let gameboard =['', '', '', '', '', '', '', ''];


const reset = function(){
  count = 0;
  gameboard =['', '', '', '', '', '', '', ''];
  $('.board').children().html("");

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
      alert("winner is " + players[player]);
      reset();
  }
};


$(document).ready(function() {

    $('.board').children().click(function() {
      if($(this).html() === '') {
        if(count % 2 === 0){
          $(this).html(players[0]);
          count +=1;
          gameboard[event.target.id] ='x';
          alert(event.target.id);
          alert(gameboard);
          getWinner(0, 'x');
        }
        else {
          $(this).html(players[1]);
          count +=1;
          gameboard[event.target.id] ='o';
          alert(event.target.id);
          alert(gameboard);
          getWinner(1, 'o');
        }
      }
    });

    $('#reset').click(function() {
      reset();
    });
});
module.exports = true;
