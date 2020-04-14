import { IPgConnectionParams, } from '../types/types'
import { Pool } from 'pg';
import dotenv from 'dotenv';

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