module.exports = function chaiSpectron(app) {
  return function chaiSpectronHelper(chai, utils) {
    const Assertion = chai.Assertion;
    const addProperty = (...args) => Assertion.addProperty(...args);
    const addMethod = (...args) => Assertion.addMethod(...args);
    const overwriteMethod = (...args) => Assertion.overwriteMethod(...args);
    const overwriteProperty = (...args) => Assertion.overwriteProperty(...args);

    function requireDOMFlag(_this, word) {
      if (!utils.flag(_this, 'dom')) {
        throw new Error(`Can only test ${word} of dom elements`);
      }
    }

    addProperty('dom', function dom() {
      utils.flag(this, 'dom', true);
    });

    addMethod('text', async function spectronText(expected) {
      requireDOMFlag(this, 'text');

      const selector = utils.flag(this, 'object');
      const getText = await app.client.getText(selector);
      const textArray = (getText instanceof Array) ? getText : [ getText ];

      this.assert(
        expected instanceof RegExp ?
          textArray.some(text => expected.test(text)) :
          textArray.some(text => text === expected),
        `Expected element <${selector}> to contain text "${expected}" but only found: ${textArray}`,
        `Expected element <${selector}> not to contain text "${expected}" but found: ${textArray}`,
      );
    });

    overwriteProperty('exist', function(_super) {
      return async function domExist() {
        if (!utils.flag(this, 'dom') || !utils.flag(this, 'object')) {
          return _super.call(this);
        }

        const selector = utils.flag(this, 'object');

        this.assert(
          await app.client.isExisting(selector),
          `Expected element <${selector}> to exist`,
          `Expected element <${selector}> to not exist`,
        );
      };
    });
  };
};
