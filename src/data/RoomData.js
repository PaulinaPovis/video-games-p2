class RoomData {
  rooms = [
    {
      id: 1,
      name: "Room #1",
      description: "room some ...",
      image: 'img1',
      players: [],
    },
    {
      id: 2,
      name: "Room #2",
      description: "room some ...",
      image: 'img2',
      players: [
        {id: 3, userName: "maider"},
        {id: 4, userName: "esther"},
      ],
    
    },
    {
      id: 3,
      name: "Room #3",
      description: "room some ...",
      image: 'img3',
      players: [],
    },
    {
      id: 4,
      name: "Room #4",
      description: "room some ...",
      image: 'img4',
      players: [],
    },
  ];
}
const roomData = new RoomData();
module.exports = { roomData };
