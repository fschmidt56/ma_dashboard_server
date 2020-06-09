"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
const express_xml_bodyparser_1 = __importDefault(require("express-xml-bodyparser"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const queries_1 = require("./queries");
dotenv_1.default.config();
const app = express_1.default();
const port = process.env.PORT;
app.use(express_xml_bodyparser_1.default());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({
    extended: true,
}));
app.use(cors_1.default());
app.use(express_1.default.json({
    type: ['application/json', 'text/plain']
}));
app.use(function (request, response, next) {
    response.setHeader("Access-Control-Allow-Origin", "*");
    response.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS,DELETE");
    response.setHeader("Access-Control-Allow-Headers", "X-Requested-With, Access-Control-Allow-Headers, Content-Type, Authorization, Origin, Accept");
    next();
});
app.use(express_1.default.static(path_1.default.join(__dirname, 'static')));
app.use("/static", express_1.default.static(__dirname + '/static'));
app.get('/', (request, response) => {
    response.sendFile(__dirname + '/index.html');
});
app.listen(port, () => {
    console.log(`Server running on port ${port}.`);
});
//GET
app.get('/boundary', queries_1.getBoundaries);
app.get('/corona', queries_1.getCorona);
app.get('/range', queries_1.getRange);
app.get('/districts', queries_1.getDistricts);
app.get('/districtInfo', queries_1.getDistrictInfo);
app.get('/chart', queries_1.getChart);
app.get('/districtChart', queries_1.getChartDistrict);
app.get('/hash', queries_1.getUserHash);
app.get('/maxAffected', queries_1.getMaxAffectedDistrict);
app.get('/minAffected', queries_1.getMinAffectedDistrict);
app.get('/userInfo', queries_1.getUserInfos);
//POST
app.post('/handleGeoserver', queries_1.updateGeoserver);
