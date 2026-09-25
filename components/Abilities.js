export function Abilities(data){
    data.abilities.forEach(ability => {
            const p = document.createElement("p")
            p.textContent = ability.ability.name
            p.classList.add("ability")
            const abilitiesDOM = document.querySelector(".abilities")
            abilitiesDOM.prepend(p)
        })
}