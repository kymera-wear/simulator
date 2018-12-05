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

describe('Test', function() {
  this.timeout(20000);
  beforeEach(async () => await app.start());
  afterEach(async () => await app.stop());

  it('should run a test', () => {
    expect(true).to.equal(true);
  });

  it('should see test title', async () => {
    await expect(app.client.getTitle()).to.eventually.equal('Test');
  });

  it('should see "Hello World!"', async () => {
    await expect('h1').dom.to.have.text('Hello World!');
    await expect('h1').dom.to.exist;
  });
});
