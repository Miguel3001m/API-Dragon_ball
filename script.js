const pageInput = document.getElementById("pageInput")
const searchBtn = document.getElementById("searchBtn")
const resultsDiv = document.getElementById("results")

async function fetchCharacters(page){
    resultsDiv.innerHTML = "<p>Carregando..</p>"

    try {
        const response = await fetch(`https://dragonball-api.com/api/characters?=${page}`)
        const data = await response.json()
        // console.log(data)

        if(data.error){
            resultsDiv.innerHTML = "<p>Página inválida!</p>"
            return
        }

        resultsDiv.innerHTML = "";
        data.items.forEach(characters => {
            const card = document.createElement("div")
            card.className = "card"
            card.innerHTML = `
                <img src="${characters.image}" alt="${characters.name}">
                <h3>${characters.name}</h3>
                <p><strong>race:</strong> ${characters.race}</p>
                <p><strong>gender:</strong> ${characters.gender}</p>
                <p><strong>ki:</strong> ${characters.ki}</p>
                <p><strong>affiliation:</strong> ${characters.affiliation}</p>
            `
            resultsDiv.appendChild(card)
        });

    } catch (error) {
          resultsDiv.innerHTML = "<p>Erro ao buscar personagens!</p>"
    }
}

searchBtn.addEventListener("click", () => {
    const page = pageInput.value.trim()
    if(page){
        fetchCharacters(page)
    }else{
        resultsDiv.innerHTML = "<p>Digite um número de página!</p>"
    }
})

fetchCharacters(1)