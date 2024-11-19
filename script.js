let point;
let liv;

const good1 = document.querySelector("#good_container1");
const good2 = document.querySelector("#good_container2");
const bad1 = document.querySelector("#bad_container1");
const bad2 = document.querySelector("#bad_container2");
const bad3 = document.querySelector("#bad_container3");
const bad4 = document.querySelector("#bad_container4");

window.addEventListener("load", sidenVises);

function sidenVises() {
  console.log("sidenVises");
  //Skjul andre skærme
  document.querySelector("#level_complete").classList.add("hide");
  document.querySelector("#game_over").classList.add("hide");
  document.querySelector("#snak").classList.add("hide");
  //Vis start skærm
  document.querySelector("#start").classList.remove("hide");
  //Klik på start_knap
  document.querySelector("#startknap_container").addEventListener("click", snak);
}
function snak() {
  console.log("snak");
  //skjul start skærm
  document.querySelector("#start").classList.add("hide");

  document.querySelector("#snak").classList.remove("hide");

  document.querySelector("#snak1").classList.add("snak1_ani");
  document.querySelector("#snak2").classList.add("snak2_ani");

  document.querySelector("#snak3").classList.add("snak3_ani");
  document.querySelector("#snak3").addEventListener("animationend", startSpil);

  //musik
  document.querySelector("#sounds_baggrund").play();
  document.querySelector("#sounds_baggrund").volume = 0.5;
}
function startSpil() {
  console.log("startSpil");
  document.querySelector("#level_complete").classList.add("hide");
  document.querySelector("#game_over").classList.add("hide");
  document.querySelector("#start").classList.add("hide");
  document.querySelector("#snak").classList.add("hide");

  // nulstiller og udskriver liv & point //
  point = 0;
  document.querySelector("#point").textContent = "Point: " + point;
  liv = 3;
  document.querySelector("#liv").textContent = liv;

  // start timer // timer_ani
  document.querySelector("#timer_fyld").classList.add("timer_ani");
  // timer færdig, gå til stop spillet (stopSpillet) //
  document.querySelector("#timer_fyld").addEventListener("animationend", stopSpillet);

  // Good
  good1.classList.add("falling", "pos" + ranNum(5), "delay" + ranNum(4));
  good1.addEventListener("click", goodClickHandler);
  good1.addEventListener("animationiteration", goodBund);

  good2.classList.add("falling", "pos" + ranNum(5), "delay" + ranNum(4));
  good2.addEventListener("click", goodClickHandler);
  good2.addEventListener("animationiteration", goodBund);
  // dette gør, at når mit gode element rammer bunden mister du også et liv

  // Bad
  bad1.classList.add("falling", "pos" + ranNum(5), "delay" + ranNum(4));
  bad1.addEventListener("click", badClickHandler);
  bad1.addEventListener("animationiteration", badReset);

  bad2.classList.add("falling", "pos" + ranNum(5), "delay" + ranNum(4));
  bad2.addEventListener("click", badClickHandler);
  bad2.addEventListener("animationiteration", badReset);

  bad3.classList.add("falling", "pos" + ranNum(5), "delay" + ranNum(4));
  bad3.addEventListener("click", badClickHandler);
  bad3.addEventListener("animationiteration", badReset);

  bad4.classList.add("falling", "pos" + ranNum(5), "delay" + ranNum(4));
  bad4.addEventListener("click", badClickHandler);
  bad4.addEventListener("animationiteration", badReset);
}
// ''''''''''''' God start ''''''''''''''''''
function goodClickHandler() {
  console.log("goodClickHandler");
  // Gør som man ikke kan klikke uendeligt
  this.removeEventListener("click", goodClickHandler);
  // Få 1 point
  point = point + 1;
  // Skriv point ud
  document.querySelector("#point").textContent = "Point: " + point;
  // Frys falling-animation
  this.classList.add("frys");
  // Start dreje -animation
  this.firstElementChild.classList.add("dreje");
  // dreje -animation færdig
  this.addEventListener("animationend", goodReset);
  document.querySelector("#sounds_good").play();
}

