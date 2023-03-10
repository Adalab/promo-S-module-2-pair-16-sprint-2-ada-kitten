'use strict';


/* Elementos que usamos en el HTML */
const newFormElement = document.querySelector('.js-new-form');
const listElement = document.querySelector('.js-list');
const searchButton = document.querySelector('.js-button-search');
const buttonAdd = document.querySelector('.js-btn-add');
const buttonCancelForm = document.querySelector('.js-btn-cancel');
const inputDesc = document.querySelector('.js-input-desc');
const inputPhoto = document.querySelector('.js-input-photo');
const inputRace = document.querySelector('.js-input-race');
const inputName = document.querySelector('.js-input-name');
const linkNewFormElememt = document.querySelector('.js-button-new-form');
const labelMessageError = document.querySelector('.js-label-error');
const input_search_desc = document.querySelector('.js_in_search_desc');
const input_search_race = document.querySelector('.js_in_search_race');




//Objetos con cada gatito
const kittenData_1 = {
    image: "https://dev.adalab.es/gato-siames.webp",
    name: "Anastacio",
    desc: "Porte elegante, su patrón de color tan característico y sus ojos de un azul intenso, pero su historia se remonta a Asía al menos hace 500 años, donde tuvo su origen muy posiblemente.",
    race: "Siamés",
};
const kittenData_2 = {
    image: "https://dev.adalab.es/sphynx-gato.webp",
    name: "Fiona",
    desc: "Produce fascinación y curiosidad. Exótico, raro, bello, extraño… hasta con pinta de alienígena han llegado a definir a esta raza gatuna que se caracteriza por la «ausencia» de pelo.",
    race: "Sphynx",
};
const kittenData_3 = {
    image: "https://dev.adalab.es/maine-coon-cat.webp",
    name: "Cielo",
    desc: " Tienen la cabeza cuadrada y los ojos simétricos, por lo que su bella mirada se ha convertido en una de sus señas de identidad. Sus ojos son grandes y las orejas resultan largas y en punta.",
    race: "Maine Coon",
};

// const kittenDataList = [kittenData_1, kittenData_2, kittenData_3];


// //Funciones
//function renderKitten(kittenData) {
//     const kitten = `<li class="card">
//     <article>
//       <img
//         class="card_img"
//         src=${kittenData.image}
//         alt="gatito"
//       />
//       <h3 class="card_title">${kittenData.name}</h3>
//       <h3 class="card_race">${kittenData.race}</h3>
//       <p class="card_description">
//       ${kittenData.desc}
//       </p>
//     </article>
//     </li>`;
//     return kitten;
// }

// innerHTML de la anterior function renderKitten cambiada a DOM avanzado:

//const listElement = document.querySelector('.js-list');
// kittenData es un parámetro 
function renderKitten(kittenData) {
  for (const item of listElement) {
  const liElement = document.createElement('li');
  liElement.classList.add('list');

  const articleElement = document.createElement('article');
  const imgElement = document.createElement('img');
  const nameElement = document.createElement('h3');
  const textName = document.createTextNode(kittenData.name); // con la URL y el usuario de GitHub podemos acceder al name y a cualquier otro dato
  const raceElement = document.createElement('h3');   
  const textRace = document.createTextNode();
  const descElement = document.createElement('p');
  const textDesc = document.createTextNode();
  descElement.appendChild(textDesc);

  return liElement;
  }
}


function renderKittenList(kittenDataList) {
    listElement.innerHTML = ""; // listElement = UL del HTML.
    for (const kittenItem of kittenDataList) {
        listElement.appendChild(renderKitten(kittenItem)); // esto sería como el innerHTML.
    }
}

//Mostrar/ocultar el formulario
function showNewCatForm() {
    newFormElement.classList.remove('collapsed');
}
function hideNewCatForm() {
    newFormElement.classList.add('collapsed');
}

function handleClickNewCatForm(event) {
    event.preventDefault();
    if (newFormElement.classList.contains('collapsed')) {
        showNewCatForm();
    } else {
        hideNewCatForm();
    }
}
//Adicionar nuevo gatito
function addNewKitten(event) {
    event.preventDefault();
    const valueName = inputName.value;
    const valueDesc = inputDesc.value;
    const valuePhoto = inputPhoto.value;
    const valueRace = inputRace.value; 
    const newKittenDataObject = {
        name: valueName,
        desc: valueDesc,
        photo: valuePhoto,
        race: valueRace
    };
    // const valueDesc = inputDesc.value;
    // const valuePhoto = inputPhoto.value;
    // const valueName = inputName.value;
    if (valueDesc === "" || valuePhoto === "" || valueName === "" || valueRace === "") {
        labelMessageError.innerHTML = "¡Uy! parece que has olvidado algo";
    } 
    else if(valueDesc !== "" && valuePhoto !== "" && valueName !== "" && valuePhoto !== "" && valueRace!== ""){
    labelMessageError.innerHTML = 'Mola! Un nuevo gatito en Adalab!';
    kittenDataList.push(newKittenDataObject);
    renderKittenList(kittenDataList);
    newFormElement.classList.add("collapsed");
    inputDesc.value = "";
    inputPhoto.value = "";
    inputName.value = "";
    inputRace.value = "";
    labelMessageError.innerHTML = '';
    }
}
//Cancelar la búsqueda de un gatito
function cancelNewKitten(event) {
    event.preventDefault();
    newFormElement.classList.add("collapsed");
    inputDesc.value = "";
    inputPhoto.value = "";
    inputName.value = "";
    inputRace.value = "";
    labelMessageError.innerHTML = '';
}

// //Filtrar por descripción
function filterKitten(event) {
    event.preventDefault();
    const descrSearchText = input_search_desc.value;
    const raceSearchText = input_search_race.value;
    listElement.innerHTML = ''; // limpiar el campo
    // for (const kittenItem of kittenDataList) {
    //     if (kittenItem.desc.includes(descrSearchText)) {
    //         listElement.innerHTML += renderKitten(kittenItem);
    //     }
    // }
    const filterKitten = kittenDataList
        .filter((kat)=> kat.desc.includes(descrSearchText))
        // kat es un parámetro y es el objeto completo del array. kat sería como el kittenItem. 
        .filter((racefilter)=> racefilter.race.includes(raceSearchText));
    
    renderKittenList(filterKitten); // Mostrar el litado de gatitos en el HTML
}



//Fetch para el listado de gatitos 
let kittenDataList = []; 
const GITHUB_USER = 'Nuriacode';
const SERVER_URL = `https://dev.adalab.es/api/kittens/${GITHUB_USER}`;
const kittenListStored = JSON.parse(localStorage.getItem('kittensList'));
console.log(kittenListStored);

if(kittenListStored !== null){
    kittenDataList = kittenListStored;
    renderKittenList(kittenDataList);
} else {

 fetch(SERVER_URL, {
  method: 'GET',
  headers: {'Content-Type': 'application/json'},
})
    .then((responde) => responde.json())
    .then((data)=>{
         console.log(data);
         kittenDataList = data.results;
         renderKittenList(kittenDataList);
     }).catch(error => {
        console.error(error);
     });
}

//Mostrar el listado de gatitos
renderKittenList(kittenDataList);

//Eventos
linkNewFormElememt.addEventListener("click", handleClickNewCatForm);
searchButton.addEventListener("click", filterKitten);
buttonAdd.addEventListener("click", addNewKitten);
buttonCancelForm.addEventListener("click", cancelNewKitten);






