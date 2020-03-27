const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/Database/conection');

describe('ONG', () => {
    beforeEach(async () => {
        await connection.migrate.rollback();
        await connection.migrate.latest();
    });

    afterAll(async () => {
        await connection.destroy();
    })
    it('Teste para criar nova ONG', async () => {
        const response = await request(app)
        .post('/ongs')
        .send({
            name : "APAD",
            email : "contato@gmail.com",
            whatsapp: "1149380293",
            city:"São Paulo",
            uf:"SP"
        });
        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toHaveLength(8);
    })
})