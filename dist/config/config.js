"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const dotenv_1 = __importDefault(require("dotenv"));
const btoa_1 = __importDefault(require("btoa"));
dotenv_1.default.config();
exports.pgConnectionParameters = {
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    //@ts-ignore
    port: parseInt(process.env.PG_PORT)
};
exports.pool = new pg_1.Pool(exports.pgConnectionParameters);
exports.credentials = {
    username: process.env.GEOSERVER_USER,
    password: process.env.GEOSERVER_PASSWORD,
    connectionString: `${process.env.GEOSERVER_USER}:${process.env.GEOSERVER_PASSWORD}`,
};
exports.geoserverWfsUrl = 'http://192.168.2.185:8080/geoserver/pg/wfs?service=WFS&version=1.1.0';
exports.geoserverHeaders = {
    'Content-Type': 'text/plain',
    //@ts-ignore
    'Authorization': 'Basic ' + btoa_1.default(exports.credentials.connectionString)
};
