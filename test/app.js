const chai = require('chai');
const { expect } = chai;
const { Application } = require('spectron');
const electron = require('electron');
const path = require('path');
const chaiSpectron = require('./helpers/chai-spectron');

const app = new Application({
  path: electron,
  args: [ path.join(__dirname, '..') ],
});

chai.use(require('chai-as-promised'));
chai.use(chaiSpectron(app));

describe('App', function() {
  this.timeout(20000);
  beforeEach(async () => await app.start());
  afterEach(async () => await app.stop());

  it('should see app title', async () => {
    await expect(app.client.getTitle()).to.eventually.equal('Kymera Simulator');
  });

  describe('Display', () => {
    it('should display data');

    it('should display translated braille text', async () => {
      await expect('.translated').dom.to.exist;
      await expect('.translated').dom.to.have.text(/./);
    });

    it('should display a time value', async () => {
      await expect('.untranslated').dom.to.exist;
      await expect('.untranslated').dom.to.have.text(/\d+:\d+/);
    });
  });
});
