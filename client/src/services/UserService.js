import data from "../example/data.json";

export default class UserService {

    static getStudents() {
        return data.users
            .filter(user => user.roleId === 'r3')
            .map(user => ({
                id: user.id,
                name: user.fullName,
                email: user.email
            }));
    }
}
