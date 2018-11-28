const PubSub = require('../helpers/pub_sub');

const SelectView = function (element) {
  this.element = element;
};

SelectView.prototype.bindEvents = function () {
  PubSub.subscribe('Countries:loaded', (event) => {
    const allData = event.detail;
    this.populate(allData);
  });
  this.element.addEventListener('change', (event)=> {
    const selectedName = event.target.value;
    PubSub.publish('SelectView:change', selectedName);
  });
};

SelectView.prototype.populate = function (countryNames) {
  countryNames.forEach((countryName, index) => {
    const option = document.createElement('option');
    option.textContent = countryName;
    option.value = index;
    this.element.appendChild(option);
  });
};

module.exports = SelectView;
