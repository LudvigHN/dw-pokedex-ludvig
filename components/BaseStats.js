export function BaseStats(data){
    const baseStatsDOM = document.querySelector(".base_stats__list")
    data.stats.forEach(stat => {
        let statName = stat.stat.name
        switch (statName) {
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
        const paddedValue = statValue.padStart(3, "0")
        statLi.innerHTML = `
            <p class="stat__name type_color_text">${statName}</p>
            <div class="stat_value_wrapper">
                <p class="stat_value_num">${paddedValue}</p>
                <meter class="stat_value_bar" max="255" value="${statValue}"></meter>
            </div>
            `
        baseStatsDOM.append(statLi)
    })
}