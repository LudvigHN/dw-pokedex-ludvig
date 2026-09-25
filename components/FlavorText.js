export function FlavorText(data){
    const flavorTextDOM = document.querySelector(".flavor_text")
        fetch(data.species.url)
            .then(response => response.json())
            .then(data => {
                let text = data.flavor_text_entries[0].flavor_text;
                text = text.replace("", "")
                flavorTextDOM.innerHTML = text
            }
            )
}