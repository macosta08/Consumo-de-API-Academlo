export default class TriviaQuestion {
    constructor(questionsQuantity, questionsCategory, questionsType, questionsDifficulty) {
        this.questionsQuantity = questionsQuantity;
        this.questionsCategory = questionsCategory;
        this.questionsType = questionsType;
        this.questionsDifficulty = questionsDifficulty; 
    }
    getQuestions() {
        fetch(`https://opentdb.com/api.php?amount=${this.questionsQuantity}&category=${this.questionsCategory}&difficulty=${this.questionsDifficulty}&type=${this.questionsType}`)
            .then(response => response.json())
            .then(data => this.printCards(data.results))
    }
    
    printCards(questions) {
        const container = document.getElementById('container-cards');
        container.innerHTML = '';
        questions.forEach((question, idx) => {
            const card = this.returnCardHTML(question, idx);
            container.innerHTML += card;
        });
        const containerBtn = document.getElementById('container-button-result');
        containerBtn.innerHTML= `<button type="submit" id="btn-Check" class="btn btn-primary btn-lg btn-danger">Check</button>`
        // poner las preguntas en mi página web
    }
    
    returnCardHTML(q, i) {
        
        const card = `<div class="card-propio card">
                        <div class="card-body">
                        <h6 class="card-title">${q.category} - ${q.difficulty}</h6>
                        <h5 class="card-subtitle mb-2 text-muted">${q.question}</h5>                   
                            ${this.returnAnswersHTML(q.correct_answer, q.incorrect_answers, i)}                  
                        </div>
                        <div id="icon-question-${i}" name="icons" class="icon-bombillo">
                            <i id="incon-bombillo-i" class='fab fa-medapps fa-spin' style='font-size:48px;color:#ddd903'></i>
                        </div>                   
                    </div>`
        return card;
    }
    returnAnswersHTML(correct, incorrects, questionIndex) {
    
        let answers = incorrects;
        answers.push(correct);
    
        // Para evitar que la respuesta correcta siempre esté al final, aplicamos un sort para ordenar el array y así
        // no se sabrá en que posición se encuentra la correcta
        answers.sort();
    
        let answersHTML = '';
        answers.forEach((answer) => {
            const aswerValue = answer == correct ? 'correct' : 'incorrect';
            answersHTML += `<div class="form-check">
                                <label><input required class="form-check-input" type="radio" name="question-${questionIndex}" value="${aswerValue}">${answer}</label>  
                            </div>`;
        });
    
        return answersHTML;
    }

}