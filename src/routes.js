const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');
const ProfileController = require('./controllers/ProfileController');
const bcrypt = require('bcryptjs');

const routes = express.Router();

routes.post('/profile', celebrate({//valida primeiro e depois faz inserção
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        avatar: Joi.string().required(),
        date: Joi.date(),
        publish: Joi.string().required()
    })
}), ProfileController.create);

routes.get('/profile', ProfileController.index);

routes.delete('/profile/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.string().required(),
    })
}), ProfileController.delete);

routes.put('/profile/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.string().required(),
    }),
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string(),
        avatar: Joi.string(),
        publish: Joi.string()
    })
}), ProfileController.update);

module.exports = routes;