document.getElementById('r00').addEventListener('click',selectr00);
document.getElementById('r01').addEventListener('click',selectr01);
document.getElementById('r02').addEventListener('click',selectr02);
document.getElementById('r10').addEventListener('click',selectr10);
document.getElementById('r11').addEventListener('click',selectr11);
document.getElementById('r12').addEventListener('click',selectr12);
document.getElementById('r20').addEventListener('click',selectr20);
document.getElementById('r21').addEventListener('click',selectr21);
document.getElementById('r22').addEventListener('click',selectr22);
document.getElementById('start').addEventListener('click',start);
document.getElementById('reset').addEventListener('click',reset);
document.getElementById('ai').addEventListener('click',ai);

var t = [[0,0,0],
         [0,0,0],
         [0,0,0]]; //Track array

var l = [[0,0,0],
        [0,0,0],
        [0,0,0]]; //Lock array; 0 = lock (user wont be able to change) 1 =


var turn = 'a';// a->p1 / b->p2
var move = 0;
var start = 0;
var promptSymbol = 0;
var playerA, playerB; //To track player's choice of symbol(Ticker)


//-----AI-----

//Senseless Random
function ai(){
  //console.log("It's player "+turn+'\'s turn!')

  var aiz = ['r'];
  var x, y;
  var zz = 0;

  while(zz === 0){
    x = Math.floor((Math.random()*3));//Randomly generates row index
    y = Math.floor((Math.random()*3));//Randomly generates column index
    aiz.push(y); aiz.push(x); //Pushes row and column indexes into
    id = document.getElementById(aiz.join('')).id;
    console.log('AI chose ' + aiz.join(''));
    if (t[y][x]===0){
      playerToggle();
      t[y][x] = turn;
      marker();
      checkWin();
      zz = 1;//To exit while-loop
      }
    else if(move<9) {
          aiz = ['r']; x = 0; y = 0;
          }
          else {
            document.getElementById("status").innerHTML = "It's a DRAW! Click \'Reset\' to replay the game :)";
          }
        }
  }

function checkWin(){
  var check = '';//init check string to empty
  console.log('Checking Win...')
  if(move === 9){
    document.getElementById("status").innerHTML = "It's a DRAW! Click \'Reset\' to replay the game :)";
  }
  else if(move>=4){
      //---Horizontal Tally---
        console.log('Horizontal Tallying!');
        for(i=0; i<t.length; i++){
          console.log('Horizontal Tallying!');
          check = t[i].join('');
          console.log('Horizontal Checking: ');
            if(check === 'aaa' || check === 'bbb'){
              if(turn='a'){
                document.getElementById("status").innerHTML = "Player A Horizontal win!";
                check ='';
              }
              else {
                document.getElementById("status").innerHTML = "Player B Horizontal win!";
                check ='';
              }
            }
            else{
              check = '';
              console.log('No horizontals || Resetting check to:' , check);
              console.log(t[0]);
              console.log(t[1]);
              console.log(t[2]);
            }
            check = '';
          }//End of  Horizontal Tally For-loop


        //---Vertical Tally---
        var y=[];//empty array for vertical tally
        console.log('Vertical Tallying!');
        for(i=0;i<t.length;i++){ // i = column
          for(j=0;j<t.length;j++){ //j=row
            y.push(t[j][i]);
            console.log('Horizontal Checking: ' + y);
          }
          check = y.join('');

          if(check === 'aaa' || check === 'bbb'){
            if(turn='a'){
              document.getElementById("status").innerHTML = "Player A Vertical wins!";
              check ='';
              }
            else {
              document.getElementById("status").innerHTML = "Player B Vertical wins!";
              check ='';
              }
            }
          else{
              check ='';//reset check
              y = [];
              console.log('No Verticals || Resetting Check to ' , check);
              console.log(t[0]);
              console.log(t[1]);
              console.log(t[2]);
              }
          }//Vertical Tally end


        //-----Diagonal Back Tally-----

        var xy = [];//empty array for diagonal tally
        console.log('Diagonal Back Tallying! Checking on xy[]--> ', xy);
        for(i=0;i<t.length;i++){ // i = column
          xy.push(t[i][i]);
        }
          check = xy.join('');
          console.log('Checking' , check);

          if(check==="aaa" || check ==="bbb" ){

              if(turn='a'){
                document.getElementById("status").innerHTML = "Player A Diagonal win!";
                check ='';
                xy = [];
                }
              else {
                document.getElementById("status").innerHTML = "Player B Diagonal win!";
                check ='';
                xy = [];
                }
              }

          else{
              check ='';//reset check
              xy = [];
              console.log('No diagonals || Resetting variable \'check\'');
              console.log(t[0]);
              console.log(t[1]);
              console.log(t[2]);
              }

        //-----Diagonal Forward Tally
        console.log('Diagonal Forward Tallying! Checking on xy[]-->' + xy )

        xy.push(t[0][2]);
        xy.push(t[1][1]);
        xy.push(t[2][0]);

        check = xy.join('');
        if(check === 'aaa' || check === 'bbb'){
          if(turn='a'){
            document.getElementById("status").innerHTML = "Player A Diagonal win!";
            check ='';
            }
          else {
            document.getElementById("status").innerHTML = "Player B Diagonal win!";
            check ='';
            }
          }
        else{
            check ='';//reset check
            y = [];
            console.log('No Verticals || Resetting Check to ' , check);
            console.log(t[0]);
            console.log(t[1]);
            console.log(t[2]);
            }

    }//End of if(move>=4)
    else{
          console.log('To early to check... Check in ' + (4 - move) + ' more moves' );
          }
  }//checkWin() end


