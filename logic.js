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
document.getElementById('ai').addEventListener('click',ai);

var t = [[0,0,0],
         [0,0,0],
         [0,0,0]]; //Track cell
        console.log(t);

var turn = 'a';// a->p1 / b->p2
var move = 0;


//-----AI-----

//Senseless Random
function ai(){
  console.log("It's player "+turn+'\'s turn!')

  var aiz = ['r'];
  var x, y;
  var zz = 0;

  while(zz === 0){
    x = Math.floor((Math.random()*3));
    y = Math.floor((Math.random()*3));
    aiz.push(y); aiz.push(x);
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
            alert("No more moves!")
            reset();
            return
          }
        }
  }

function checkWin(){
  var check = '';//init check string to empty
  console.log('Checking Win...')
  if(move>=4){
      //---Horizontal Tally---
        console.log('Horizontal Tallying!');
        for(i=0; i<t.length; i++){
          console.log('Horizontal Tallying!');
          check = t[i].join('');
          console.log('Horizontal Checking: ');
            if(check === 'aaa' || check === 'bbb'){
              if(turn='a'){
                confirm('Player A Horizontal Win!')
                check ='';
                reset();
              }
              else {
                confirm('Player B Win!' + check)
                check ='';
                reset();
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
              confirm('Player A Vertical wins!')
              check ='';
              reset();
              }
            else {
              confirm('Player B Vertical wins!')
              check ='';
              reset();
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
                confirm('Player A diagonal wins!')
                check ='';
                reset();
                xy = [];
                }
              else {
                confirm('Player B diagonal wins!')
                check ='';
                reset();
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
            confirm('Player A Forward Diagonal win!')
            check ='';
            reset();
            }
          else {
            confirm('Player B Forward Diagonal win!')
            check ='';
            reset();
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

        // for(i=0;i<t.length;i++){ // i is the column
        //   for(j=((t.length)-1); j>-1; j--){
        //     console.log("foobar "+ t[i][j]);
        //     xy.push(t[i][j]);
        //   }
        // }
    }//End of if(move>=4)
    else{
          console.log('To early to check... Check in ' + (4 - move) + ' more moves' );
          }



  }//checkWin() end


//-----Function for Row 0 cells-----

function selectr00(){
  console.log("Click@r00");
  id = document.getElementById('r00').id;
  if (t[0][0]=== 0){
    playerToggle();//Changes player's turn
    t[0][0] = turn;
    console.log(t[0],t[1],t[2]);
    marker();
    checkWin()
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
    t[0][1] = turn;
    console.log(t[0],t[1],t[2]);
    marker();
    checkWin()
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
    t[0][2] = turn;
    marker();
    checkWin()
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
    t[1][0] = turn;
    marker();
    checkWin()
  }
  else{
    alert("Choose another cell");
  }
}

function selectr11(){
  id = document.getElementById('r11').id;
  if (t[1][1]===0){
    playerToggle();
    t[1][1] = turn;
    marker();
    checkWin()
  }
  else{
    alert("Choose another cell");
  }
}

function selectr12(){
  id = document.getElementById('r12').id;
  if (t[1][2]===0){
    playerToggle();
    t[1][2] = turn;
    marker();
    checkWin()
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
    t[2][0] = turn;
    marker();
    checkWin()
  }
  else{
    alert("Choose another cell");
  }
}

function selectr21(){
  id = document.getElementById('r21').id;
  if (t[2][1]===0){
    playerToggle();
    t[2][1] = turn;
    marker();
    checkWin()
  }
  else{
    alert("Choose another cell");
  }
}

function selectr22(){
  id = document.getElementById('r22').id;
  if (t[2][2]===0){
    playerToggle();
    t[2][2] = turn;
    marker();
    checkWin()
  }
  else{
    alert("Choose another cell");
  }
}



//-----Functions for player selction-----

function playerToggle(){
  var p = document.getElementById('player').textContent;
  //console.log("Player "+p+" detected");

  if(p==='A'){
    document.getElementById('player').textContent = 'B';
  }
    else{
      document.getElementById('player').textContent = 'A';
    }
}


function marker(){
                  // debugger
  if(turn==='a'){
    document.getElementById(id).style.backgroundColor = 'red';
    turn = 'b';
  }
  else if(turn==='b'){
    document.getElementById(id).style.backgroundColor = 'blue';
    turn = 'a';
 }
 //console.log(t[0],t[1],t[2], "Turn = "+ turn);
 move++;
}

function reset(){
  //console.log('Click@Reset');
  turn = 'a';
  move = 0;
  t = [[0,0,0],
       [0,0,0],
       [0,0,0]];
  document.getElementById('player').textContent = 'A';
  //console.log('Array t = '+ t[0],t[1],t[2]);

  var z =['r'];

    for(i=0; i<t.length; i++){
      for (j=0; j<t[i].length; j++) {
        z.push(i);
        z.push(j);
        document.getElementById(z.join('')).style.backgroundColor = 'white';
        z = ['r'];//reset z[]
      }}
}
