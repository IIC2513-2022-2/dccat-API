const supertest = require('supertest');
const app = require('../../src/app');
const request = supertest(app.callback());

beforeAll(async () => {
  await app.context.orm.sequelize.authenticate();
});

afterAll(async () => {
  await app.context.orm.sequelize.close();
});

describe('Matches routes', () => {

  describe('GET /:id/players/:playerId', () => {
    const getMatch = async (matchId, playerId, cookie) => request
      .get(`/matches/${matchId}/players/${playerId}`)
      .set('Cookie', cookie);

    let response;
    let cookie;
    beforeAll(async () => {
      const loginResponse = await request
        .post('/auth/login')
        .send({
          email: 'user1@uc.cl',
          password: '123456',
        }
        );
      cookie = loginResponse.headers['set-cookie'];
    });

    describe("Get the player's information of the match correctly", () => {

      it('should return a 200 response', async () => {
        response = await getMatch(1, 1, cookie);
        expect(response.status).toBe(200);
      });

      it('should return the data of the match in the format desired', async () => {
        response = await getMatch(1, 1, cookie);
        expect(response.body).toEqual({
          0: expect.any(Array),
          1: expect.any(Array),
          current: expect.any(Number),
          turno: expect.any(Number),
          player1: expect.any(Object),
          player2: expect.any(Object),
        });
      });
    });

    describe('Get the player information of the match with an invalid id', () => {

      it('should return a 404 response if the match does not exists', async () => {
        response = await getMatch(-1, 1, cookie);
        expect(response.status).toBe(404);
      });
      
      it('should return a 403 response if the player is not in the match', async () => {
        response = await getMatch(2, 1, cookie);
        expect(response.status).toBe(403);
      }); 
    });
  });


});