let countries = new Countries
let searchBar = document.querySelector("#search-bar")

// Display Country on Search
searchBar.addEventListener("input", (e) =>{
        let searchValue = document.querySelector("#search-bar").value
        if(searchValue !== ""){
        document.querySelector("main").innerHTML = ""
        countries.getCountry(searchValue)
        .then((result) => {
            result.countryDetails.forEach(function(content){
                let box = document.createElement("div") 
                box.className = "box" 
                box.innerHTML =
                `   <div class="image-box" ><img src="${content.flags.svg}" alt=" Flag of ${content.name.official}" /></div>
                    <div class="sub-box" >
                    <h2>${content.name.official}</h2>
                    <p><b>Population: </b>${(content.population).toLocaleString()}</p>
                    <p><b>Region: </b>${content.region}</p>
                    <p><b>Capital: </b>${content.capital}</p>
                    </div>`
                document.querySelector("main").appendChild(box)
            })
        })
        .catch(err => console.log(err))
    }else{
        document.querySelector("main").innerHTML = ""
        countries.loadCountries("https://restcountries.com/v3.1/all")
        .then((result) => {
            console.log(result.countryDetails);
            result.countryDetails.forEach(function(content){
                let box = document.createElement("div") 
                box.className = "box" 
                box.innerHTML =
                `   <div class="image-box" ><img src="${content.flags.svg}" alt=" Flag of ${content.name.official}" /></div>
                    <div class="sub-box" >
                    <h2>${content.name.official}</h2>
                    <p><b>Population: </b>${(content.population).toLocaleString()}</p>
                    <p><b>Region: </b>${content.region}</p>
                    <p><b>Capital: </b>${content.capital}</p>
                    </div>`
                document.querySelector("main").appendChild(box)
            })
        })
        .catch(err => console.log(err))
    }
        e.preventDefault()
    })
    
//Display Country on load  
window.addEventListener('DOMContentLoaded', (event) => {
     countries.loadCountries("https://restcountries.com/v3.1/all")
    .then((result) => {
        console.log(result.countryDetails);
        result.countryDetails.forEach(function(content){
            let box = document.createElement("div") 
            box.className = "box" 
            box.innerHTML =
            `   <div class="image-box" ><img src="${content.flags.svg}" alt=" Flag of ${content.name.official}" /></div>
                <div class="sub-box" >
                <h2>${content.name.official}</h2>
                <p><b>Population: </b>${(content.population).toLocaleString()}</p>
                <p><b>Region: </b>${content.region}</p>
                <p><b>Capital: </b>${content.capital}</p>
                </div>`
            document.querySelector("main").appendChild(box)
        })
    })
    .catch(err => console.log(err))

});

//Display Countries according to region
document.querySelector("ul").addEventListener("click", function(e){
    document.querySelector("main").innerHTML = ""
    if(e.target.classList.contains("region-btn")){
        document.querySelector("#filter-text").textContent = e.target.textContent
        countries.getCountriesByRegion(e.target.textContent)
        .then((result) => {
            console.log(result.countryDetails);
            result.countryDetails.forEach(function(content){
                let box = document.createElement("div")
                box.className = "box" 
                box.innerHTML =
                `   <div class="image-box"><img src="${content.flags.svg}" alt=" Flag of ${content.name.official}" /></div>
                    <div class="sub-box" >
                    <h2>${content.name.official}</h2>
                    <p><b>Population: </b>${(content.population).toLocaleString()}</p>
                    <p><b>Region: </b>${content.region}</p>
                    <p><b>Capital: </b>${content.capital}</p>
                    </div>`
                document.querySelector("main").appendChild(box)
            })
        })
        .catch(err => console.log(err))
    }
})

