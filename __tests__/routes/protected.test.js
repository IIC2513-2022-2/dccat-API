const supertest = require('supertest');
const app = require('../../src/app');
const request = supertest(app.callback());

beforeAll(async () => {
  await app.context.orm.sequelize.authenticate();
});

afterAll(async () => {
  await app.context.orm.sequelize.close();
});

describe('Protected routes', () => {

  describe('DELETE /delete/:id_match', () => {
    const deleteMatch = async (matchId, cookie, token) => request
      .delete(`/delete/${matchId}`)
      .set('Cookie', cookie)
      .set('Authorization', `bearer ${token}`);
    let response;
    let cookie;
    let token;
    beforeAll(async () => {
      const loginResponse = await request
        .post('/auth/login')
        .send({
          email: 'user1@uc.cl',
          password: '123456',
        }
        );
      cookie = loginResponse.headers['set-cookie'];
      token = loginResponse.body.token;
    });

    describe("Delete the match correctly", () => {
      it('should return a 202 response', async () => {
        const originalCount = await app.context.orm.Match.count()
        response = await deleteMatch(3, cookie, token);
        expect(response.status).toBe(202);
        expect(await app.context.orm.Match.count()).toBe(originalCount - 1);
      });
    });

    describe("Delete the match with an invalid id", () => {
      it('should return a 404 response', async () => {
        response = await deleteMatch(-1, cookie, token);
        expect(response.status).toBe(404);
      });
    });
  });


});