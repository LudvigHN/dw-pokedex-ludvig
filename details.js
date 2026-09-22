const url = new URL(window.location.href)
const params = url.searchParams
const id = params.get("id")
console.log(id);
const apiUrl = "https://pokeapi.co/api/v2/pokemon/" + id
const rootDOM = document.querySelector("#root")
let response = ""
let data = ""
async function generatePokemon() {

    response = await fetch(apiUrl);
    data = await response.json();

    const card = document.createElement("article")
    card.classList.add("card")
    card.innerHTML = `
    <div class="title">
        <a href="index.html" class="back_home"><img src="assets/arrow.svg" alt="" class="back_home__arrow"></a>
        <h1 class="details_name">${data.name}</h1>
        <p class="pokemon_id">#${id.padStart(3, "0")}</p>
    </div>
    <img src="${data.sprites.other["official-artwork"].front_default}" alt="" class="details_img">
    <ul class="types"></ul>
    <h2>About</h2>
    <div class="info">
        <ul class="info_list">
            <li class="weight">
                <div class="info_item_top">
                    <img src="" alt="">
                    <p class="info__text">${data.weight/10} Kg</p>
                </div>
                <p class="info__small_text">Weight</p>
            </li>
            <li class="height">
                <div>
                    <img src="" alt="">
                    <p class="info__text">${data.height/10} m</p>
                    <p class="info__small_text">Height</p>
                </div>
            </li>
            <li class="abilities">
                <p class="info text"></p>
                <p class="info__small_text">abilities</p></li>
        </ul>
    </div>
    <p class="flavor_text"></p>
    `
    

    rootDOM.append(card)

    data.abilities.forEach(ability =>{
        const p = document.createElement("p")
        p.textContent = ability.ability.name
        const abilitiesDOM = document.querySelector(".abilities")
        abilitiesDOM.prepend(p)
    })
    const flavorTextDOM = document.querySelector(".flavor_text")
    fetch(data.species.url)
    .then(results => results.json())
    .then(info => {let text = info.flavor_text_entries[0].flavor_text;
        text = text.replace("","")
        flavorTextDOM.innerHTML=text
        
        
        
    }
    )
    
        
        
    
    // .then(info => {flavorTextDOM.innerHTML = info.flavor_text_entries[0].flavor_text}
    // )
    
}






function render(){
    generatePokemon()
}
render()