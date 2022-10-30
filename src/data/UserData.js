const { user } = require("../model/User");

class UserData {
  users = [
    {
      id:1,
      userName: "ppovis",
      email: "ppovis@uoc.edu",
      password: "password",
      avatar: "AVATAR_1",
    },
    {
      id:2,
      userName: "cory",
      email: "cbanciu@uoc.edu",
      password: "password",
      avatar: "AVATAR_2",
    },
    {
      id:3,
      userName: "maider",
      email: "maider@uoc.edu",
      password: "password",
      avatar: "AVATAR_3",
    },
    {
      id:4,
      userName: "esther",
      email: "esther@uoc.edu",
      password: "password",
      avatar: "AVATAR_4",
    },
  ];
}
const userData = new UserData();
module.exports = { userData };
