import data from "../example/data.json";

export default class RoomService {

    static getRooms() {
        return data.rooms;
    }

    static getRoomById(roomId) {
        return data.rooms.find(room => room.id === roomId);
    }

}
