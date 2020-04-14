"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config/config");
const node_fetch_1 = __importDefault(require("node-fetch"));
function postData(url, data) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield node_fetch_1.default(url, {
            method: 'POST',
            headers: config_1.headers,
            body: JSON.stringify(data)
        });
        return yield response.json();
    });
}
exports.postData = postData;
function createGeoJson(data) {
    let geojson = {
        "name": "bars",
        "type": "FeatureCollection",
        "features": []
    };
    for (let i = 0; i < data.length; i++) {
        //@ts-ignore
        geojson.features.push({
            //@ts-ignore
            "type": "Feature",
            "geometry": {
                //@ts-ignore
                "type": "Point",
                //@ts-ignore
                "coordinates": [data[i].long, data[i].lat]
            },
            //@ts-ignore
            "properties": { "gastro": `${data[i].gastro}`, "bier": `${data[i].bier}`, "preis": `${data[i].preis}` }
        });
    }
    return geojson;
}
exports.createGeoJson = createGeoJson;
