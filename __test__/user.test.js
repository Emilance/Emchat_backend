const request  = require("supertest")
const app =require("../index")
const mongoose  = require("mongoose")
const { User } = require("../model/user")



describe("POST /api/signup", ()=>{
    jest.setTimeout(100000);

    beforeEach( async() => {
      await  User.deleteMany({password: 'testpass'})
    });

    test("return 400 if any input is missing", async()=>{
        const resp = await request(app).post("/api/signup").send({
            firstName : "John",
            lastName : "Doe",
        })
        expect(resp.statusCode).toBe(400)
        expect(resp.text).toEqual("Kindly fill all required input");


    })
    test("return 409 if user with email already exist", async()=>{  
       await User.create({
            firstName: 'John',
            lastName: 'Doe',
            email: 'ja@example.com',
            password: 'testpass',
        })
          const res = await request(app)
            .post('/api/signup')
            .send({
             firstName: 'John',
              lastName: 'Doe',
              email: 'ja@example.com',
              password: 'testpass',
            })
          expect(res.status).toBe(409)
          expect(res.text).toEqual("User with this email already exist");

        }) 
        test('creates a user and returns a token', async () => {
            const response = await request(app)
              .post('/api/signup')
              .send({
                firstName: 'John',
                lastName: 'Doe',
                email: 'janee@example.com',
                password: 'testpass',
              });
            expect(response.statusCode).toBe(200);
            // expect(response).toHaveProperty('user');
            // expect(response.body).toHaveProperty('token');
            // expect(response.body).toHaveProperty('message', 'User created successfully');
          });
        
    

        
})