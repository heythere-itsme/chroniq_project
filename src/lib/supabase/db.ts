import {drizzle} from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as dotenv from 'dotenv';
import * as schema from '../../../drizzle/schema';

dotenv.config({path: './.env'});

const client = postgres(process.env.DATABASE_URL || '', {
    max: 1,
})

const db = drizzle(client, {
    schema: schema,});
export default db;