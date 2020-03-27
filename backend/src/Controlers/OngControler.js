const conection = require('../Database/conection');
const GenerateUniqueId = require('../utils/GenerateUniqueId');

module.exports = {

    async index (request, response) {
        const ongs = await conection('ongs').select('*');
    
        return response.json(ongs);
    },

    async create(request, response) {
        const {name, email, whatsapp, city, uf} = request.body;
        const id = GenerateUniqueId();

    await conection('ongs').insert({
        id,
        name,
        email,
        whatsapp,
        city,
        uf,
    });

    return response.json({ id });
    }
};