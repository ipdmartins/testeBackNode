
const crypto = require('crypto');
const axios = require('axios');
const connection = require('../database/connection');

module.exports = {

    async index(request, response) {
        const profile = await connection('profile').select('*');

        return response.json(profile);
    },
    //, avatar, date, publish
    async create(request, response) {
        const { gituser, publish } = request.body;

        const info = await axios.get(`https://api.github.com/users/${gituser}`);

        //o await vai esperar a conclusão da inserção para só depois dar sequencia
        const { name: name, avatar_url: avatar } = info.data;

        let date_ob = new Date();

        let day = ("0" + date_ob.getDate()).slice(-2);

        // current month
        let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

        // current year
        let year = date_ob.getFullYear();
        const date = day + "/" + month + "/" + year;

        //cria um id hexadecimal com um metódo disponível em crypto.
        const id = crypto.randomBytes(4).toString('HEX');

        await connection('profile').insert({
            id, name, avatar, date, publish
        })

        return response.json({ id, name, avatar, date, publish });
    }

}; 