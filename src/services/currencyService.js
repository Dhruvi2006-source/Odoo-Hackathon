import axios from 'axios';

export const currencyService = {
  // Get all countries and their currencies
  getCountriesAndCurrencies: async () => {
    try {
      const response = await axios.get(
        'https://restcountries.com/v3.1/all?fields=name,currencies'
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching countries:', error);
      return [];
    }
  },

  // Convert currency
  convertCurrency: async (fromCurrency, toCurrency, amount) => {
    try {
      const response = await axios.get(
        `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`
      );
      const rate = response.data.rates[toCurrency];
      return {
        convertedAmount: amount * rate,
        rate: rate,
        lastUpdated: new Date().toLocaleString()
      };
    } catch (error) {
      console.error('Error converting currency:', error);
      return null;
    }
  }
};