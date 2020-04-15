import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import xmlParser from 'express-xml-bodyparser';
import cors from 'cors';
import { getBoundaries, getCorona, getRange, getDistricts, getDistrictInfo, getChart, getUserHash, getMaxAffectedDistrict, getMinAffectedDistrict, getChartDistrict, updateGeoserver, getUserInfos } from './queries';

dotenv.config();

const app: Application = express();

const port: string | undefined | number = process.env.PORT;

app.use(xmlParser())
app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)
app.use(cors());
app.use(express.json({
    type: ['application/json', 'text/plain']
  }))

app.use(function (request, response, next) {
    response.setHeader("Access-Control-Allow-Origin", "*");
    response.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS,DELETE");
    response.setHeader("Access-Control-Allow-Headers", "X-Requested-With, Access-Control-Allow-Headers, Content-Type, Authorization, Origin, Accept");
    next();
});

app.get('/', (request: Request, response: Response) => {
    response.sendFile(__dirname + '/index.html')
})

app.listen(port, () => {
    console.log(`Server running on port ${port}.`)
})

//GET
app.get('/boundary', getBoundaries)
app.get('/corona', getCorona)
app.get('/range', getRange)
app.get('/districts', getDistricts)
app.get('/districtInfo', getDistrictInfo)
app.get('/chart', getChart)
app.get('/districtChart', getChartDistrict)
app.get('/hash', getUserHash)
app.get('/maxAffected', getMaxAffectedDistrict)
app.get('/minAffected', getMinAffectedDistrict)
app.get('/userInfo', getUserInfos)
//POST
app.post('/handleGeoserver', updateGeoserver)
