// First component Score board

let playerScoreEl = document.querySelector("#player-score");
let computerScoreEl = document.querySelector("#computer-score");
let roundNumberEl = document.querySelector("#round-number");
let playBtn = document.querySelector("#play-btn");

let playerScore = 0;
let computerScore = 0;
let currentRound = 1;
let currentSlide = 0;

let choices = ["rock","paper","scissors"];
console.log(choices[currentSlide]);

function getComputerChoices(){
    var randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
}

function determineWinner(humanChoice, computerChoice){
    if(humanChoice === computerChoice){
        return "tie"; 
    }
    if(
        (humanChoice === "rock" && computerChoice === "scissors") ||
        (humanChoice === "scissors" && computerChoice === "paper") ||
        (humanChoice === "paper" && computerChoice === "rock")
    ){
        return "human";
    }
    return "computer";
}



function updateScoreboard(){
    playerScoreEl.textContent = playerScore;
    computerScoreEl.textContent = computerScore;
    roundNumberEl.textContent = currentRound;
}

playBtn.addEventListener("click", function (){
    let humanChoice = choices[currentSlide];
    let computerChoice = getComputerChoices();
    let winner = determineWinner(humanChoice, computerChoice);

    if(winner === "human"){
       playerScore++;
    }
    else if(winner === "computer"){
        computerScore++;
    }

    updateScoreboard();
    currentRound++;
    showBattelImgs(humanChoice,computerChoice);
       showRoundResult(winner,humanChoice,computerChoice);

});


//Second component pattel imgs

let playButtelImg =document.querySelector("#player-battle-img");
let playerPlaceHolder = document.querySelector("#player-placeholder");
let computerButtelImg =document.querySelector("#computer-battle-img");
let computerPlaceHolder = document.querySelector("#computer-placeholder");


function showBattelImgs(humanChoice,computerChoice){
playButtelImg.src= humanChoice+".png";
playButtelImg.alt=humanChoice;
computerButtelImg.src= computerChoice +".png";
computerButtelImg.alt=computerChoice;
playButtelImg.classList.remove("hidden");
playButtelImg.classList.add("show");
playerPlaceHolder.classList.add("hidden");

computerButtelImg.classList.remove("hidden");
computerButtelImg.classList.add("show");
computerPlaceHolder.classList.add("hidden");
}

//Thierd component  ROUND RESULT MESSAGE 

let RoundResultEl = document.querySelector("#round-result");
let roundResultText = document.querySelector("#round-result-text");



function showRoundResult(winner,humanChoice,computerChoice){
    RoundResultEl.classList.remove("tie","lose","win")
    let massege ="";
    if( winner === "tie"){
        massege="🤝 It,s a tie ! both chose "+ humanChoice;
        RoundResultEl.classList.add("tie");
    }
    else if( winner === "human"){
        massege="✅ You win this round ! "+ humanChoice + "  bits  "+ computerChoice;
             RoundResultEl.classList.add("win");
                }
    else {
        massege="❌ computer wins  this round !" + computerChoice + "  bits  " + humanChoice; 
         RoundResultEl.classList.add("lose");
}
     roundResultText.textContent= massege;
};

//Forth component slide traker

let nextBtn = document.querySelector("#next-btn");
let prevBtn = document.querySelector("#prev-btn");

let sliderTrack = document.querySelector("#slider-track");
let slides = document.querySelectorAll(".slide"); 

function goToslide(index){
    currentSlide = index;
    let translateAmount = -index * 33; 
    sliderTrack.style.transform = "translateX(" + translateAmount + "%)";
    updateDots(currentSlide);
}

nextBtn.addEventListener("click", function(){
    if(currentSlide < slides.length - 1){
        goToslide(currentSlide + 1);
    } else {
        goToslide(0);
    }
});

prevBtn.addEventListener("click", function(){
    if(currentSlide > 0){
        goToslide(currentSlide - 1);
    } else {
        goToslide(slides.length - 1);
    }
});
let dots=document.querySelectorAll(".dot");
function updateDots(activeIndex){
    for(let i=0 ; i<dots.length;i++){
        dots[i].classList.remove("active");
    }
    dots[activeIndex].classList.add("active")
}

 for(let i=0 ; i<dots.length;i++){
    dots[i].addEventListener("click",function(){
        goToslide(i);
    })
 }