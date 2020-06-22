const queryString = decodeURIComponent(window.location.search);
const {countryName, alpha2Code} = JSON.parse(queryString.split("=")[1])

function setCountryDetails(country) {
    const flag = document.querySelector('#flag')
    const name = document.querySelector('#name')

    const nativaName = document.querySelector('#native-name')
    const population = document.querySelector('#population')
    const region = document.querySelector('#region')
    const subregion = document.querySelector('#sub-region')
    const capital = document.querySelector('#capital')

    const topLevelDomain = document.querySelector('#top-level-domain')
    const currencies = document.querySelector('#currencies')
    const languages = document.querySelector('#languages')

    const borderCountries = document.querySelector("#border-countries")

    flag.src = country.flag
    name.innerHTML = country.name

    nativaName.innerHTML = `Native Name: ${country.nativeName}`
    population.innerHTML = `Population: ${country.population}`
    region.innerHTML = `Region: ${country.region}`
    subregion.innerHTML = `Sub Region: ${country.subregion}`
    capital.innerHTML = `Capital: ${country.capital}`

    topLevelDomain.innerHTML = `Top Level Domain: ${country.topLevelDomain.join(' ')}`
    let curr = []
    country.currencies.forEach(currency => {
        curr.push(currency.name)
    })
    currencies.innerHTML = `Currencies: ${curr.join(', ')}`
    lang = []
    country.languages.forEach(language => {
        lang.push(language.name)
    })
    languages.innerHTML = `Langugages: ${lang.join(', ')}`

    const borderCountryCodes = country.borders
    if(borderCountryCodes.length === 0) {
        const p = document.createElement("p")
        p.className = "col-auto"
        p.innerHTML = "None"
        borderCountries.appendChild(p)
    }
    borderCountryCodes.forEach(code => {
        fetch(`https://restcountries.eu/rest/v2/alpha/${code}`)
        .then(res => res.json())
        .then(data => {
            const {name, alpha2Code} = data
            
            const p = document.createElement("p")
            p.className = "col-auto"
            p.innerHTML = name
            p.id="border-country"
            borderCountries.appendChild(p)
        })
        .catch(err => console.log(err))
    })
}
 
function fetchCountryDetails() {
    fetch(`https://restcountries.eu/rest/v2/name/${countryName}`)
    .then(res => res.json())
    .then(data => {
        const country = data.filter(c => c.alpha2Code === alpha2Code)[0]
        console.log(country)
        setCountryDetails(country)
    })
    .catch(err => console.log(err))
}



fetchCountryDetails()