
import request from "supertest";
import {app} from "../../../../app";
import { Connection } from "typeorm";
import { hash } from "bcryptjs";
import { v4 as uuidv4 } from "uuid";

import createConnection from "../../../../shared/infra/typeorm"
import { Console } from "console";

let connection: Connection;

describe("Show User Profile Controller", () => {

    beforeAll(async () => {
        connection = await createConnection();

        await connection.runMigrations();

    });

    afterAll(async () => {
        await connection.dropDatabase();
        await connection.close();
    })
   
    it("should be able to show user profile", async () => {


        const responseUser = await request(app).post("/users")
        .send({
            name: "user",
            email: "user@rentx.com.br",
            password: "admin",
        }); 

        const responseToken = await request(app).post("/sessions")
        .send({
            email: "user@rentx.com.br",
            password: "admin",
        });

        const {token} = responseToken.body;         

        const response = await request(app)
        .get("/profile")
        .send({            
            user_id: responseUser.body.id,            
        })
        .set({
            Authorization: `Bearer ${token}`,
        });
        
        expect(response.status).toBe(200);
    });



    it("should not be able to show user profile, if the user not exist", async () => {       

        const responseToken = await request(app).post("/sessions")
        .send({
            email: "u1ser@rentx.com.br",
            password: "admin",
        });

        const {token} = responseToken.body;         

        const response = await request(app)
        .get("/profile")
        .set({
            Authorization: `Bearer ${token}`,
        }); 

        expect(response.status).toBe(401);
    });
})

