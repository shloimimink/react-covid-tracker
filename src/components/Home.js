import React, {useEffect, useState} from 'react';
import CountrySelect from "./CountrySelect";
import loadingImage from '../assets/hourglass.gif'
import DataTitle from "./DataTitle";
import DataBoxes from "./DataBoxes";
import axios from 'axios'

const Home = () => {
    const [state, setState] = useState({
        loading: true,
        title: 'Global',
        dataDate: '',
        stats: {},
        countries: [],
        loadingImage: require('../assets/hourglass.gif')
    })

    const fetchCovidData = async () => {
        const res = await axios.get('https://api.covid19api.com/summary')
        return res.data
    }

    useEffect(() => {
        fetchCovidData().then(data => {
            const dataDate = data.Date
            const stats = data.Global
            const countries = data.Countries
            const loading = false

            setState({
                ...state,
                dataDate,
                stats,
                countries,
                loading
            })
        })
        // eslint-disable-next-line
    }, [setState])

    const getCountryData = (country) => {
        setState({
            ...state,
            stats: country,
            title: country.Country
        })
    }

    const clearCountryData = async () => {
        setState({
            ...state,
            loading: true
        })
        const data = await fetchCovidData()
        const title = 'Global'
        const stats = data.Global

        setState({
            ...state,
            title,
            stats,
            loading: false
        })
    }

    if (state.loading) {
        return (
            <main className="flex flex-col align-center justify-center text-center">
                <div className="text-gray-500 text-3xl mt-10 mb-6">
                    Fetching Data
                </div>
                <img src={loadingImage} alt="" className="w-24 m-auto"/>
            </main>
        )
    }

    return (
        <main>
            <DataTitle {...state}/>
            <DataBoxes stats={state.stats}/>
            <CountrySelect countries={state.countries} getCountryData={getCountryData}/>
            {state.stats.Country && (
                <button
                    className="bg-green-700 text-white rounded p-3 mt-10 focus:outline-none hover:bg-green-600"
                    onClick={clearCountryData}
                >
                    Clear Country
                </button>
            )}

        </main>
    );
};

export default Home;