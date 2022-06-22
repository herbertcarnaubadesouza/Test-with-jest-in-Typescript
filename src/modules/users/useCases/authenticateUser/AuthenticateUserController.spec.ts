
import request from "supertest";
import {app} from "../../../../app";
import { Connection } from "typeorm";
import { hash } from "bcryptjs";
import { v4 as uuidv4 } from "uuid";

import createConnection from "../../../../shared/infra/typeorm"

let connection: Connection;

describe("Authenticate User Controller", () => {


    beforeAll(async () => {
        connection = await createConnection();

        await connection.runMigrations();

        const id = uuidv4();

        const password = await hash("admin", 8);

        await connection.query(
            `INSERT INTO USERS(id,name,email,password, created_at, updated_at)
                values('${id}', 'isAdmin', 'user@rentx.com.br', '${password}', 'now()', 'now()')
            `
        );

    });


    afterAll(async () => {
        await connection.dropDatabase();
        await connection.close();
    })


   
    it("should be able to athenticate user", async () => {


        const responseToken = await request(app).post("/sessions")
        .send({
            email: "user@rentx.com.br",
            password: "admin",
        });
        
        expect(responseToken.status).toBe(200);
    });



    it("should not be able to authenticate user, if the user not exists", async () => {
        
        const responseToken = await request(app).post("/sessions")
        .send({
            email: "notexist@test.com",
            password: "admin",
        });
        
        expect(responseToken.status).toBe(401);        

    });
})

