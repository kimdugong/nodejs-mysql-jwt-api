// localhost:3000/api/v1/devices
const getDevicesResult = {
  devices: [
    {
      year: 2014,
      device_id: "a5c7c6f2-5378-4d2f-8f82-77ae5b33449c",
      rate: 64.2,
      device_name: "스마트폰"
    },
    {
      year: 2015,
      device_id: "a5c7c6f2-5378-4d2f-8f82-77ae5b33449c",
      rate: 73.2,
      device_name: "스마트폰"
    },
    {
      year: 2016,
      device_id: "a5c7c6f2-5378-4d2f-8f82-77ae5b33449c",
      rate: 85.1,
      device_name: "스마트폰"
    },
    {
      year: 2017,
      device_id: "a5c7c6f2-5378-4d2f-8f82-77ae5b33449c",
      rate: 90.6,
      device_name: "스마트폰"
    },
    {
      year: 2018,
      device_id: "a5c7c6f2-5378-4d2f-8f82-77ae5b33449c",
      rate: 90.5,
      device_name: "스마트폰"
    },
    {
      year: 2011,
      device_id: "eab65ad3-47e0-4bd1-8455-265090b51860",
      rate: 95.1,
      device_name: "데스크탑 컴퓨터"
    },
    {
      year: 2012,
      device_id: "eab65ad3-47e0-4bd1-8455-265090b51860",
      rate: 93.9,
      device_name: "데스크탑 컴퓨터"
    },
    {
      year: 2013,
      device_id: "eab65ad3-47e0-4bd1-8455-265090b51860",
      rate: 67.1,
      device_name: "데스크탑 컴퓨터"
    }
  ]
};

// localhost:3000/api/v1/getHighestUsageDevicePerYear
const getHighestUsageDevicePerYearResult = {
  devices: [
    {
      device_id: "3878bfb7-da03-40d2-81ae-7d175455f9ad",
      device_name: "스마트패드"
    },
    {
      device_id: "5c1333b0-d327-46ee-8013-51cae9ccf7a4",
      device_name: "기타"
    },
    {
      device_id: "a5c7c6f2-5378-4d2f-8f82-77ae5b33449c",
      device_name: "스마트폰"
    },
    {
      device_id: "c65ca42e-c855-44c6-aa52-a34b5b84cd5d",
      device_name: "노트북 컴퓨터"
    },
    {
      device_id: "eab65ad3-47e0-4bd1-8455-265090b51860",
      device_name: "데스크탑 컴퓨터"
    }
  ]
};

// 2017
// localhost:3000/api/v1/getHighestUsageDeviceByYear/2017
const getHighestUsageDeviceByYear = {
  devices: {
    year: 2017,
    rate: 90.6,
    device_name: "스마트폰"
  }
};

// eab65ad3-47e0-4bd1-8455-265090b51860
// localhost:3000/api/v1/getHighestUsageYearByDeviceId/eab65ad3-47e0-4bd1-8455-265090b51860
const getHighestUsageYearByDeviceId = {
  devices: [
    {
      year: 2011,
      rate: 95.1,
      device_name: "데스크탑 컴퓨터"
    }
  ]
};
