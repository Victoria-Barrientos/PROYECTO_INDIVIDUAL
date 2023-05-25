/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Videogame, conn } = require('../../src/db.js');

const agent = session(app);
const videogame = {
  name: 'Super Marian Sis',
  description: "Una fontanera llamada Marian viaja por un laberinto subterráneo con su hermana, Luigina, intentando salvar a un principe capturado.",
  releaseDate: '1985-09-13',
  image: 'https://images.unsplash.com/photo-1612404459571-ccef4b6588e7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80',
  rating: 4,
  genres: [ "Action", "Adventure" ],
  platforms: [ "PlayStation 5", "Xbox Series S/X", "Nintendo Entertainment System (NES)" ]
};

describe('Videogame routes', () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error('Unable to connect to the database:', err);
    })
  );

  beforeEach(() => Videogame.sync({ force: true }).then(() => Videogame.create(videogame)));

  describe('GET /videogames', () => {
    it('should get 200 and return an array of videogames', async () => {
      const response = await agent.get('/videogames');
      expect(response.status).to.equal(200);
      expect(response.body).to.be.an('array');
      expect(response.body.length).to.be.greaterThan(0);
      expect(response.body.find((game) => game.name === videogame.name)).to.exist;
    });
  });

  describe('POST /videogames', () => {
    beforeEach(async () => {
      await Videogame.destroy({
        where: {},
        truncate: true,
      });
    });
  
    it('should create a new videogame', async () => {
      const videogame = {
        name: 'Super Marian Sis',
        description: "Una fontanera llamada Marian viaja por un laberinto subterráneo con su hermana, Luigina, intentando salvar a un principe capturado.",
        releaseDate: '1985-09-13',
        image: 'https://images.unsplash.com/photo-1612404459571-ccef4b6588e7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80',
        rating: 4,
        genres: [ "Action", "Adventure" ],
        platforms: [ "PlayStation 5", "Xbox Series S/X", "Nintendo Entertainment System (NES)" ]
      };
  
      const response = await agent
      .post('/videogames')
      .send(videogame);
  
      expect(response.statusCode).to.equal(201);
      expect(response.body.videogame.name).to.equal('Super Marian Sis');
    });
  });
  
    
  });  




