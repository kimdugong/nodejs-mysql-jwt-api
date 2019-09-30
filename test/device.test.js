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

describe("Devices API Test!", () => {
  /*
   * Test Devices api
   */
  describe("devices api 테스트", () => {
    let token;
    let devices;
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

    describe("인터넷뱅킹 서비스 접속 기기 목록을 출력하는 API", () => {
      it("/api/v1/devices", done => {
        chai
          .request(server)
          .get("/api/v1/devices")
          .set("x-access-token", token)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.devices.should.be.a("array");
            devices = res.body.devices;
            done();
          });
      });
    });

    describe("각 년도별로 인터넷뱅킹을 가장 많이 이용하는 접속기기를 출력하는 API", () => {
      it("/api/v1/devices/year", done => {
        chai
          .request(server)
          .get("/api/v1/devices/year")
          .set("x-access-token", token)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.devices.should.be.a("array");
            devices = res.body.devices;
            done();
          });
      });
    });

    describe("특정 년도를 입력받아 그 해에 인터넷뱅킹에 가장 많이 접속하는 기기 이름을 출력하는 API", () => {
      it("/api/v1/devices/:year", done => {
        const year = "2013";
        chai
          .request(server)
          .get(`/api/v1/devices/${year}`)
          .set("x-access-token", token)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.devices.should.be.a("object");
            res.body.devices.year.should.to.be.eql(Number(year));
            res.body.devices.should.have.property("rate");
            res.body.devices.should.have.property("device_name");
            done();
          });
      });
    });

    describe("디바이스 아이디를 입력받아 인터넷뱅킹에 접속 비율이 가장 많은 해를 출력하는 API", () => {
      it("/api/v1/devices/year/:device_id", done => {
        const device = devices.find(device => device.device_name == "스마트폰");
        chai
          .request(server)
          .get(`/api/v1/devices/year/${device.device_id}`)
          .set("x-access-token", token)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.devices.should.be.a("object");
            res.body.devices.device_name.should.to.be.eql(device.device_name);
            res.body.devices.should.have.property("rate");
            res.body.devices.should.have.property("year");
            done();
          });
      });
    });
  });
});
