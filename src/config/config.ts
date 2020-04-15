import { IPgConnectionParams, ITransactionsCredentials, } from '../types/types'
import { Pool } from 'pg';
import dotenv from 'dotenv';
import btoa from 'btoa';

dotenv.config()

export const pgConnectionParameters: IPgConnectionParams<string, number> = {
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    //@ts-ignore
    port: parseInt(process.env.PG_PORT)
}

export const pool: Pool = new Pool(pgConnectionParameters);

export const credentials: ITransactionsCredentials<string | undefined> = {
    username: process.env.GEOSERVER_USER,
    password: process.env.GEOSERVER_PASSWORD,
    connectionString: `${process.env.GEOSERVER_USER}:${process.env.GEOSERVER_PASSWORD}`,
  };
  export const geoserverWfsUrl: string = 'http://192.168.2.185:8080/geoserver/pg/wfs?service=WFS&version=1.1.0';
  export const geoserverHeaders = {
    'Content-Type': 'text/plain',
    //@ts-ignore
    'Authorization': 'Basic ' + btoa(credentials.connectionString)
  }