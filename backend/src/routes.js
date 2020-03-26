const express = require('express');
const OngController = require('./Controlers/OngControler');
const incidentControler = require('./Controlers/IncidentControler');
const ProfileControler = require('./Controlers/ProfileControler');
const SessionControler = require('./Controlers/SessionControler');

const routes = express.Router();

routes.post('/sessions', SessionControler.Session);
routes.get('/ongs', OngController.index);
routes.post('/ongs', OngController.create);
routes.post('/incidents', incidentControler.create);
routes.get('/profile', ProfileControler.index);
routes.get('/incidents', incidentControler.index);
routes.delete('/incidents/:id', incidentControler.delete);

module.exports = routes;