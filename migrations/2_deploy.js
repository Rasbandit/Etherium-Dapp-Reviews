const SchloadCoin = artifacts.require('SchloadCoin');
const Location = artifacts.require('Location');
const LocationFactory = artifacts.require('LocationFactory');

module.exports = async function (deployer) {
  const coin = await deployer.deploy(SchloadCoin);
  const factory = await deployer.deploy(LocationFactory, SchloadCoin.address);
  // const loc = await deployer.deploy(Location, "Wendys", SchloadCoin.address);

  // FIXME:
  // loc.setCoin(coin);
  factory.createLocation("Pattys Pub", "329a8458-a942-11eb-888f-aa665a26d643")
  factory.createLocation("Mos Eisley Cantina", "329baf36-a942-11eb-ac32-aa665a26d643")
  factory.createLocation("Bull & Finch Pub (cheers)", "329d1704-a942-11eb-a2e5-aa665a26d643")
  factory.createLocation("Bull & Finch Pub (cheers)", "329d1704-a942-11eb-a2e5-aa665a26d643")
  factory.createLocation("Macinalleys", "329e090c-a942-11eb-bf75-aa665a26d643")
  factory.createLocation("Scranton Chili’s", "329f118a-a942-11eb-b6de-aa665a26d643")
  factory.createLocation("The prancing pony", "32a06fda-a942-11eb-aea6-aa665a26d643")
  factory.createLocation("Hog’s head", "32a1a85a-a942-11eb-8b31-aa665a26d643")
  factory.createLocation("Bar da Skina", "32a2b10a-a942-11eb-9857-aa665a26d643")
};
