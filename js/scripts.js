
// pokemon list with stats

let pokemonStats = (function () {
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  
// functions to push it to the page

function add(pokemon) {
   pokemonList.push(pokemon);
}

function getAll() {
  return pokemonList;
}

function addListItem(pokemon) {  
  let statsPokemon = document.querySelector('.pokemon-list');
  let listPokemon = document.createElement('li');
  let button = document.createElement('button');
  button.innerText = pokemon.name;
  button.classList.add('btn','btn-primary');
  button.setAttribute('data-toggle','modal');
  button.setAttribute('data-target','#modal')
  listPokemon.append(button);
  statsPokemon.append(listPokemon);
  button.addEventListener('click', function () {
  showDetails(pokemon);  
});
}

function loadList() {
  return fetch(apiUrl).then(function (response) {
  return response.json();
  }).then(function (json) {
  json.results.forEach(function (item) {
  let pokemon = {
  name: item.name,
  detailsUrl: item.url
};
  add(pokemon);
});
}).catch(function (e) {
console.error(e);
});
}

function loadDetails(item) {
  let url = item.detailsUrl;
  return fetch(url).then(function (response) {
  return response.json();
  }).then(function (details) {
  return details
  }).catch(function (e) {
  console.error(e);
  });
}

// show the pokemons in the modal

function showDetails(pokemon) {
  loadDetails(pokemon).then(function(x) {
  const {name,height,sprites, types} = x; 
  showModal(name, height, sprites, types);
  });
}
// modal contents 

function showModal(name, text, sprites, types) { 

  
  let modalTitle =  document.querySelector('.modal-title');
  modalTitle.innerText = name;

  let modalBody = document.querySelector('.modal-body');
  modalBody.innerText = '';
   
  let heightElement =  document.createElement('height');
  heightElement.innerText = `height: ${text}`;
  
  let imgElement = document.createElement('img');
  imgElement.src = sprites.front_default;
 
  let typeElement = document.createElement('types')
  typeElement.innerText = 'Type:' + '  ' + types[0].type.name;
  if(types[1])
    typeElement.innerText ='Type:' + '  ' +  types[0].type.name + ', ' + types[1].type.name;

modalBody.appendChild(heightElement)
modalBody.appendChild(imgElement)
modalBody.appendChild(typeElement)

}

// returning all the details 

  return {
  add: add,
  getAll: getAll,
  addListItem: addListItem,
  loadList: loadList,
  loadDetails: loadDetails,
  showDetails: showDetails
};

})();

// forEach function
pokemonStats.loadList().then(function() {
pokemonStats.getAll().forEach(function(pokemon){
  console.log(pokemon)
pokemonStats.addListItem(pokemon);
 });
});

