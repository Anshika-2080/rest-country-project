document.body.classList = localStorage.getItem('bodyClass')

const countryName = new URLSearchParams(location.search).get('name')
const flagImage = document.querySelector('.country-details img')
const countryHeading = document.querySelector('.country-heading')
const nativeName = document.querySelector('.native-name')
const population = document.querySelector('.population')
const region = document.querySelector('.region')
const subRgeion = document.querySelector('.sub-region')
const capital = document.querySelector('.capital')
const topLavelDomain = document.querySelector('.top-lavel-domain')
const currency = document.querySelector('.currency')
const languages = document.querySelector('.language')
const borderCountries = document.querySelector('.border-countries')

const themSwitcher = document.querySelector('.them-switcher')


fetch('./data.json').then((res) =>{
    return res.json();
}).then((data)=>{
    const object = data.find(obj =>obj.name === countryName);
    // console.log(object);
    flagImage.src = object.flags.svg

    countryHeading.innerText = object.name

    nativeName.innerText = object.nativeName

    population.innerText = object.population.toLocaleString('en-IN')

    region.innerText = object.region

    if(object.subRgeion){
        subRgeion.innerText = object.subRgeion
    } else{subRgeion.innerText = `Subregion not defined for ${object.name}`}

    if(object.capital){
        capital.innerText = object.capital;
       }else{capital.innerText =`No official capital of ${object.name}`}
    topLavelDomain.innerText = object.topLevelDomain.join(', ')

    if(object.currencies){
            currency.innerText = object.currencies[0].name;
        }
       else{currency.innerText =`No official currency available for ${object.name}`}

    languages.innerText = object.languages[0].name+'(English name), '+object.languages[0].nativeName+'(Native name)'

    if(object.borders){
        object.borders.forEach(border => {
            // console.log(border)
            fetch('./data.json').then((res) =>{
                return res.json();
            }).then((data)=>{
                const borderCountry = data.find(obj =>obj.alpha3Code === border)
            // console.log(borderCountry)
            const borderCountryTag = document.createElement('a')
            borderCountryTag.innerText = borderCountry.name
            borderCountryTag.href = `./country.html?name=${borderCountry.name}`
            // console.log(borderCountryTag)
            borderCountries.append(borderCountryTag)
            
        })
        })
    }
})


themSwitcher.addEventListener('click', () => {
    document.body.classList.toggle('dark')
    localStorage.setItem('bodyClass', document.body.classList)
})

if(document.body.classList.contains('dark')){
    themSwitcher.innerHTML = `<i class="fa-regular fa-sun"></i>&nbsp;&nbsp;Light Mode`
}
else{
    themSwitcher.innerHTML = `<i class="fa-regular fa-moon"></i>&nbsp;&nbsp;Dark Mode`
}

