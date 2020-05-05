
const crypto = require('crypto');
const connection = require('../database/connection');
var fs = require("fs");

module.exports = {

    async index(request, response) {
        const profile = await connection('profile').select('*');

        return response.json(profile);
    },
    //, avatar, date, publish
    async create(request, response) {
        const { name, avatar, publish } = request.body;

        var imageAvatar = {
            img: fs.readFileSync(avatar),
            file_name: 'Avatar'
        };

        var imagePublish = {
            img: fs.readFileSync(publish),
            file_name: 'Publication'
        };

        var userName = name;

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
            id, userName, imageAvatar, date, imagePublish
        })

        return response.json({ id, name, date });
    },

    async delete(request, response) {
        const { id } = request.params;
        const profile = await connection('profile')
            .where('id', id)
            .select('id');

        if (profile.id === null) {
            return response.status(401).json({ error: 'operation not permitted' })
        }
        await connection('profile').where('id', id).delete();
        return response.status(204).json({ answer: "deleted succesfully" });
    },

    async update(request, response) {
        const { id } = request.params;
        const profile = await connection('profile')
            .where('id', id)
            .select('id');

        if (profile.id === null) {
            return response.status(401).json({ error: 'operation not permitted' })
        }
        const { name, imageAvatar, date, imagePublish } = request.body;

        await connection('profile').where('id', id).update({
            name, imageAvatar, date, imagePublish
        });
        return response.status(204).json({ answer: "updated succesfully" });
    }



}; 