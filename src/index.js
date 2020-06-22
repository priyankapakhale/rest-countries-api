const row = document.querySelector("#countries")
const search = document.querySelector('#search')
const dropdown = document.querySelectorAll('.dropdown-item')

function showDetails(country) {
    const {name, alpha2Code} = country
    const query = {countryName: name, alpha2Code}
    location.href = "./detailsPage.html?country="+JSON.stringify(query)
}

function formatted(a) {
    let population = ''
    let quotient = Math.floor(a/1000)
    let rem = a%1000
    while(a !== 0) {
        if(rem === 0)
            rem = '000'
        population = ','+rem + population
        a = quotient
        quotient = Math.floor(a/1000)
        rem = a%1000
    }

    population = population.substring(1,population.length)
    return population
}

function createAndAddCountry(country) {
    const {name, capital, population, flag, region} = country
    const col = document.createElement("div")
    col.className = "col-lg-3 col-sm-12 pr-5 mb-5"

    const card = document.createElement("div")
    card.classList.add("card")
    
    const img = document.createElement("img")
    img.className="card-img-top"
    img.src = flag

    const cardBody = document.createElement("div")
    cardBody.classList.add("card-body")

    const h5 = document.createElement("h5")
    h5.classList.add("card-title")
    h5.innerHTML = name

    const div = document.createElement("div")
    div.classList.add("pb-3")
    div.innerHTML = `<p class="my-0">Population: ${formatted(population)}</p><p class="my-0">Region: ${region}</p><p class="my-0">Capital: ${capital}</p>`

    cardBody.appendChild(h5)
    cardBody.appendChild(div)
    card.appendChild(img)
    card.appendChild(cardBody)
    col.appendChild(card)
    row.appendChild(col)

    card.addEventListener("click", () => {
        showDetails(country)
    })
}

function fetchAllCountries() {
    fetch("https://restcountries.eu/rest/v2/all")
    .then(res => res.json())
    .then(data => {
        
        data.forEach(country => {
            createAndAddCountry(country)  
        })
    })
    .catch(err => console.log(err))
}

fetchAllCountries()

function updateCountries(countries) {
    var child = row.lastElementChild;  
    while (child) { 
        row.removeChild(child); 
        child = row.lastElementChild; 
    } 
    
    countries.forEach(country => {
        createAndAddCountry(country)
    })
}

search.addEventListener("input", (e) => {
    const countryName = e.target.value
    fetch(`https://restcountries.eu/rest/v2/name/${countryName}`)
    .then(res => res.json())
    .then(data => {
        updateCountries(data)
    })
    .catch(err => console.log(err))
})


dropdown.forEach(item => {
    item.addEventListener("click", (e) => {
        let region = e.target.innerHTML
        if(region === 'America')
            region = 'Americas'

        fetch(`https://restcountries.eu/rest/v2/region/${region}`)
        .then(res => res.json())
        .then(data => {
            updateCountries(data)
        })
        .catch(err => console.log(err))
    })
})