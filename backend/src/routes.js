const express = require('express');
const OngController = require('./Controlers/OngControler');
const incidentControler = require('./Controlers/IncidentControler');
const ProfileControler = require('./Controlers/ProfileControler');
const SessionControler = require('./Controlers/SessionControler');
const validate = require('./validations/validator');

const routes = express.Router();

routes.post('/sessions', validate.validationLogon,SessionControler.Session);
routes.get('/ongs', OngController.index);
routes.post('/ongs', validate.CreateOngs, OngController.create);
routes.post('/incidents', validate.createIncident,incidentControler.create);
routes.get('/profile', validate.getProfile, ProfileControler.index);
routes.get('/incidents', validate.ListIncident, incidentControler.index);
routes.delete('/incidents/:id', validate.DeleteIncident, incidentControler.delete);

module.exports = routes;