//-----Function for Row 0 cells-----

function selectr00(){
  id = document.getElementById('r00').id
  var idArr = id.split('');
  var idx = idArr.pop(); var idy = idArr.pop();

    if(l[idy][idx]===0){
      if(start === 0){
            lock(idy,idx)
            chooseTicker(id);
            }
           else if(start === 1){
            selectEngine(id);
            }
      }
      else{
        alert("You shall not pass!");
      }
  }
function selectr01(){
  id = document.getElementById('r01').id;
  var idArr = id.split('');
  var idx = idArr.pop(); var idy = idArr.pop();

    if(l[idy][idx]===0){
      if(start === 0){
            lock(idy,idx)
            chooseTicker(id);
            }
           else if(start === 1){
            selectEngine(id);
            }
      }
    else{
        alert("Player A needs to select X or O first!");
      }
}
function selectr02(){
  id = document.getElementById('r02').id;
  var idArr = id.split('');
  var idx = idArr.pop(); var idy = idArr.pop();

    if(l[idy][idx]===0){
      if(start === 0){
            lock(idy,idx)
            chooseTicker(id);
            }
           else if(start === 1){
            selectEngine(id);
            }
      }
    else{
        alert("Player A needs to select X or O first!");
      }
}

//-----Function for Row 1 cells-----
function selectr10(){
  id = document.getElementById('r10').id;
  var idArr = id.split('');
  var idx = idArr.pop(); var idy = idArr.pop();

    if(l[idy][idx]===0){
      if(start === 0){
            lock(idy,idx)
            chooseTicker(id);
            }
           else if(start === 1){
            selectEngine(id);
            }
      }
    else{
        alert("Player A needs to select X or O first!");
      }
}
function selectr11(){
  id = document.getElementById('r11').id;
  var idArr = id.split('');
  var idx = idArr.pop(); var idy = idArr.pop();

    if(l[idy][idx]===0){
      if(start === 0){
            lock(idy,idx)
            chooseTicker(id);
            }
           else if(start === 1){
            selectEngine(id);
            }
      }
    else{
        alert("Player A needs to select X or O first!");
      }
  }
function selectr12(){
  id = document.getElementById('r12').id;
  var idArr = id.split('');
  var idx = idArr.pop(); var idy = idArr.pop();

    if(l[idy][idx]===0){
      if(start === 0){
            lock(idy,idx)
            chooseTicker(id);
            }
           else if(start === 1){
            selectEngine(id);
            }
      }
    else{
        alert("Player A needs to select X or O first!");
      }
  }

//-----Function for Row 1 cells-----
function selectr20(){
  id = document.getElementById('r20').id;
  var idArr = id.split('');
  var idx = idArr.pop(); var idy = idArr.pop();

    if(l[idy][idx]===0){
      if(start === 0){
            lock(idy,idx)
            chooseTicker(id);
            }
           else if(start === 1){
            selectEngine(id);
            }
      }
    else{
        alert("Player A needs to select X or O first!");
      }
  }
