const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];

import jwt from "jsonwebtoken";
import models from "../models";
import Sequelize from "sequelize";
import { deviceDataSet, yearUsageSet } from "../data";

//Require the dev-dependencies
import chai from "chai";
import chaiHttp from "chai-http";
import server from "../server";
let should = chai.should();

chai.use(chaiHttp);

describe("User Authentication API Test!", () => {
  before("DB Flush and DB Initializing", done => {
    let sequelize = new Sequelize("", config.username, config.password, {
      dialect: "mysql"
    });
    sequelize
      .query(`CREATE DATABASE IF NOT EXISTS ${config.database};`)
      .then(data => console.log("create database  : ", data))
      .then(() => {
        models.sequelize
          .drop()
          .then(() => models.sequelize.sync())
          .then(() =>
            models.Device.bulkCreate(deviceDataSet, {
              individualHooks: true
            })
          )
          .then(() =>
            models.YearUsage.bulkCreate(yearUsageSet, {
              individualHooks: true
            })
          )
          .then(() => {
            console.log("table initializing finished!");
            done();
          })
          .catch(error => {
            console.log("table initializing failed", error);
          });
      })
      .catch(error => console.log("create database error  :", error));
  });
  /*
   * Test signup api
   ```
   expected res [
        {
            "user": {
                "id": "dugong"
            },
            "message": "user create successfully."
        }
        {
            "auth": true,
            "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImR1Z29uZyIsImlhdCI6MTU2OTc2MDg0MiwiZXhwIjoxNTY5NzYwOTAyfQ.Wwop54A2rvUP0kDQV1oiylSJfVgvgCm53ypBnTBUf2A",
            "message": "sign in successfully"
        }
    ]
    ```
   */
  describe("auth api 테스트", () => {
    describe("signup api", () => {
      it("/api/v1/auth/signup", done => {
        const user = {
          id: "dugong",
          password: "password"
        };
        chai
          .request(server)
          .post("/api/v1/auth/signup")
          .send(user)
          .end((err, res) => {
            //   console.log("/api/v1/auth/signup  res: ", res);
            //   console.log("/api/v1/auth/signup  err: ", err);
            res.should.have.status(200);
            res.body.should.be.a("object");
            res.body.user.id.should.be.eql(user.id);
            res.body.should.have.property("message");
            done();
          });
      });
    });
    describe("signin api", () => {
      let token;
      it("/api/v1/auth/signin", done => {
        const user = {
          id: "dugong",
          password: "password"
        };
        chai
          .request(server)
          .post("/api/v1/auth/signin")
          .send(user)
          .end((err, res) => {
            //   console.log("/api/v1/auth/signup  res: ", res);
            //   console.log("/api/v1/auth/signup  err: ", err);
            res.should.have.status(200);
            res.body.should.be.a("object");
            res.body.auth.should.be.true;
            res.body.should.have.property("message");
            res.body.should.have.property("accessToken");
            token = res.body.accessToken;
            jwt.verify(token, config.secret, (err, decoded) => {
              decoded.id.should.be.eql(user.id);
            });
            done();
          });
      });
    });

    describe("refresh token api", () => {
      let token;
      const user = {
        id: "dugong",
        password: "password"
      };
      beforeEach(done => {
        chai
          .request(server)
          .post("/api/v1/auth/signin")
          .send(user)
          .end((err, res) => {
            token = res.body.accessToken;
            done();
          });
      });
      it("/api/v1/auth/refresh", done => {
        chai
          .request(server)
          .get("/api/v1/auth/refresh")
          .set("Authorization", `Bearer ${token}`)
          .end((err, res) => {
            //   console.log("/api/v1/auth/signup  res: ", res);
            //   console.log("/api/v1/auth/signup  err: ", err);
            jwt.verify(token, config.secret, (err, decoded) => {
              decoded.id.should.be.eql(user.id);
            });
            let refreshedToken = res.body.accessToken;
            jwt.verify(refreshedToken, config.secret, (err, decoded) => {
              decoded.id.should.be.eql(user.id);
            });
            res.should.have.status(200);
            res.body.should.be.a("object");
            res.body.auth.should.be.true;
            res.body.should.have.property("message");
            res.body.should.have.property("accessToken");
            done();
          });
      });
    });

    describe("Check Token in Expiration Time", () => {
      let token;
      const user = {
        id: "dugong",
        password: "password"
      };
      beforeEach(done => {
        chai
          .request(server)
          .post("/api/v1/auth/signin")
          .send(user)
          .end((err, res) => {
            token = res.body.accessToken;
          });
        setTimeout(() => {
          done();
        }, 4000);
      });
      it("/api/v1/devices", done => {
        chai
          .request(server)
          .get("/api/v1/devices")
          .set("x-access-token", token)
          .end((err, res) => {
            res.should.have.status(403);
            res.body.should.be.a("object");
            res.body.auth.should.be.false;
            res.body.should.have.property("error");
            done();
          });
      });
    });
  });
});
