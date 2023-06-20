// server.test.js

const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server');

const { expect } = chai;
chai.use(chaiHttp);

describe('Server', () => {
  describe('POST /items', () => {
    it('should create a new item', (done) => {
      const newItem = { name: 'Test Item', price: 10.99 };

      chai
        .request(app)
        .post('/items')
        .send(newItem)
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body).to.deep.equal({ message: 'Item created successfully' });
          done();
        });
    });
  });
});
