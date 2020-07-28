var diceArr = [];

function initializeDice() {
  for (var i = 0; i < 6; i++) {
    diceArr[i] = {};
    diceArr[i].id = "die" + (i + 1);
    diceArr[i].value = i + 1;
    diceArr[i].clicked = 0;
  }
}

/*Rolling dice values*/
function rollDice() {
  for (var i = 0; i < 6; i++) {
    if (diceArr[i].clicked == 0) {
      diceArr[i].value = Math.floor(Math.random() * 6 + 1);
    }
  }
  updateDiceImg();
  updatePotential();
}

/*Updating images of dice given values of rollDice*/
function updateDiceImg() {
  var diceImage;
  for (var i = 0; i < 6; i++) {
    // set back to this when i'm done - just substitute links don't erase everything
    //diceImage = "images/" + i + ".png";
    switch (diceArr[i].value) {
      case 1:
        diceImage ="images/1.png";
        break;
      case 2:
        diceImage ="images/2.png";
        break;
      case 3:
        diceImage ="images/3.png";
        break;
      case 4:
        diceImage ="images/4.png";
        break;
      case 5:
        diceImage ="images/5.png";
        break;
      case 6:
        diceImage ="images/6.png";
        break;
    }
    document.getElementById(diceArr[i].id).setAttribute("src", diceImage);
  }
}

function diceClick(img) {
  var i = img.getAttribute("data-number");
  img.classList.toggle("transparent");
  if (diceArr[i].clicked == 0) {
    diceArr[i].clicked = 1;
  } else {
    diceArr[i].clicked = 0;
  }
}

function updateScore() {
  var oldScore = Number(document.getElementById("score").innerHTML);
  var potential = Number(document.getElementById("potential").innerHTML);
  document.getElementById("score").innerHTML = (potential + oldScore);
  if ((potential+oldScore) >= 10000) {
    alert("YOU WIN! YOUR SCORE IS " + (potential+oldScore));
  }
}

function bankScore() {
  updateScore();
  initializeDice();
  updateDiceImg();
}

function updatePotential() {    
  var score = 0;
  
  // check for threes
  //count # of each number
  var countclicked = [0, 0, 0, 0, 0, 0];
  var countnotclicked = [0, 0, 0, 0, 0, 0];
  for (var i = 0; i < 6; i++) {
    if(diceArr[i].clicked==0){
    switch (diceArr[i].value) {
      case 1:
        countnotclicked[0] += 1;
        break;
      case 2:
        countnotclicked[1] += 1;
        break;
      case 3:
        countnotclicked[2] += 1;
        break;
      case 4:
        countnotclicked[3] += 1;
        break;
      case 5:
        countnotclicked[4] += 1;
        break;
      case 6:
        countnotclicked[5] += 1;
        break;
    }
    }
    else{
      switch (diceArr[i].value) {
      case 1:
        countclicked[0] += 1;
        break;
      case 2:
        countclicked[1] += 1;
        break;
      case 3:
        countclicked[2] += 1;
        break;
      case 4:
        countclicked[3] += 1;
        break;
      case 5:
        countclicked[4] += 1;
        break;
      case 6:
        countclicked[5] += 1;
        break;
    }
    }
  // assign score based on how many three of a kind
  }
  for (var i = 0; i < 6; i++) {
    if (countclicked[i] >= 3) {
      if (i == 0) {
        score += 1000;
      } else {
        score += (i + 1) * 100;
      }
    }

    // assign score for 1 of a kind
    else {
      if (i == 0) {
        score += countclicked[i]*100;
      }
      if (i == 4) {
        score += countclicked[i]*50;
      }
    }
  }
    for (var i = 0; i < 6; i++) {
    if (countnotclicked[i] >= 3) {
      if (i == 0) {
        score += 1000;
      } else {
        score += (i + 1) * 100;
      }
    }

    // assign score for 1 of a kind
    else {
      if (i == 0) {
        score += countnotclicked[i]*100;
      }
      if (i == 4) {
        score += countnotclicked[i]*50;
      }
    }
  }
  document.getElementById("potential").innerHTML = score;

}