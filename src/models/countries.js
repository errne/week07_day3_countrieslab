const RequestHelper = require('../helpers/request_helper.js');
const PubSub = require('../helpers/pub_sub.js');

const Country = function () {
  this.countries = null;
}

Country.prototype.getData = function () {
  console.log('sjdsjs 1');
  const requestHelper = new RequestHelper('https://restcountries.eu/rest/v2/all');
  requestHelper.get((arrayOfCountries) => {
    this.countries = arrayOfCountries;
    const countryNames = this.countries.map(country => country = country.name);
    PubSub.publish('Countries:loaded', countryNames);
    console.log(countryNames);
  });
};

Country.prototype.bindEvents = function () {
  PubSub.subscribe('SelectView:change', (event) => {
    const selectedIndex = event.detail;
    const countryName = this.countries[selectedIndex].name;
    this.getDataForName(countryName);
  });
};

Country.prototype.getDataForName = function (name) {
  console.log('sjdsjs 1');
  const requestHelper = new RequestHelper(`https://restcountries.eu/rest/v2/name/${name}`);
  requestHelper.get((data) => {
    this.text = data;
    PubSub.publish('Countries:info-loaded', this.text);
    console.log(this.text);
  });
};


module.exports = Country;
