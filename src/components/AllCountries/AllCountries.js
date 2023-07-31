//import React, { useState, useEffect } from 'react';
import React, { useState, useEffect } from 'react';

import { apiURL } from "../util/api";
import SearchInput from '../SearchInput';
import FilterCountry from '../util/FilterCountry'; 
import { Link } from 'react-router-dom';

const AllCountries = () => {
  const [countries, setCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null); // Changed initial state for error to null

  const getAllCountries = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(apiURL);

      if (!res.ok) {
        throw new Error('Something went wrong');
      }

      const data = await res.json();

      setCountries(data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
    }
  };

  const getCountryByName = async (countryName) => {
    try {
      setIsLoading(true);
      const res = await fetch(`${apiURL}/name/${countryName}`);

      if (!res.ok) throw new Error('Failed to fetch data');

      const data = await res.json();
      setCountries(data);
      setIsLoading(false);
      setError(null); // Reset error when data is successfully fetched
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
    }
  };

  useEffect(() => {
    getAllCountries();
  }, []);

  return (
    <div className='all_country_wrapper'>
      <div className='country_top'>
        {/* Add any additional content for the top section if needed */}
      </div>
      <div>
        <SearchInput onSearch={getCountryByName} />
      </div>
      <div className='filter'>
        <FilterCountry onSelect={getCountryByName} />
      </div>
      <div className='country_bottom'>
        {isLoading && !error && <h4>Loading....</h4>}
        {error && !isLoading && <h4>{error}</h4>}

        {countries.map(country => (
          <Link to={`/country/${country.name.common}`} key={country.name.common}>
            <div className='country_card' key={country.name.common}>
              <div className='country_img'>
                <img src={country.flags.png} alt="" />
              </div>

              <div className='country_data'>
                <h3>{country.name.common}</h3>
                <h6>Population: {country.population}</h6>
                <h6>Region: {country.region}</h6>
                <h6>Capital: {country.capital}</h6>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AllCountries;
