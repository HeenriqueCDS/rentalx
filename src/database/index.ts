import { DataSource} from "typeorm"

export const dataSource = new DataSource({
    type: 'postgres',
    host: "localhost",
    port: 5432,
    username: "docker", //postgres
    password: "ignite", //1234
    database: "rentalx",
    entities: [/*...*/],
    migrations: ["CreateCategories"],
    migrationsTableName: "migrations",
})

dataSource.initialize()