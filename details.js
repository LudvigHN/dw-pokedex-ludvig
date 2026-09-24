const url = new URL(window.location.href)
const params = url.searchParams
const id = params.get("id")
const apiUrl = "https://pokeapi.co/api/v2/pokemon/" + id
const rootDOM = document.querySelector("#root")

async function generatePokemon() {

    const response = await fetch(apiUrl);
    const data = await response.json();

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
    <h3 class="base_stats">Base Stats</h3>
    <ul class="base_stats__list"></ul>
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
    .then(response => response.json())
    .then(data => {let text = data.flavor_text_entries[0].flavor_text;
        text = text.replace("","")
        flavorTextDOM.innerHTML=text
    }
    )
    
    const baseStatsDOM = document.querySelector(".base_stats__list")
        data.stats.forEach(stat => {
            let statName = stat.stat.name
            switch (statName){
                case "hp":
                statName = "hp";
                break
                case "attack":
                statName = "atk";
                break
                case "defense":
                statName = "def";
                break
                case "special-attack":
                statName = "satk";
                break
                case "special-defense":
                statName = "sdef";
                break
                case "speed":
                statName = "spd";
                break
            }
            const statLi = document.createElement("li")
            statLi.classList.add("stats_list__stat")
            const statValue = stat.base_stat.toString()
            const paddedValue = statValue.padStart(3,"0")
            statLi.innerHTML = `
            <p class="stat__name">${statName}</p>
            <div class="stat_value_wrapper">
                <p class="stat_value_num">${paddedValue}</p>
                <progress class="stat_value_bar" max="255" value="${statValue}"></progress>
            </div>
            `
            baseStatsDOM.append(statLi)
        })
        
    
    // .then(info => {flavorTextDOM.innerHTML = info.flavor_text_entries[0].flavor_text}
    // )
    
}






function render(){
    generatePokemon()
}
render()