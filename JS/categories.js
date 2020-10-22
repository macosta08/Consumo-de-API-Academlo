
function getCategories() {
    /*
    Función que hace fetch al API category de Open-Trivia. Invoca a la función categoryOptions para
    llenar de forma automatica el input select de las categorias. 
    */
    fetch(`https://opentdb.com/api_category.php`)
        .then(response => response.json())
        .then(data => categoryOptions(data.trivia_categories))

}

function categoryOptions(categories) {
    /*
    Función que es invocada desde el fetch del API category. Recibe un arreglo de objetos con las categorias 
    el cual es trasformado en un string con el html que contiene las opciones de categorias que seran asignadas
    al input select de id= questions-category.
    */
    const anyCategory = '<option value="">Any Category</option>';
    const options = categories.map(element => `<option value="${element.id}">${element.name}</option>`).join(" ");
    document.getElementById('questions-category').innerHTML = anyCategory + options;
}

// invocando la funcion getCategories() cada vez que se ingrese o actualice la pagina.  
getCategories();