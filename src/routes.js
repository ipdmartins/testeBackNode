const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');
const ProfileController = require('./controllers/ProfileController');
const bcrypt = require('bcryptjs');

const routes = express.Router();

routes.post('/profile', celebrate({//valida primeiro e depois faz inserção
    [Segments.BODY]: Joi.object().keys({
        gituser: Joi.string().required(),
        avatar: Joi.string(),
        date: Joi.date(),
        publish: Joi.string().required()
    })
}), ProfileController.create);

routes.get('/profile', ProfileController.index);

module.exports = routes;