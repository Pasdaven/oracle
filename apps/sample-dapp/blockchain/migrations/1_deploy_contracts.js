const App = artifacts.require('App');
const Callback = artifacts.require('Callback');

module.exports = function (deployer) {
  deployer.deploy(App);
  deployer.deploy(Callback);
};
