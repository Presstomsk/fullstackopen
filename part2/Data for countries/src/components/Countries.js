import Country from "./Country"

const Countries = ({countries}) => {
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
                countries.map(country => <>{country.name.common}<br/></>)
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