// Display a page when a country detail is clicked
document.querySelector("main").addEventListener("click", function(e){
    if(e.target.classList.contains("box")){
        console.log(e.target.firstElementChild.nextElementSibling.firstElementChild.textContent)
        countries.getCountry(e.target.firstElementChild.nextElementSibling.firstElementChild.textContent)
        .then((result) => {
            console.log(result.countryDetails);
            result.countryDetails.forEach(function(content){
                let page = document.createElement("div") 
                page.className = "page" 
                page.innerHTML =
                `   <button class="back-btn" >Back</button>
                    <div>
                        <div>
                            <img src="${content.flags.svg}" class="detail-img" alt=" Flag of ${content.name.official}" />
                        </div>
                        <div>
                            <h2>${content.name.official}</h2>
                            <div class="page-details">
                                <div>
                                    <p><b>Native Name: </b>${content?.name?.nativeName[Object.keys(content?.name?.nativeName)]?.common}</p>
                                    <p><b>Population: </b>${(content.population).toLocaleString()}</p>
                                    <p><b>Region: </b>${content.region}</p>
                                    <p><b>Sub Region: </b>${content.subregion}</p>
                                    <p><b>Capital: </b>${content.capital}</p>
                                </div>
                                <div>
                                    <p><b>Top Level Domain: </b>${content.tld}</p>
                                    <p><b>Currencies: </b>${content?.currencies[Object.keys(content?.currencies)]?.name}</p>
                                    <p><b>Languages: </b>${Object.keys(content?.languages)[0]}</p>
                                </div>
                            </div>
                            <p class="border" ><b>Border Countries:</b><div class="border-list">${content?.borders?.map((item)=>{
                                return `<button class="border-country">${item}</button>`
                            }) ??""}</div></p>
                        </div>
                    </div>`
                console.log(page)
                document.querySelector("main").innerHTML = ""
                document.querySelector("section").style.display = "none"
                document.querySelector("aside").style.display = "none"
                document.querySelector("main").appendChild(page)
            })
        })
        .catch(err => console.log(err))
    }
})

//Display Country details when border is clicked
document.querySelector("main").addEventListener("click", function(e){
    if(e.target.classList.contains("border-country")){
        countries.getCountry(e.target.textContent)
        .then((result) => {
            console.log(result.countryDetails);
            result.countryDetails.forEach(function(content){
                let page = document.createElement("div") 
                page.className = "page" 
                page.innerHTML =
                `   <button class="back-btn" >Back</button>
                    <div>
                        <div>
                            <img src="${content.flags.svg}" class="detail-img" alt=" Flag of ${content.name.official}" />
                        </div>
                        <div>
                            <h2>${content.name.official}</h2>
                            <div class="page-details">
                                <div>
                                    <p><b>Native Name: </b>${content?.name?.nativeName[Object.keys(content?.name?.nativeName)]?.common}</p>
                                    <p><b>Population: </b>${(content.population).toLocaleString()}</p>
                                    <p><b>Region: </b>${content.region}</p>
                                    <p><b>Sub Region: </b>${content.subregion}</p>
                                    <p><b>Capital: </b>${content.capital}</p>
                                </div>
                                <div>
                                    <p><b>Top Level Domain: </b>${content.tld}</p>
                                    <p><b>Currencies: </b>${content?.currencies[Object.keys(content?.currencies)]?.name}</p>
                                    <p><b>Languages: </b>${Object.keys(content?.languages)[0]}</p>
                                </div>
                            </div>
                            <p class="border" ><b>Border Countries: </b><div class="border-list">${content?.borders?.map((item)=>{
                                return `<button class="border-country">${item}</button>`
                            }) ??""}</div></p>
                        </div>
                    </div>`
                console.log(page)
                document.querySelector("main").innerHTML = ""
                document.querySelector("section").style.display = "none"
                document.querySelector("aside").style.display = "none"
                document.querySelector("main").appendChild(page)
            })
        })
        .catch(err => console.log(err))
    }
})

