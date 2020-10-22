import TriviaQuestion from './triviaQuestion.js'
import TriviaAnswer from './triviaAnswer.js'

function questions() {
    const questionsQuantity = document.getElementById('questions-number').value;
    const questionsCategory = document.getElementById('questions-category').value;
    const questionsType = document.getElementById('questions-type').value;
    const questionsDifficulty = document.getElementById('questions-difficulty').value;

    const questionsTrivia = new TriviaQuestion(questionsQuantity, questionsCategory, questionsType, questionsDifficulty);
    questionsTrivia.getQuestions(); 
}

function checkAnswers() {
    const answerTrivia = new TriviaAnswer("form-check-input");
    answerTrivia.checkAnswers();
}

window.questions = questions;
window.checkAnswers = checkAnswers;