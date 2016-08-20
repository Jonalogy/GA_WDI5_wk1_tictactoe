document.getElementById('r00').addEventListener('click',selectr00);
document.getElementById('r01').addEventListener('click',selectr01);
document.getElementById('r02').addEventListener('click',selectr02);
document.getElementById('r10').addEventListener('click',selectr10);
document.getElementById('r11').addEventListener('click',selectr11);
document.getElementById('r12').addEventListener('click',selectr12);
document.getElementById('r20').addEventListener('click',selectr20);
document.getElementById('r21').addEventListener('click',selectr21);
document.getElementById('r22').addEventListener('click',selectr22);
document.getElementById('reset').addEventListener('click',reset);

var t = [[0,0,0],
         [0,0,0],
         [0,0,0]]; //Track cell

var turn = 0;// Track turn select 0-> gameReset / 1->p1 / 2->p2


//-----Function for Row 0 cells-----

function selectr00(){
  console.log("Click@r00");
  id = document.getElementById('r00').id;
  if (t[0][0]===0){
    playerToggle();//Changes player's turn
    t[0][0] = 1;
    marker();
  }

  else{
    alert("Choose another cell");
  }
}

function selectr01(){
  console.log("Click@r01");
  id = document.getElementById('r01').id;
  if (t[0][1]===0){
    playerToggle();
    t[0][1] = 1
    marker();

  }
  else{
    alert("Choose another cell");
  }
}

function selectr02(){
  console.log("Click@r02");
  id = document.getElementById('r02').id;
  if (t[0][2]===0){
    playerToggle();
    t[0][2] = 1
    marker();
  }
  else{
    alert("Choose another cell");
  }
}

//-----Function for Row 1 cells-----
function selectr10(){
  id = document.getElementById('r10').id;
  if (t[1][0]===0){
    playerToggle();//Changes player's turn
    t[1][0] = 1;
    marker();
  }
  else{
    alert("Choose another cell");
  }
}

function selectr11(){
  id = document.getElementById('r11').id;
  if (t[1][1]===0){
    playerToggle();
    t[1][1] = 1
    marker();

  }
  else{
    alert("Choose another cell");
  }
}

function selectr12(){
  id = document.getElementById('r12').id;
  if (t[1][2]===0){
    playerToggle();
    t[1][2] = 1
    marker();
  }
  else{
    alert("Choose another cell");
  }
}

//-----Function for Row 1 cells-----
function selectr20(){
  id = document.getElementById('r20').id;
  if (t[2][0]===0){
    playerToggle();//Changes player's turn
    t[2][0] = 1;
    marker();
  }
  else{
    alert("Choose another cell");
  }
}

function selectr21(){
  id = document.getElementById('r21').id;
  if (t[2][1]===0){
    playerToggle();
    t[2][1] = 1
    marker();

  }
  else{
    alert("Choose another cell");
  }
}

function selectr22(){
  id = document.getElementById('r22').id;
  if (t[2][2]===0){
    playerToggle();
    t[2][2] = 1
    marker();
  }
  else{
    alert("Choose another cell");
  }
}



//-----Functions for player selction-----

function playerToggle(){
  var p = document.getElementById('player').textContent;
  //console.log("Player "+p+" detected");

  if(p==='1'){
    document.getElementById('player').textContent = '2';
    turn = 1;
  }
    else{
      document.getElementById('player').textContent = '1';
      turn = 2;
    }
}

function marker(){
  if(turn===1){
    document.getElementById(id).style.backgroundColor = 'red';
    turn = 2;
  }
  else if(turn===2){
    document.getElementById(id).style.backgroundColor = 'blue';
    turn = 2;
 }
 //console.log(t[0],t[1],t[2], "Turn = "+ turn);
}

function reset(){
  console.log('Click@Reset');
  turn = 0;
  t = [[0,0,0],
       [0,0,0],
       [0,0,0]];
  console.log('Array t = '+ t[0],t[1],t[2]);

  var z =['r'];
  for(i=0; i<t.length; i++){
    for (j=0; j<t[i].length; j++){
      z.push(i);
      z.push(j);
      document.getElementById(z.join('')).style.backgroundColor = 'white';
      z =['r'];//reset z[]
    }
  }
document.getElementById('player').textContent = '1';
}
