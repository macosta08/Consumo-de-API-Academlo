
function getQuestions() {
    const questionsQuantity = document.getElementById('questions-number').value
    const questionsCategory = document.getElementById('questions-category').value
    const questionsType = document.getElementById('questions-type').value
    const questionsDifficulty = document.getElementById('questions-difficulty').value
    
    fetch(`https://opentdb.com/api.php?amount=${questionsQuantity}&category=${questionsCategory}&difficulty=${questionsDifficulty}&type=${questionsType}`)
        .then(response => response.json())
        .then(data => printCards(data.results))
}

function printCards(questions) {
    const container = document.getElementById('container-cards');
    container.innerHTML = '';
    questions.forEach((question, idx) => {
        const card = returnCardHTML(question, idx);
        container.innerHTML += card;
    });
    const containerBtn = document.getElementById('container-button-result');
    containerBtn.innerHTML= `<button type="submit" id="btn-Check" class="btn btn-primary btn-lg btn-danger">Check</button>`
    // poner las preguntas en mi página web
}

function returnCardHTML(q, i) {
    
    const card = `<div class="card-propio card">
                    <div class="card-body">
                    <h6 class="card-title">${q.category} - ${q.difficulty}</h6>
                    <h5 class="card-subtitle mb-2 text-muted">${q.question}</h5>                   
                        ${returnAnswersHTML(q.correct_answer, q.incorrect_answers, i)}                  
                    </div>
                    <div id="icon-question-${i}" name="icons" class="icon-bombillo">
                        <i id="incon-bombillo-i" class='fab fa-medapps fa-spin' style='font-size:48px;color:#ddd903'></i>
                    </div>                   
                </div>`
    return card;
}



function returnAnswersHTML(correct, incorrects, questionIndex) {

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

function checkAnswers() {
    // Paso 1: Extrayendo del DOM las respuestas
    //el DOM retorna un Array-like, para poder utilizar metodos de array (Ej: map, filter) debo convertir 
    //el array-like en array. Esto lo hago usando Array.from()
    const answers = Array.from(document.getElementsByClassName("form-check-input"));

    // Paso 2: De las respuestas construimos un arreglo solo con las propiedades que necesito
    let arrAnswers = answers.map(answer => {
        // Usando ES6 destructuring syntax para extraer y asignar en variables las propiedades de mi interes del Object 
        const {name, value, checked} = answer;

        //Retornando un objeto con las variables obtenidas
        return {name, value, checked};
    });

    // Paso 3: Construir un nuevo arreglo con las respuestas correctas
    let answerCorrect = arrAnswers.filter(val => val['value'] == "correct" && val['checked']);

    // Paso 4: Contar la cantidad de respuestas correctas 
    const valueCorrectCount = answerCorrect.length;

    //Paso 5: Arreglo con que contiene los nombres del id de la etiqueta que contiene el icono para cada pregunta 
    const icons =  Array.from(document.getElementsByName("icons"));
    const arrIconsId = icons.map(elem => elem.id);

    //Paso 6: Contar la cantidad de preguntas
    const questionsCount = arrIconsId.length;
    const valueIncorrectCount = questionsCount - valueCorrectCount; 

    //Paso 7: Actualizar el nombre del boton con la cantidad de respuestas correcta e incorrectas 
    const newButton = document.getElementById('btn-Check');
    newButton.innerHTML= `<i class='far fa-thumbs-up' style='font-size:24px; color:white'></i>(${valueCorrectCount})
                          - <i class='far fa-thumbs-down' style='font-size:24px; color:white'></i>(${valueIncorrectCount})`

    //Paso 8: Actualizar los iconos de cada pregunta dependiendo si la respuesta fue correcta e incorrecta 
    arrIconsId.forEach((element) => {
        const divIcon = document.getElementById(element);
        const findCorrect = (obj) => element.includes(obj.name);

        if(answerCorrect.findIndex(findCorrect) != -1) {
            divIcon.innerHTML= `<i class='far fa-thumbs-up' style='font-size:48px;color:green'></i>`;
        } else {
            divIcon.innerHTML= `<i class='far fa-thumbs-down' style='font-size:48px;color:red'></i>`;
        }
       
    });

}
