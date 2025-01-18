'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "User", deps: []
 * createTable "Otp", deps: []
 * createTable "Image", deps: []
 *
 **/

var info = {
    "revision": 1,
    "name": "first",
    "created": "2025-01-18T14:24:26.928Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "createTable",
        params: [
            "User",
            {
                "id": {
                    "type": Sequelize.UUID,
                    "field": "id",
                    "primaryKey": true,
                    "defaultValue": Sequelize.UUIDV4
                },
                "name": {
                    "type": Sequelize.STRING,
                    "field": "name"
                },
                "email": {
                    "type": Sequelize.STRING,
                    "field": "email"
                },
                "password": {
                    "type": Sequelize.STRING,
                    "field": "password"
                },
                "token": {
                    "type": Sequelize.STRING,
                    "field": "token"
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "field": "createdAt",
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "field": "updatedAt",
                    "allowNull": false
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "Otp",
            {
                "id": {
                    "type": Sequelize.UUID,
                    "field": "id",
                    "primaryKey": true,
                    "defaultValue": Sequelize.UUIDV4
                },
                "code": {
                    "type": Sequelize.STRING,
                    "field": "code"
                },
                "user_id": {
                    "type": Sequelize.STRING,
                    "field": "user_id"
                },
                "token": {
                    "type": Sequelize.STRING,
                    "field": "token"
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "field": "createdAt",
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "field": "updatedAt",
                    "allowNull": false
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "Image",
            {
                "id": {
                    "type": Sequelize.UUID,
                    "field": "id",
                    "primaryKey": true,
                    "defaultValue": Sequelize.UUIDV4
                },
                "name": {
                    "type": Sequelize.STRING,
                    "field": "name"
                },
                "urls": {
                    "type": Sequelize.JSON,
                    "field": "urls",
                    "defaultValue": Sequelize.Array
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "field": "createdAt",
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "field": "updatedAt",
                    "allowNull": false
                }
            },
            {}
        ]
    }
];

module.exports = {
    pos: 0,
    up: function(queryInterface, Sequelize)
    {
        var index = this.pos;
        return new Promise(function(resolve, reject) {
            function next() {
                if (index < migrationCommands.length)
                {
                    let command = migrationCommands[index];
                    console.log("[#"+index+"] execute: " + command.fn);
                    index++;
                    queryInterface[command.fn].apply(queryInterface, command.params).then(next, reject);
                }
                else
                    resolve();
            }
            next();
        });
    },
    info: info
};
