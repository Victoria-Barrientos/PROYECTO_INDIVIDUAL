/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Videogame, conn } = require('../../src/db.js');

const agent = session(app);
const videogame = {
  name: 'Super Mariana Bros',
  description: "Un fontanero llamado Mario viaja por un laberinto subterráneo con su hermano, Luigi, intentando salvar a una princesa capturada.",
  releaseDate: '1985-09-13',
  image: 'https://www.example.com/supermariobros.png',
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

  // describe('POST /videogames', () => {
  //   beforeEach(async () => {
  //     await Videogame.destroy({
  //       where: {},
  //       truncate: true,
  //     });
  //   });
  
  //   it('should create a new videogame', async () => {
  //     const newGame = {
  //       name: 'Super Mariana Bros',
  //       description: 'A plumber named Mariana travels through an underground labyrinth with his brother, Lugi, trying to save a captured princess.',
  //       platforms: ['Nintendo Switch', 'PlayStation 5', 'Xbox Series S/X'],
  //       releaseDate: '2022-02-10T00:00:00.000Z',
  //       image: 'https://www.example.com/supermarianabros.png',
  //       rating: 4.5,
  //       genres: ['action']
  //     };
  
  //     const response = await agent
  //     .post('/videogames')
  //     .send(newGame);
  
  //     expect(response.statusCode).toBe(201);
  //     expect(response.body.videogame.name).toBe('Super Mariana Bros');
  //   });
  // });
  
    
  });  




