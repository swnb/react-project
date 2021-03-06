const getRoomList = (io) => {
  const getList = io.of('/getRoomList').on('connection', (socket) => {
    socket.emit('room list', global.emptyRoomList);
  });
  const updateRoomList = () => {
    getList.emit('room list', global.emptyRoomList);
  };
  return updateRoomList;
};

module.exports = getRoomList;
