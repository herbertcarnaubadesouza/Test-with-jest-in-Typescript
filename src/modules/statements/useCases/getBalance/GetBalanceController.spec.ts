
import request from "supertest";
import {app} from "../../../../app";
import { Connection } from "typeorm";
import { hash } from "bcryptjs";
import { v4 as uuidv4 } from "uuid";

import createConnection from "../../../../shared/infra/typeorm"
import { OperationType } from "@modules/statements/entities/Statement";

let connection: Connection;

describe("Get Balance Controller", () => {


    beforeAll(async () => {
        connection = await createConnection();
        await connection.runMigrations();
    });

    afterAll(async () => {
        await connection.dropDatabase();
        await connection.close();
    })


    it("should be able to get balance", async () => {

        const user = await request(app).post("/users")
        .send({
            name: "user",
            email: "userBalance@rentx.com.br",
            password: "admin",
        });

        const responseToken = await request(app).post("/sessions")
        .send({
            email: "userBalance@rentx.com.br",
            password: "admin",
        });

        const {token} = responseToken.body        

        const statementResponse = await request(app).get("/statements/balance")
        .send({
            user_id: user.body.id,
        })
        .set({
            Authorization: `Bearer ${token}`,
        });
        
        expect(statementResponse.status).toBe(200);
    });



    it("should not be able to get balance, if the user not exists", async () => {

        const responseToken = await request(app).post("/sessions")
        .send({
            email: "userBalanceError@rentx.com.br",
            password: "admin",
        });

        const {token} = responseToken.body        

        const statementResponse = await request(app).get("/statements/balance")
        .send({
            user_id: "test",
        })
        .set({
            Authorization: `Bearer ${token}`,
        });
        
        expect(statementResponse.status).toBe(401);
    });

})

