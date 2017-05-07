var models = require('../models');
var express = require('express');
var router = express.Router();

router.post('/', function (req, res) {
    models.User.create({
        username: req.body.username
    }).then(function (result) {
        res.json(result);
    });
});

router.get('/', function (req, res) {
    models.User.findAll()
        .then(function (result) {
            res.json(result);
        });
});

router.get('/:user_id', function (req, res) {
    models.User.findAll({
        where: {
            id: req.params.user_id
        }
    }).then(function (result) {
        if (result.length > 0)
            res.json(result[0]);
        else
            res.status(404).send();
    });
});

router.delete('/:user_id', function (req, res, next) {
    models.User.destroy({
        where: {
            id: req.params.user_id
        }
    }).then(function () {
        res.send(null);
    })
    .catch(function(ex){
        next(ex)
    })
});

router.post('/:user_id/tasks', function (req, res) {
    models.Task.create({
        title: req.body.title,
        UserId: req.params.user_id
    }).then(function (result) {
        res.json(result);
    });
});

router.get('/:user_id/tasks', function (req, res) {
    models.Task.findAll({
        where: {
            UserId: req.params.user_id
        }
    }).then(function (result) {
        res.json(result);
    });
});

router.delete('/:user_id/tasks/:task_id', function (req, res) {
    models.Task.destroy({
        where: {
            id: req.params.task_id,
            UserId: req.params.user_id
        }
    }).then(function () {
        res.send(null);
    });
});

router.get('/:user_id/tasks/:task_id', function (req, res) {
    models.Task.findAll({
        where: {
            id: req.params.task_id,
            UserId: req.params.user_id
        }
    }).then(function (result) {
        if (result.length > 0)
            res.json(result[0]);
        else
            res.status(404).send();
    });
});

module.exports = router;