//Buttons
// Dark mode
document.querySelector("#color-mode").addEventListener("click", function(){
    if(document.querySelector("#color-mode").classList.contains("light-mode")){
        document.querySelector("#color-mode").className = "dark-mode"
        document.querySelector("#color-icon").src = "images/light-mode-icon.png"
        document.querySelector("#color-mode-text").textContent = "Light Mode"
        document.querySelector("body").classList.add("body-dark-mode")
        document.querySelector("header").classList.add("header-dark-mode")
        document.querySelector("#search-bar").classList.add("input-dark-mode")
        document.querySelector("#filter-btn").style.background = "hsl(209, 23%, 22%)"
        document.querySelector("#filter-btn").style.color = "white"
        document.querySelector("ul").style.background = "hsl(209, 23%, 22%)"
        Array.from(document.querySelectorAll("button")).forEach(function(item){
            item.style.color = "white"
            item.style.background = "hsl(209, 23%, 22%)"
        })
        Array.from(document.querySelectorAll("li")).forEach(function(item){
            item.style.color = "white"
        })
        Array.from(document.querySelectorAll(".box")).forEach(function(item){
            item.style.background = "hsl(209, 23%, 22%)"
            item.style.color = "white"
        })
        Array.from(document.querySelectorAll(".page")).forEach(function(item){
            item.style.color = "white"
        })
    }
    else{
        document.querySelector("#color-mode").className = "light-mode"
        document.querySelector("#color-icon").src = "images/moon-6686.svg"
        document.querySelector("#color-mode-text").textContent = "Dark Mode"
        document.querySelector("body").classList.remove("body-dark-mode")
        document.querySelector("header").classList.remove("header-dark-mode")
        document.querySelector("#search-bar").classList.remove("input-dark-mode")
        document.querySelector("#filter-btn").style.background = "white"
        document.querySelector("#filter-btn").style.color = "hsl(209, 23%, 22%)"
        document.querySelector("ul").style.background = "white"
        Array.from(document.querySelectorAll("button")).forEach(function(item){
            item.style.color = "hsl(209, 23%, 22%)"
            item.style.background = "white"
        })
        Array.from(document.querySelectorAll("li")).forEach(function(item){
            item.style.color = "hsl(209, 23%, 22%)"
        })
        Array.from(document.querySelectorAll(".box")).forEach(function(item){
            item.style.background = "white"
            item.style.color = "hsl(209, 23%, 22%)"
        })
        Array.from(document.querySelectorAll(".page")).forEach(function(item){
            item.style.color = "hsl(209, 23%, 22%)"
        })
    }
})

// Filter button
document.querySelector("#filter-btn").addEventListener("click",function(){
    if(document.querySelector("ul").classList.contains("closed")){
    document.querySelector("ul").style.display ="block"
    document.querySelector("ul").className = "opened"
    document.querySelector("#dd-icon").style.transform = "rotate(0deg)"
    }else{
    document.querySelector("ul").style.display ="none"
    document.querySelector("ul").className = "closed"
    document.querySelector("#dd-icon").style.transform = "rotate(180deg)"
    }
})
// Back Button
document.querySelector("main").addEventListener("click", function(e){
    if(e.target.classList.contains("back-btn")){
    document.querySelector("main").innerHTML = ""
    if (window.screen.width <= 1280){
        document.querySelector("section").style.display = "block"
    }else{
        document.querySelector("section").style.display = "flex"
    }
    document.querySelector("aside").style.display = "flex"
    countries.loadCountries("https://restcountries.com/v3.1/all")
    .then((result) => {
        console.log(result.countryDetails);
        result.countryDetails.forEach(function(content){
            let box = document.createElement("div") 
            box.className = "box" 
            box.innerHTML =
            `   <div class="image-box" ><img src="${content.flags.svg}" alt=" Flag of ${content.name.official}" /></div>
                <div class="sub-box" >
                <h2>${content.name.official}</h2>
                <p><b>Population: </b>${(content.population).toLocaleString()}</p>
                <p><b>Region: </b>${content.region}</p>
                <p><b>Capital: </b>${content.capital}</p>
                </div>`
            document.querySelector("main").appendChild(box)
        })
    })
    .catch(err => console.log(err))
    }
})