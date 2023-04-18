import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import * as config from 'config';

const dbConfig = config.get('db');
export const typeORMConfig : TypeOrmModuleOptions = {
    
    type: 'mysql',
    host: 'nodedb.cfuchxnx93nv.us-east-1.rds.amazonaws.com',
    port: 3306,
    username: 'admin',
    password: 'Gksthfdl2',
    database: 'nodeDB',
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    synchronize: true
}