function goodReset() {
  console.log("goodReset");
  // Nulstille containere, sprite og offSet
  this.classList = "";
  this.firstElementChild.classList = "";
  this.offsetLeft;
  // Ny random position // Genstart falling -animation
  this.classList.add("falling", "pos" + ranNum(5));
  // Gør så man kan klikke på den igen
  this.addEventListener("click", goodClickHandler);
}
// dette gør, at når mit gode element rammer bunden mister du også et liv //////////
function goodBund() {
  console.log("goodBund");
  //Mist et liv // skriv liv ud
  liv = liv - 1;
  document.querySelector("#liv").textContent = liv;
  // Nulstille containere, sprite og offSet
  this.classList = "";
  this.firstElementChild.classList = ""; // good1.firstElementChild.classList"";
  this.offsetLeft;
  // Ny random position // Genstart falling -animation
  this.classList.add("falling", "pos" + ranNum(5));
  // stop spillet når der er 0 liv
  if (liv <= 0) {
    stopSpillet();
  }
}
// ''''''''''''' God slut ''''''''''''''''''

////////////////// dårligt start ///////////////////
function badClickHandler() {
  console.log("badClickHandler");
  liv = liv - 1;

  document.querySelector("#liv").textContent = liv;

  this.classList.add("frys");
  //Start dreje-animationer på sprite element (firstElementChild er sprite elementet)
  this.firstElementChild.classList.add("zoom_out");

  this.addEventListener("animationend", badReset);
  if (liv <= 0) {
    stopSpillet();
  }

  document.querySelector("#sounds_boo").play();
}
function badReset() {
  console.log("badReset");
  // Nulstille containere, sprite og offSet
  this.classList = "";
  this.firstElementChild.classList = "";
  this.offsetLeft;
  // Ny random position // Genstart falling -animation
  this.classList.add("falling", "pos" + ranNum(5));
  // Gør så man kan klikke på den igen
  this.addEventListener("click", badClickHandler);
}
////////////////// dårligt slut ///////////////////

function stopSpillet() {
  console.log("stopSpillet");

  // Slet tid
  document.querySelector("#timer_fyld").classList.remove("timer_ani");
  document.querySelector("#timer_fyld").removeEventListener("animationend", stopSpillet);
  // Slet alle classes og fjern alle eventlisteners fra good1
  good1.classList = "";
  good1.firstElementChild.classList = "";
  good1.removeEventListener("click", goodClickHandler);
  good1.removeEventListener("animationiteration", goodBund);
  good1.removeEventListener("animationend", goodReset);

  good2.classList = "";
  good2.firstElementChild.classList = "";
  good2.removeEventListener("click", goodClickHandler);
  good2.removeEventListener("animationiteration", goodBund);
  good2.removeEventListener("animationend", goodReset);
  // Slet alle classes og fjern alle eventlisteners fra bad1
  bad1.classList = "";
  bad1.firstElementChild.classList = "";
  bad1.removeEventListener("click", badClickHandler);
  bad1.removeEventListener("animationiteration", badReset);
  bad1.removeEventListener("animationend", badReset);

  bad2.classList = "";
  bad2.firstElementChild.classList = "";
  bad2.removeEventListener("click", badClickHandler);
  bad2.removeEventListener("animationiteration", badReset);
  bad2.removeEventListener("animationend", badReset);

  bad3.classList = "";
  bad3.firstElementChild.classList = "";
  bad3.removeEventListener("click", badClickHandler);
  bad3.removeEventListener("animationiteration", badReset);
  bad3.removeEventListener("animationend", badReset);

  bad4.classList = "";
  bad4.firstElementChild.classList = "";
  bad4.removeEventListener("click", badClickHandler);
  bad4.removeEventListener("animationiteration", badReset);
  bad4.removeEventListener("animationend", badReset);

  if (liv == 0) {
    gameOver();
  } else if (point >= 4) {
    levelComplete();
  } else {
    gameOver;
  }
}

function gameOver() {
  console.log("Loser");
  //Vis gameover skærm
  document.querySelector("#game_over").classList.remove("hide");
  document.querySelector("#game_over_points").innerHTML = "You have no fashion sense...<br>Point = " + point;
  //Klik på restart1
  document.querySelector("#restart1").addEventListener("click", startSpil);
}
function levelComplete() {
  console.log("Du har vundet");
  //Vis levelComplete skærm
  document.querySelector("#level_complete").classList.remove("hide");
  document.querySelector("#level_complete_points").innerHTML = "Girl you got style<br>Point = " + point;

  //Klik på restart2
  document.querySelector("#restart2").addEventListener("click", startSpil);
}

////////////////// hjælpe funktioner ///////////////////
function ranNum(max) {
  return Math.floor(Math.random() * max) + 1;
}
