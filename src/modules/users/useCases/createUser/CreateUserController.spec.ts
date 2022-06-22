
import request from "supertest";
import {app} from "../../../../app";
import { Connection } from "typeorm";
import { hash } from "bcryptjs";
import { v4 as uuidv4 } from "uuid";

import createConnection from "../../../../shared/infra/typeorm"

let connection: Connection;

describe("Create User Controller", () => {


    beforeAll(async () => {
        connection = await createConnection();

        await connection.runMigrations();
    });

    afterAll(async () => {
        await connection.dropDatabase();
        await connection.close();
    })

   
    it("should be able to create an user", async () => {

        const response = await request(app).post("/users")
        .send({
            name: "user",
            email: "user@rentx.com.br",
            password: "admin",
        });        
        
        expect(response.status).toBe(201);
    });



    it("should not be able to create an user, if the user already exists", async () => {
        
        await request(app).post("/users")
        .send({
            name: "user",
            email: "userduplicated@rentx.com.br",
            password: "admin",
        });
        
        const response = await request(app).post("/users")
        .send({
            name: "user",
            email: "userduplicated@rentx.com.br",
            password: "admin",
        });        
        
        expect(response.status).toBe(400);        

    });
})

