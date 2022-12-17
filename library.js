class Countries{

    // Get Country on search
    async getCountry(country){
        let response = await fetch(`https://restcountries.com/v3.1/name/${country}`);
        let countryDetails = await response.json();
        return {countryDetails};
    }

    // Get Country on load
    async loadCountries(url){
        let response = await fetch(url);
        let countryDetails = await response.json()
        return {countryDetails}
    }

    // Get Country by Region
    async getCountriesByRegion(region){
        let response = await fetch(`https://restcountries.com/v3.1/region/${region}`);
        let countryDetails = await response.json()
        return {countryDetails}
    }

}