function selectr21(){
  id = document.getElementById('r21').id;
  var idArr = id.split('');
  var idx = idArr.pop(); var idy = idArr.pop();

    if(l[idy][idx]===0){
      if(start === 0){
            lock(idy,idx)
            chooseTicker(id);
            }
           else if(start === 1){
            selectEngine(id);
            }
      }
    else{
        alert("Player A needs to select X or O first!");
      }
  }
function selectr22(){
  id = document.getElementById('r22').id;
  var idArr = id.split('');
  var idx = idArr.pop(); var idy = idArr.pop();

    if(l[idy][idx]===0){
      if(start === 0){
            lock(idy,idx)
            chooseTicker(id);
            }
           else if(start === 1){
            selectEngine(id);
            }
      }
    else{
        alert("Player A needs to select X or O first!");
      }
  }

//-----Functions for player selction-----

function lock(y,x){
  for(i=0; i<l.length; i++){
    for(j=0;j<l.length; j++){
      l[i][j] = 1
    }
  }
  l[y][x] = 0
}

function chooseTicker(id2check){
  document.getElementById('status').innerHTML="<h2 id=\"status\">Click within the same cell to select between X or O then select 'Start'</h2>"
  foo = document.getElementById(id2check).textContent;
    if(promptSymbol === 0 ){
      document.getElementById(id2check).textContent = 'X';
      promptSymbol = 1;
      }
    else if(foo ==='X'){
      document.getElementById(id2check).textContent = 'O';
      }
      else{
        document.getElementById(id2check).textContent = 'X';
      }
    }

function start(){// linked to eventListener at button 'start'
  l = [[0,0,0],
      [0,0,0],
      [0,0,0]];
  start = 1;
  var g=['r'];
  var ticker; //To store first player's ticker choice

  for(i=0; i<t.length; i++){
    for(j=0;j<t.length; j++){
      g.push(i); g.push(j);
      id = g.join('');
      ticker = document.getElementById(id).textContent;

      if(ticker==='X'){
        playerA = ticker;
        playerB = 'O'; //Stores ticker to variable playerA
        document.getElementById('status').innerHTML="<h1 id=\"status\">Player <span id=\"player\">B\'s turn!</span></h1>";
        turn = 'b';
        }
      else if(ticker==='O') {
        playerA = 'O';
        playerB = 'X';
        document.getElementById('status').innerHTML="<h1 id=\"status\">Player <span id=\"player\">B\'s turn!</span></h1>";
        turn = 'b';
        }
      g=['r'];
      }//End of j-For loop
    }//End of i-For loop
}

function selectEngine(id2check){
  var idArr = id2check.split('');
  var x = idArr.pop(); var y = idArr.pop();
  console.log(x,y);
  if (t[y][x]=== 0){
    playerToggle();
    t[y][x] = turn;
    marker();
    checkWin()
    }
  else{
    alert("Choose another cell");
    }
  }

function playerToggle(){
  var p = document.getElementById('player').textContent;
  //console.log("Player "+p+" detected");

  if(p==='A\'s turn!'){
    document.getElementById('player').textContent = "B\'s turn!";
    }
    else{
      document.getElementById('player').textContent = "A\'s turn!";
    }
  }

function marker(){

    if(turn==='a'){
      document.getElementById(id).textContent = playerA;
      turn = 'b';
      }
    else if(turn==='b'){
          document.getElementById(id).textContent = playerB;
          turn = 'a';
          }
  move++;
  }

function reset(){
  //console.log('Click@Reset');
  turn = 'a';
  start = 0;
  promptSymbol = 0;
  move = 0;
  t = [[0,0,0],
       [0,0,0],
       [0,0,0]];
  document.getElementById('status').innerHTML = '<h1 id="status">Player <span id="player">A\'s turn!</span></h1>';

  var z =['r'];
    for(i=0; i<t.length; i++){
      for (j=0; j<t[i].length; j++) {
        z.push(i);
        z.push(j);
        document.getElementById(z.join('')).textContent = '';
        z = ['r'];//reset z[]
      }}
}
