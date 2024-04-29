import { DataSource, DataSourceOptions } from "typeorm"
import { config as dotenvConfig } from 'dotenv'

dotenvConfig()

export const dataSourceOptions: DataSourceOptions = {
    type: 'mysql',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT) || 3306,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: ['dist/**/*.entity.{js,ts}'],
    migrations: ['dist/db/migrations/*.js'],
}

const dataSource: DataSource = new DataSource(dataSourceOptions)
export default dataSource