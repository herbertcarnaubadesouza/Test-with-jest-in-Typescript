
import request from "supertest";
import {app} from "../../../../app";
import { Connection } from "typeorm";

import createConnection from "../../../../shared/infra/typeorm"
import { OperationType } from "@modules/statements/entities/Statement";

let connection: Connection;

describe("Get Statement Operation Controller", () => {


    beforeAll(async () => {
        connection = await createConnection();
        await connection.runMigrations();
    });

    afterAll(async () => {
        await connection.dropDatabase();
        await connection.close();
    })


    it("should be able to get statement operation", async () => {

        const user = await request(app).post("/users")
        .send({
            name: "user",
            email: "userStatement@rentx.com.br",
            password: "admin",
        });

        const responseToken = await request(app).post("/sessions")
        .send({
            email: "userStatement@rentx.com.br",
            password: "admin",
        });

        const {token} = responseToken.body  

        // console.log(token)
        
        const statementResponse = await request(app).post("/statements/deposit")
        .send({
            user_id: user.body.id,
            type: OperationType.DEPOSIT,
            amount: 200,
            description: "Deposit"
        })
        .set({
            Authorization: `Bearer ${token}`,
        });


        const statementOperationResponse = await request(app).get(`/statements/${statementResponse.body.id}`)
        .send({
            user_id: user.body.id,
        })
        .set({
            Authorization: `Bearer ${token}`,
        });

        expect(statementOperationResponse.status).toBe(200);
    });



    it("should not be able to get statement operation, if the user not exists", async () => {

        const responseToken = await request(app).post("/sessions")
        .send({
            email: "u@rentx.com.br",
            password: "admin",
        });

        const {token} = responseToken.body  

        // console.log(token)
        
        const statementResponse = await request(app).post("/statements/deposit")
        .send({
            user_id: "user.body.id",
            type: OperationType.DEPOSIT,
            amount: 200,
            description: "Deposit"
        })
        .set({
            Authorization: `Bearer ${token}`,
        });


        const statementOperationResponse = await request(app).get(`/statements/${statementResponse.body.id}`)
        .send({
            // user_id: user.body.id,
        })
        .set({
            Authorization: `Bearer ${token}`,
        });

        expect(statementOperationResponse.status).toBe(401);
    });



    it("should not be able to get statement operation, if the statement not exists", async () => {

        const user = await request(app).post("/users")
        .send({
            name: "user",
            email: "userStatement@rentx.com.br",
            password: "admin",
        });

        const responseToken = await request(app).post("/sessions")
        .send({
            email: "userStatement@rentx.com.br",
            password: "admin",
        });

        const {token} = responseToken.body  

        // console.log(token)
        
        const statementResponse = await request(app).post("/statements/deposit")
        .send({
            user_id: user.body.id,
            type: OperationType.DEPOSIT,
            amount: 200,
            description: "Deposit"
        })
        .set({
            Authorization: `Bearer ${token}`,
        });


        const statementOperationResponse = await request(app).get("/statements")
        .send({
            user_id: user.body.id,
        })
        .set({
            Authorization: `Bearer ${token}`,
        });

        expect(statementOperationResponse.status).toBe(404);
    });

})

