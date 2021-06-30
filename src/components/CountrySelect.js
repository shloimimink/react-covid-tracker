const CountrySelect = ({countries, getCountryData}) => {

    const handleChange = (e) => {
        console.log(e.target.value)
        const country = countries.find((item) => item.ID === e.target.value)
        getCountryData(country)
    }
    return (
        <select
            className="form-select mt-10 block w-full border p-3 rounded" onChange={handleChange}>
            <option value={0}>Select Country</option>
            {countries.map((country, index) => (
                <option key={index} value={country.ID}>
                    {country.Country}
                </option>
            ))}
        </select>
    );
};

export default CountrySelect;