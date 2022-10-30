class RoomData {
  rooms = [
    {
      id: 1,
      name: "room 1",
      description: "room some ...",
      players: [
        { id: 1, userName: "diana" },
        { id: 2, userName: "cory" },
      ],
    },
    {
      id: 2,
      name: "room 2",
      description: "room some ...",
      players: [
        {id: 3, userName: "maider"},
        {id: 4, userName: "esther"},
    
      ],
    
    },
    {
      id: 3,
      name: "room 3",
      description: "room some ...",
      players: [
        {id: 1, userName: "diana"}
      ],
    },
    {
      id: 4,
      name: "room 4",
      description: "room some ...",
      players: [],
    },
  ];
}
const roomData = new RoomData();
module.exports = { roomData };
