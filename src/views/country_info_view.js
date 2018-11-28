const PubSub = require('../helpers/pub_sub');

const CountryInfoView = function (container) {
  this.container = container;
}

CountryInfoView.prototype.bindEvents = function () {
  PubSub.subscribe('Countries:info-loaded', (event) => {
    const country = event.detail;
    this.render(country);
  });
};

CountryInfoView.prototype.render = function (country) {
  this.container.innerHTML = '';
  // console.log(country[0].name);
  const infoHeader = document.createElement('h1');
  infoHeader.textContent = `Country Name: ${country[0].name}`;
  this.container.appendChild(infoHeader);
  const infoRegion = document.createElement('h2');
  infoRegion.textContent = `Region: ${country[0].region}`;
  this.container.appendChild(infoRegion);

  const infoFlag = document.createElement('img');
  infoFlag.setAttribute('src', country[0].flag);
  infoFlag.classList.add('image');
  this.container.appendChild(infoFlag);

  const infoLanguagesHeader = document.createElement('h2');
  infoLanguagesHeader.textContent = `Languages:`;
  this.container.appendChild(infoLanguagesHeader);

  const languagesList = country[0].languages;

  languagesList.forEach((language) => {
    const listItem = document.createElement('li');
    listItem.textContent = language.name;
    this.container.appendChild(listItem);
  });


};


module.exports = CountryInfoView;
