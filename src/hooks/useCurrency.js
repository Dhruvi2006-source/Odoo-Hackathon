import { useState, useEffect } from 'react';
import { currencyService } from '../services/currencyService';

export const useCurrency = () => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [conversionResult, setConversionResult] = useState(null);

  useEffect(() => {
    loadCountries();
  }, []);

  const loadCountries = async () => {
    setLoading(true);
    const data = await currencyService.getCountriesAndCurrencies();
    
    const formattedCountries = data.map(country => {
      const currencyCode = Object.keys(country.currencies || {})[0];
      const currencyInfo = country.currencies?.[currencyCode];
      // Get flag from country name (using restcountries flag CDN)
      const flagUrl = country.flags?.png || `https://flagcdn.com/48x36/${country.cca2?.toLowerCase()}.png`;
      return {
        name: country.name.common,
        currency: currencyCode,
        currencyName: currencyInfo?.name || 'Unknown',
        symbol: currencyInfo?.symbol || '',
        flag: flagUrl
      };
    }).filter(country => country.currency);
    
    setCountries(formattedCountries);
    setLoading(false);
  };

  const convertCurrency = async (fromCurrency, toCurrency, amount) => {
    setLoading(true);
    const result = await currencyService.convertCurrency(fromCurrency, toCurrency, amount);
    setConversionResult(result);
    setLoading(false);
    return result;
  };

  return {
    countries,
    loading,
    conversionResult,
    convertCurrency
  };
};