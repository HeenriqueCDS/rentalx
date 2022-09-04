import { getConnection } from "typeorm";
import { v4 as uuid } from "uuid";
import {hash} from "bcrypt"

import createConnection from "../index"

create().then((() => console.log("Admin user created!")));

async function create() {
    const connection = await createConnection()

    const id = uuid()
    const password = await hash("admin", 8);

    await connection.query(
        `INSERT INTO USERS (id, name, email, password, "isAdmin", created_at, driver_license)
            values('${id}', 'Admin', 'admin@rentx.com.br', '${password}', true, now(), 'XXXXX')
        `
    )

    await connection.close()
}