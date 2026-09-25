export function generateHeader() {
    const header = document.createElement("header")
    header.classList.add("header")
    header.innerHTML = `
    <div class="header_hero">
        <img src="assets/pokeball.svg" alt="" class="header_img">
        <h1 class="header_title">Pokédex</h1>
    </div>
    <div class="header_search">
        <input type="search" value="" placeholder="Search" class="search_bar">
        <select name="sort" id="sort">
            <option value="index">Index</option>
            <option value="name">Name</option>
        </select>
    </div>
    `
    return header
}