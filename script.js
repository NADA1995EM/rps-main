// First component < Score board >

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
       if(currentRound===5){
        playBtn.disabled=true;
        setTimeout(function(){
            showModal();},1500)}
        
       setTimeout(function(){
        resetButtelImge();}
       ,2000)

});


//Second component < pattel imgs >

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

//Thierd component  < ROUND RESULT MESSAGE >

let roundResultEl = document.querySelector("#round-result");
let roundResultText = document.querySelector("#round-result-text");



function showRoundResult(winner,humanChoice,computerChoice){
    roundResultEl.classList.remove("tie","lose","win")
    let massege ="";
    if( winner === "tie"){
        massege="🤝 It,s a tie ! both chose "+ humanChoice;
        roundResultEl.classList.add("tie");
    }
    else if( winner === "human"){
        massege="✅ You win this round ! "+ humanChoice + "  bits  "+ computerChoice;
             roundResultEl.classList.add("win");
                }
    else {
        massege="❌ computer wins  this round !" + computerChoice + "  bits  " + humanChoice; 
         roundResultEl.classList.add("lose");
}
     roundResultText.textContent= massege;
};

//Forth component < slide traker >

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


 //Fifth component < Mosal back drop >
 let modalBackdrop =document.querySelector("#modal-backdrop");
  let modalIcon=document.querySelector("#modal-icon");
   let modalTitel =document.querySelector("#modal-title");
    let modalSubTitel=document.querySelector("#modal-sub");
     let modalPlayerScore=document.querySelector("#modal-player-score");
      let modalComputerScore=document.querySelector("#modal-computer-score");
       let playAgainBtn=document.querySelector("#play-again-btn");

       function showModal(){
        modalTitel.classList.remove("win","lose","tie");
        modalBackdrop.classList.add("visible");
        if(playerScore<computerScore){
            modalIcon.textContent="❌";
           modalTitel.textContent="You Lost!";
           modalTitel.classList="lose";
           modalSubTitel.textContent="Better luck next time!";

        }
        else if(playerScore>computerScore){
            modalIcon.textContent="🏆";
           modalTitel.textContent="You Win!";
           modalTitel.classList="win";
           modalSubTitel.textContent="Amazing job! You beat computer!";

        }
        else{
             modalIcon.textContent="🫱🏼‍🫲🏻";
           modalTitel.textContent="It's a Draw!";
           modalTitel.classList="tie";
           modalSubTitel.textContent="Perfectly balanced!";

        }
        modalPlayerScore.textContent="Player : "+playerScore;
                modalComputerScore.textContent="Computer : "+ computerScore;

       };

       playAgainBtn.addEventListener("click",function(){
         playerScore = 0;
         computerScore = 0;
         currentRound = 1;

        updateScoreboard();
        modalBackdrop.classList.remove("visible");
         resetButtelImge();
      
            roundResultEl.classList.remove("win","lose","tie");
                roundResultText.textContent="Choose your weapon below!";
         
 
       })
function resetButtelImge(){
       playButtelImg.classList.remove("shwo");
            computerButtelImg.classList.remove("shwo");
            playerPlaceHolder.classList.remove("hidden");
            computerPlaceHolder.classList.remove("hidden");
                    playBtn.disabled=false;


}