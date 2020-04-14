"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("./config/config");
const sql_1 = require("./config/sql");
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
        response.status(200).send(legendClassBorders.map((value) => value.toFixed(0)));
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
    const districtInfoQuery = `SELECT count(id) as anzahl, 
  sum(visited::int) as besucht, 
  count(id)-sum(visited::int) as unbesucht,
  sum(visited::int)*100/count(id) as besuchtP,
  100-(sum(visited::int)*100/count(id)) as unbesuchtP
  FROM nabu.hu_koeln WHERE stt_name = $1`;
    config_1.pool.query(districtInfoQuery, [stt_name], (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).send(results.rows);
    });
};
