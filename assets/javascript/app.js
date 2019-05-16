//Trivia questions
var questions = [{
  question: "In which episode do Bones and Hodgins get buried alive?",
  answers: ["Two Bodies in the Lab", "The Man in the Morgue", "Aliens in a Spaceship"],
  correctAnswer: "Aliens in a Spaceship",
},
{
  question: "Who plays Rebecca, Parker’s mom? (hint: she was on Greys Anatomy)",
  answers: ["Jessica Capshaw", "Sarah Drew", "Tamara Taylor"],
  correctAnswer: "Jessica Capshaw",
},
{
  question: "Which episode does Brennan get stabbed?",
  answers: ["Harbingers in a Fountain", "The Dwarf in the Dirt", "The Goop on the Girl"],
  correctAnswer: "Harbingers in a Fountain",
},
{
  question: "Which episode does Emily Deschanels sister, Zooey Deschanel make an appearance?",
  answers: ["The Goop on the Girl", "The Witch in The Wardrobe", "Player Under Pressure"],
  correctAnswer: "The Goop on the Girl",
},
{
  question: "Who plays Booths son, Parker?",
  answers: ["Michael Grant Terry", "Booth doesn’t have a son", "Ty Panitz"],
  correctAnswer: "Ty Panitz",
},
{
  question: "In ‘The Baby in the Bough’, what does Brennan say that amuses the baby?",
  answers: ["Dancing Phalanges", "Cheeky Monkey", "Naughty Moose"],
  correctAnswer: "Dancing Phalanges",
},
{
  question: "Due to a brain tumor, Booth has hallucinations. Who does he see in ‘Hero in the Hold’?",
  answers: ["Teddy Parker", "Stewie Griffin", "Luc Robitaille"],
  correctAnswer: "Teddy Parker",
},
{
  question: "What is it called when you have a fear of blood?",
  answers: ["Vasavagal Syncope", "Bloodyphobia", "Brenaphobia"],
  correctAnswer: "Vasavagal Syncope",
},
{
  question: "Which episode do Booth and Brennan get married?",
  answers: ["The Secrets in the Proposal", "The Nazi on the Honeymoon", "The Woman in White"],
  correctAnswer: "The Woman in White",
},
{
  question: "What is Booth and Brennan’s first child’s full name?",
  answers: ["Christine Ruth Booth", "Christine Joy Booth", "Christine Angela Booth"],
  correctAnswer: "Christine Angela Booth",
}]



//create a function
$(document).ready(function(){

  // start the game when user clicks on Start button
  $("#start-button").on("click", gameState.startTimer);

});

 var gameState = {

  // set the time at 60 seconds, and count down by 1 second
  timeRemaining : 60,

  // start the timer
  startTimer: function() {
    $("#timer").text("Time remaining: " + gameState.timeRemaining);
    setInterval(gameState.countdown, 1000);
    $("#start-page").hide();
    trivia.displayQuestions();
  },

  //imer countdown
  countdown: function() {
    gameState.timeRemaining--;
    $("#timer").text("Time remaining: " + gameState.timeRemaining);
    if (gameState.timeRemaining === 0) {
      gameState.stopTimer();
      $("#timer").empty();
    }
  },

  // stop the timer and check the answers
  stopTimer: function() {
    clearInterval();
    trivia.checkAnswers();
  },

  showEndPage: function(numCorrect, numIncorrect, numUnanswered) {
    $("#questions-box").empty();
    $("#timer").empty();
    $("#timer").hide();
    $("#correctAnswers").text("Correct answers: " + numCorrect);
    $("#incorrectAnswers").text("Incorrect answers: " + numIncorrect);
    $("#unanswered").text("Unanswered: " + numUnanswered);
  }
}

var trivia = {

  displayQuestions: function() {
    var divContainer = $("#questions-box");
    var answerGroup = $(".form-check");
    divContainer.append('<h2>Answer the following questions:</h2>');
            
    for (var i = 0; i < questions.length; i++) {

      divContainer.append('<div id="question">' + questions[i].question + '</div>');

      var answer1 = questions[i].answers[0];
      var answer2 = questions[i].answers[1];
      var answer3 = questions[i].answers[2];

      divContainer.append('<div class="form-check"><input class="form-check-input" type="radio" name="radio-group'+i+'" id="radio'+i+'"><label class="form-check-label" id="radio'+i+'label" for="radio'+i+'">' + answer1 + '</label></div>');
      divContainer.append('<div class="form-check"><input class="form-check-input" type="radio" name="radio-group'+i+'" id="radio'+i+'"><label class="form-check-label" id="radio'+i+'label" for="radio'+i+'">' + answer2 + '</label></div>');
      divContainer.append('<div class="form-check"><input class="form-check-input" type="radio" name="radio-group'+i+'" id="radio'+i+'"><label class="form-check-label" id="radio'+i+'label" for="radio'+i+'">' + answer3 + '</label></div>');
    }

   var doneButton = '<button class="btn btn-primary" id="done-button" type="submit">Done</button>';
    divContainer.append(doneButton);
    $("#done-button").on("click", gameState.stopTimer);
  },

  checkAnswers: function() {
    var correctAnswer;
    var userAnswer;
    var numCorrect = 0;
    var numIncorrect = 0;
    var numUnanswered = 0;

    for (var i = 0; i < questions.length; i++) {
      correctAnswer = questions[i].correctAnswer;
      userAnswer = $('input[id=radio'+i+']:checked + label').text();

      if (userAnswer === correctAnswer) {
        numCorrect++;
      } else if (userAnswer === "") {
        numUnanswered++;
      } else if (userAnswer !== correctAnswer) {
        {
          numIncorrect++;
        }
      }
    }

    // show the end page with the score tally
    gameState.showEndPage(numCorrect, numIncorrect, numUnanswered);
  },
}

