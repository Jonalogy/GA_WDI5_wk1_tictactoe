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
         [0,0,0]]; //Board Tracking Array. Inner array will be termed as the row array t[x]. The encasing array is the column array t[y]e.

var l = [[0,0,0],
        [0,0,0],
        [0,0,0]]; //Lock array; 0: lock (user wont be able to change)


var turn = 'a';// a = plater 1 (p1)
var move = 0; //One round has a maximum of  9 moves.
var start = 0; //Tracks if game has started
var promptSymbol = 0;
var playerA, playerB; //To keep track player's choice of ticker(symbol)


//-----AI-----

// function aiTest() {
//   var empty = [];
//   var aiz = ['r'];
//   var ii;
//
//   for (i=0; i<t.length; i++){
//       for (j=0;j<t.length; j++){
//         if (t[i][j]===0){
//           aiz.push(i); aiz.push(j);
//           ii=aiz.join('');
//           empty.push(ii);
//           aiz = ['r'];
//         }
//       }
//     }
//
//   emptyCellsLeft = empty.length;
//   emptyRandom = Math.floor((Math.random()*emptyCellsLeft));
//
//   ii = 0;// Reset
//   empty = []// Reset
// }


//Senseless Random
function ai(){
  var aiz = ['r'];
  var x, y;
  var zz = 0;//To aid in radom cell selection

  while(zz === 0){ //Randomly chooses a cell
    idx = Math.floor((Math.random()*3));//Randomly generates row index
    idy = Math.floor((Math.random()*3));//Randomly generates column index
    aiz.push(idy); aiz.push(idx); //Pushes row and column indexes into
    id = aiz.join('');//Creates row ID

    if(l[idy][idx]===0){
      if(start === 0){
            lock(idy,idx)
            chooseTicker(id);
            return;
            }
           else if(start === 1){
            selectEngine(id,true);
            }
      }
    // if (t[y][x]===0){
    //   playerToggle();
    //   t[y][x] = turn;
    //   marker();
    //   checkWin();
    //   zz = 1;//To exit while-loop
    //   }
    else if(move<9) {
          aiz = ['r']; x = 0; y = 0;
          }
          else {
            document.getElementById("status").innerHTML = "It's a DRAW! Click \'Reset\' to replay the game :)";
          }
        }
  }


//-----Win Tally Logic-----
function checkWin(){
  var check = '';//init check string to empty
  console.log('Checking Win...')
  if(move === 9){ //checks if 9 moves have been made, if yes game is tied!
    document.getElementById("status").innerHTML = "It's a DRAW! Click \'Reset\' to replay the game :)";
  }
  else if(move>4){ //Only starts checking after 5 moves have been made!
      //---Horizontal Tally---
        console.log('Horizontal Tallying!', t[0],t[1],t[2]);
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
            }
            check = ''; //
          }//End of  Horizontal Tally For-loop


        //---Vertical Tally---
        var y=[];//empty array for vertical tally
        console.log('Vertical Tallying!', t[0],t[1],t[2]);
        for(i=0;i<t.length;i++){ // i = column
          for(j=0;j<t.length;j++){ //j=row
            y.push(t[j][i]);
            console.log('Forming column: ' + y);
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

    }//End of if(move<5)
    else{
          console.log('To early to check... Check in ' + (5 - move) + ' more moves' );
          }
  }//checkWin() end

//-----Function for Row 0 cells-----
function gameButler(idx,idy){

    var move1 = l[0].join('') + l[1].join('') + l[2].join('');
    console.log(move1);
    console.log("l[] array: ", l[0],l[1],l[2]);
    if(l[idy][idx]===0){
        if(start === 0 && move1==='000000000') {
            chooseTicker(id);
            lock(idy,idx);
            }

        if(start === 1){
          selectEngine(id);
          lock(idy,idx);
        }
      }
      else if(start===0 && l[idy][idx]!=0){
        chooseTicker(id);
      }

    }//End of gameButler()

