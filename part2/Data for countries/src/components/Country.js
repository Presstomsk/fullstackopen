const Country = ({country}) => {
    const languages = []

    for (const prop in country.languages)
    {
        languages.push({
            id: languages.length + 1,
            language: country.languages[prop]
        })
    }   

    return(
        <>
            <h1>{country.name.common}</h1>
            <p>Capital: {country.capital}</p>
            <p>Area: {country.area}</p>
            <h3>languages:</h3>
            <ul>
                { languages.map(lang => <li key={lang.id}>{lang.language}</li>)}
            </ul>
            <img src={country.flags.png} alt={country.flags.alt}/>
        </>
    )
}

export default Country