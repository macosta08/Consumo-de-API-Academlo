export default class TriviaAnswer {
    constructor(classNameInputCheck){
        // Paso 1: Extrayendo del DOM las respuestas
        //el DOM retorna un Array-like, para poder utilizar metodos de array (Ej: map, filter) debo convertir 
        //el array-like en array. Esto lo hago usando Array.from()
        this.answers = Array.from(document.getElementsByClassName(classNameInputCheck));
    }
    checkAnswers() {
    
        // Paso 2: De las respuestas construimos un arreglo solo con las propiedades que necesito
        let arrAnswers = this.answers.map(answer => {
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
}