function selectr00(){
  id = document.getElementById('r00').id; //obtains #id and stores in to variable id as string
  var idArr = id.split(''); //splits string by characters and stores in an array, eg. [r,0,1]
  var idx = idArr.pop(); var idy = idArr.pop(); //stores the digits seperately. idx will be used to traverse across the row array, vice versa
  gameButler(idx,idy);
  }
function selectr01(){
  id = document.getElementById('r01').id;
  var idArr = id.split('');
  var idx = idArr.pop(); var idy = idArr.pop();
  gameButler(idx,idy);
}
function selectr02(){
  id = document.getElementById('r02').id;
  var idArr = id.split('');
  var idx = idArr.pop(); var idy = idArr.pop();
  gameButler(idx,idy);
}

//-----Function for Row 1 cells-----
function selectr10(){
  id = document.getElementById('r10').id;
  var idArr = id.split('');
  var idx = idArr.pop(); var idy = idArr.pop();
    gameButler(idx,idy);
}
function selectr11(){
  id = document.getElementById('r11').id;
  var idArr = id.split('');
  var idx = idArr.pop(); var idy = idArr.pop();
  gameButler(idx,idy);
  }
function selectr12(){
  id = document.getElementById('r12').id;
  var idArr = id.split('');
  var idx = idArr.pop(); var idy = idArr.pop();
  gameButler(idx,idy);
  }

//-----Function for Row 1 cells-----
function selectr20(){
  id = document.getElementById('r20').id;
  var idArr = id.split('');
  var idx = idArr.pop(); var idy = idArr.pop();
  gameButler(idx,idy);
  }
function selectr21(){
  id = document.getElementById('r21').id;
  var idArr = id.split('');
  var idx = idArr.pop(); var idy = idArr.pop();
  gameButler(idx,idy);
  }
function selectr22(){
  id = document.getElementById('r22').id;
  var idArr = id.split('');
  var idx = idArr.pop(); var idy = idArr.pop();
  gameButler(idx,idy);
  }

//-----Functions for player selction-----

function lock(y,x){
    l[y][x] = 1;
  }

function chooseTicker(id2check,aimode){
  if(aimode === true){

  }

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
  start = 1; move++;
  var g=['r'];
  var ticker; //Only to aid in finding out playerA's ticker(symbol) choice.

  //Following nested For-loops checks the board where the first symbol was placed. If a symbol is found,
  //var-ticker remember's playerA's choice then passed to the if/else to assign playerB's symbol and locks the cell.
  for(i=0; i<t.length; i++){
    for(j=0;j<t.length; j++){
      g.push(i); g.push(j);
      id = g.join('');//Creates string to form #id
      ticker = document.getElementById(id).textContent; // First symbol to show is always X

      if(ticker==='X'){
        playerA = ticker;//
        playerB = 'O'; //Stores ticker to variable playerA
        document.getElementById('status').innerHTML="<h1 id=\"status\">Player <span id=\"player\">B\'s turn!</span></h1>";
        turn = 'b';
        l[i][j] = 1;
        t[i][j] = 'a';
        }
      else if(ticker==='O') {
        playerA = 'O';
        playerB = 'X';
        document.getElementById('status').innerHTML="<h1 id=\"status\">Player <span id=\"player\">B\'s turn!</span></h1>";
        turn = 'b';
        l[i][j] = 1;
        t[i][j] = 'b';
        }
      g=['r'];
      }//End of j-For loop
      console.log(l[i]);
    }//End of i-For loop
}

function selectEngine(id2check,aiMode){
  var idArr = id2check.split('');
  var x = idArr.pop(); var y = idArr.pop();
  console.log(x,y);
  if (t[y][x]=== 0){
    playerToggle();
    t[y][x] = turn;
    marker();
    checkWin()
    }
  else if(aiMode===false){
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
  t = [[0,0,0],[0,0,0],[0,0,0]];
  l = [[0,0,0],[0,0,0],[0,0,0]];
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
