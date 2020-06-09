"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("./config/config");
const crypto_js_1 = __importDefault(require("crypto-js"));
const sql_1 = require("./config/sql");
const node_fetch_1 = __importDefault(require("node-fetch"));
exports.getBoundaries = (request, response) => {
    config_1.pool.query(sql_1.borderQuery, (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows[0]);
    });
};
exports.getCorona = (request, response) => {
    config_1.pool.query(sql_1.absoluteCasesQuery, (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows[0]);
    });
};
exports.getRange = (request, response) => {
    config_1.pool.query(sql_1.minMaxCasesQuery, (error, results) => {
        if (error) {
            throw error;
        }
        const classes = 6;
        const legendClassBorders = [0];
        const resultArray = results.rows;
        for (let i = 0; i < classes; i++) {
            resultArray.forEach((item) => legendClassBorders.push(((item.max - item.min) / classes) + legendClassBorders[i]));
        }
        response.status(200).send(legendClassBorders.map((value) => parseInt(value.toFixed(1))));
    });
};
exports.getDistricts = (request, response) => {
    config_1.pool.query(sql_1.districtNamesQuery, (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).send(results.rows);
    });
};
exports.getDistrictInfo = (request, response) => {
    const stt_name = request.query.stt_name;
    const districtInfoQuery = `SELECT 
  count(a.id) as anzahl,
  b.counter as besucht,
  count(a.id)-b.counter as unbesucht,
  round(b.counter::numeric*100/count(a.id),4) as besuchtP,
  100-(round(b.counter::numeric*100/count(a.id),4)) as unbesuchtP
  FROM nabu.koeln b, nabu.hu_koeln a
  WHERE b.stt_name = $1 AND a.stt_name = $1
  GROUP by b.counter;`;
    config_1.pool.query(districtInfoQuery, [stt_name], (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).send(results.rows);
    });
};
exports.getChart = (request, response) => {
    config_1.pool.query(sql_1.chartQuery, (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).send(results.rows);
    });
};
exports.getChartDistrict = (request, response) => {
    const stt_name = request.query.stt_name;
    config_1.pool.query(`SELECT round(b.counter::numeric*100/count(a.id),4) as besucht,
  100-(round(b.counter::numeric*100/count(a.id),4)) as unbesucht
  FROM nabu.koeln b, nabu.hu_koeln a
  WHERE b.stt_name = $1 AND a.stt_name = $1 GROUP BY b.counter`, [stt_name], (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).send(results.rows);
    });
};
exports.getUserHash = (request, response) => {
    const token = crypto_js_1.default.lib.WordArray.random(64).toString();
    response.status(200).send(JSON.stringify(token));
};
exports.getMaxAffectedDistrict = (request, response) => {
    config_1.pool.query(sql_1.qMaxAffected, (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).send(results.rows);
    });
};
exports.getMinAffectedDistrict = (request, response) => {
    config_1.pool.query(sql_1.qMinAffected, (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).send(results.rows);
    });
};
exports.updateGeoserver = (request, response) => {
    const xml = request.body.xml;
    node_fetch_1.default(config_1.geoserverWfsUrl, {
        method: 'POST',
        headers: config_1.geoserverHeaders,
        body: xml,
    })
        .then(data => response.status(200).send(data))
        .catch(err => console.log(err));
};
exports.getUserInfos = (request, response) => {
    config_1.pool.query(sql_1.qUserInfo, (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).send(results.rows);
    });
};
