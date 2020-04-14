"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const queries_1 = require("./queries");
dotenv_1.default.config();
const app = express_1.default();
const port = process.env.PORT;
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({
    extended: true,
}));
app.use(cors_1.default());
app.use(function (request, response, next) {
    response.setHeader("Access-Control-Allow-Origin", "*");
    response.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS,DELETE");
    response.setHeader("Access-Control-Allow-Headers", "X-Requested-With, Access-Control-Allow-Headers, Content-Type, Authorization, Origin, Accept");
    next();
});
app.get('/', (request, response) => {
    response.sendFile(__dirname + '/index.html');
});
app.listen(port, () => {
    console.log(`Server running on port ${port}.`);
});
app.get('/boundary', queries_1.getBoundaries);
app.get('/corona', queries_1.getCorona);
app.get('/range', queries_1.getRange);
app.get('/districts', queries_1.getDistricts);
app.get('/districtInfo', queries_1.getDistrictInfo);
