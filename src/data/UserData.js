const { user } = require("../model/User");

class UserData {
  users = [
    {
      id:1,
      userName: "ppovis",
      email: "ppovis@uoc.edu",
      password: "password",
      avatar: {
          id: '1',
          name: 'Furious',
          message: 'Meaww!!'
      },
    },
    {
      id:2,
      userName: "cory",
      email: "cbanciu@uoc.edu",
      password: "password",
      avatar: {
          id: '2',
          name: 'Sweety',
          message: 'Yummy!!'
      }
    },
    {
      id:3,
      userName: "maider",
      email: "maider@uoc.edu",
      password: "password",
      avatar: {
          id: '3',
          name: 'Blue',
          message: 'Grrrrr!!'
      }
    },
    {
      id:4,
      userName: "esther",
      email: "esther@uoc.edu",
      password: "password",
      avatar: {
          id: '4',
          name: 'Draco',
          message: 'We are gonna have fun!!'
      }
    },
  ];
}
const userData = new UserData();
module.exports = { userData };
