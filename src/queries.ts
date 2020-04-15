import { pool, geoserverHeaders, geoserverWfsUrl } from './config/config';
import crypto from 'crypto-js'
import {
  borderQuery,
  absoluteCasesQuery,
  minMaxCasesQuery,
  districtNamesQuery,
  chartQuery,
  qMaxAffected,
  qMinAffected,
  qUserInfo,
} from './config/sql';
import fetch from 'node-fetch';

export const getBoundaries = (request: any, response: any) => {
  pool.query(borderQuery, (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows[0])
  })
};

export const getCorona = (request: any, response: any) => {
  pool.query(absoluteCasesQuery, (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows[0])
  })
};

export const getRange = (request: any, response: any) => {
  pool.query(minMaxCasesQuery, (error, results) => {
    if (error) {
      throw error
    }
    const classes: number = 6;
    const legendClassBorders: number[] = [0];
    const resultArray = results.rows;
    for (let i = 0; i < classes; i++) {
      resultArray.forEach((item) => legendClassBorders.push(((item.max - item.min) / classes) + legendClassBorders[i]))
    }
    response.status(200).send(legendClassBorders.map((value) => parseInt(value.toFixed(1))))
  })
};

export const getDistricts = (request: any, response: any) => {
  pool.query(districtNamesQuery, (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(results.rows);
  })
};

export const getDistrictInfo = (request: any, response: any) => {
  const stt_name = request.query.stt_name;
  const districtInfoQuery = `SELECT count(id) as anzahl, 
  sum(visited::int) as besucht, 
  count(id)-sum(visited::int) as unbesucht,
  sum(visited::int)*100/count(id) as besuchtP,
  100-(sum(visited::int)*100/count(id)) as unbesuchtP
  FROM nabu.hu_koeln WHERE stt_name = $1`;
  pool.query(districtInfoQuery, [stt_name], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(results.rows);
  })
};

export const getChart = (request: any, response: any) => {
  pool.query(chartQuery, (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(results.rows);
  })
};

export const getChartDistrict = (request: any, response: any) => {
  const stt_name = request.query.stt_name;
  pool.query(`SELECT sum(visited::int)*100/count(id) as besucht,
  100-(sum(visited::int)*100/count(id)) as unbesucht
  FROM nabu.hu_koeln WHERE stt_name = $1`, [stt_name], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(results.rows);
  })
};

export const getUserHash = (request: any, response: any) => {
  const token = ((crypto.lib.WordArray as any).random(64) as CryptoJS.WordArray).toString();
  response.status(200).send(JSON.stringify(token))
}

export const getMaxAffectedDistrict = (request: any, response: any) => {
  pool.query(qMaxAffected, (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(results.rows)
  })
}

export const getMinAffectedDistrict = (request: any, response: any) => {
  pool.query(qMinAffected, (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(results.rows)
  })
}

export const updateGeoserver = (request: any, response: any) => {
  const xml = request.body.xml;
  fetch(geoserverWfsUrl, {
    method: 'POST',
    headers: geoserverHeaders,
    body: xml,
  })
    .then(data => response.status(200).send(data))
    .catch(err => console.log(err))
}

export const getUserInfos = (request: any, response: any) => {
  pool.query(qUserInfo, (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(results.rows)
  })
}


