import React, { useState, useEffect } from 'react';
import { useCurrency } from '../hooks/useCurrency';
import { RefreshCw, ArrowRightLeft } from 'lucide-react';
import './CurrencyConverter.css';

const CurrencyConverter = () => {
  const { countries, convertCurrency, conversionResult, loading } = useCurrency();
  const [amount, setAmount] = useState(100);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');

  const handleConvert = async () => {
    if (amount && fromCurrency && toCurrency) {
      await convertCurrency(fromCurrency, toCurrency, amount);
    }
  };

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  useEffect(() => {
    handleConvert();
  }, []);

  const uniqueCurrencies = countries.reduce((acc, country) => {
    if (!acc.find(c => c.currency === country.currency)) {
      acc.push(country);
    }
    return acc;
  }, []);

  return (
    <section className="odoo-converter">
      <h2 className="odoo-title">
        <img src="https://www.odoo.com/web/image/website/1/logo/Odoo" alt="Odoo Logo" className="odoo-logo" />
        Currency Converter
      </h2>
      <form className="odoo-form" onSubmit={e => {e.preventDefault(); handleConvert();}}>
        <input
          type="number"
          value={amount}
          min={0}
          onChange={e => setAmount(parseFloat(e.target.value))}
          className="odoo-input"
          placeholder="Amount"
        />
        <select
          value={fromCurrency}
          onChange={e => setFromCurrency(e.target.value)}
          className="odoo-select"
        >
          {uniqueCurrencies.map(country => (
            <option key={country.currency} value={country.currency}>
              {/* Show flag and currency */}
              {country.flag && (
                <img src={country.flag} alt={country.name + ' flag'} style={{width:'20px',verticalAlign:'middle',marginRight:'6px'}} />
              )}
              {country.currency} - {country.currencyName}
            </option>
          ))}
        </select>
        <button type="button" onClick={swapCurrencies} className="odoo-swap" title="Swap currencies">
          <ArrowRightLeft className="odoo-swap-icon" />
        </button>
        <select
          value={toCurrency}
          onChange={e => setToCurrency(e.target.value)}
          className="odoo-select"
        >
          {uniqueCurrencies.map(country => (
            <option key={country.currency} value={country.currency}>
              {country.flag && (
                <img src={country.flag} alt={country.name + ' flag'} style={{width:'20px',verticalAlign:'middle',marginRight:'6px'}} />
              )}
              {country.currency} - {country.currencyName}
            </option>
          ))}
        </select>
        <button type="submit" disabled={loading} className="odoo-convert-btn">
          {loading ? <RefreshCw className="odoo-loading" /> : null}
          Convert
        </button>
      </form>
      {conversionResult && (
        <div className="odoo-result">
          <div className="odoo-result-main">
            <span className="odoo-result-amount">{conversionResult.convertedAmount.toFixed(2)} {toCurrency}</span>
          </div>
          <div className="odoo-result-details">
            <span>1 {fromCurrency} = {conversionResult.rate.toFixed(4)} {toCurrency}</span>
            <span className="odoo-result-date">Last updated: {conversionResult.lastUpdated}</span>
          </div>
        </div>
      )}
    </section>
  );
};

export default CurrencyConverter;