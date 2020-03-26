const conection = require('../Database/conection')

module.exports = {
    async Session(request, response) {
        const {id} = request.body;

        const ong = await conection('ongs')
        .where('id', id)
        .select('name')
        .first();

        if (!ong) {
            return response.status(400).json({error: 'no ONG found with this ID'});
        }

        return response.json(ong);
    }
};