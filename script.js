document.body.classList = localStorage.getItem('bodyClass')

const countriesContainer = document.querySelector('.countries-container')
const filterByRegion = document.querySelector('.filter-by-region')
const themSwitcher = document.querySelector('.them-switcher')
const searchInput = document.querySelector('.search-container input')

let allCountriesData 


fetch('./data.json').then((res) =>{
    if(!res.ok){
        throw new Error(`HTTP ERROR! Status: ${res.status}`);
    }return res.json();
}).then((data) =>{
  rendorCountries(data)
  allCountriesData = data
}).catch((Error) => console.error("Unable to fetch data:", Error));

// new URLSearchParams(location.search).get('name')

// them switcher.......................

themSwitcher.addEventListener('click', () => {
  document.body.classList.toggle('dark')
  localStorage.setItem('bodyClass', document.body.classList)
})

if(document.body.classList.contains('dark')){
  themSwitcher.innerHTML = `<i class="fa-regular fa-sun"></i>&nbsp;&nbsp;Light Mode`
}else{
  themSwitcher.innerHTML = `<i class="fa-regular fa-moon"></i>&nbsp;&nbsp;Dark Mode`
}

// them switcher........................

filterByRegion.addEventListener('change', (evt)=> {
  console.log(filterByRegion.value)
  fetch('./data.json').then((res) =>{
    return res.json()
  }).then((data) => {
      const continent = data.filter(obj =>obj.region === filterByRegion.value)
      console.log(continent)
      rendorCountries(continent)
  })
})

function rendorCountries(data) {
  countriesContainer.innerHTML = ""
    data.forEach((country) =>{
        // console.log(country.borders);
        const countryCard = document.createElement('a');
        countryCard.classList.add('country-card');
        countryCard.href = `./country.html?name=${country.name}`;
        countryCard.innerHTML = `
          <img src="${country.flags.svg}" alt="${country.name}'s flag" />
          <div class="card-text">
            <h3 class="card-title">${country.name}</h3>
            <p><b>Population: </b>${country.population.toLocaleString('en-IN')}</p>
            <p><b>Region: </b>${country.region}</p>
            <p><b>Capital: </b>${country.capital}</p>
          </div>`;
        countriesContainer.append(countryCard)
    })
}

searchInput.addEventListener('input', (evt)=> {
  const filteredCountries = allCountriesData.filter((country) => country.name.toLowerCase().includes(evt.target.value.toLowerCase()))
  rendorCountries(filteredCountries)
})