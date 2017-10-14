const socketIo = require('socket.io');
const uuidv4 = require('uuid/v4');
const path = require('path');

const chooseRoom = require(path.join(__dirname, './namespace/chooseroom'));
const playing = require(path.join(__dirname, './namespace/playing'));
const roomList = require(path.join(__dirname, './namespace/roomlist'));
const makeRoom = require(path.join(__dirname, './namespace/makeroom'));

global.emptyRoomList = [
    { module: { size: 12, winCount: 6 }, id: 'who' },
    { module: { size: 13, winCount: 5 }, id: 'who' }
];

global.playingRoomList = [];

//重写他的方法,做为id的双向绑定
global.emptyRoomList.push = function(arg) {
    global.id.push(arg.id);
    Array.prototype.push.call(global.emptyRoomList, arg);
};
global.emptyRoomList.remove = function(arg) {
    const index = global.id.indexOf(arg);
    global.id.splice(index, 1);
    const info = global.emptyRoomList.splice(index, 1);
    return info;
};

global.NAMESPACE = uuidv4();

console.log('room list 生成');

//for test
global.id = global.emptyRoomList.map(e => e.id);

const main = httpServer => {
    const io = socketIo(httpServer);
    const updateRoomList = roomList(io);
    chooseRoom(io, updateRoomList);
    playing(io);
    makeRoom(io, updateRoomList);
};

module.exports = main;