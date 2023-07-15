import Country from "./Country"
import ShowButton from "./ShowCountryButton"

const Countries = ({countries, showCountry}) => {
    if (countries.length > 10)
    {
        return(
            <>Too many matches, specify another filter</>
        )
    }
    else
    {
        if (countries.length > 1)
        {
            return(
                countries.map(country => <div>{country.name.common} <ShowButton showCountry={() => showCountry(country.name.common)}/><br/></div>)
            )
        }
        
        if (countries.length === 1)
        {
            return(
                countries.map(country => <Country country={country}/>)
            )
        }        
    }
}

export default Countries