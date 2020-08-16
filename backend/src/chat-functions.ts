interface UserParams {
    id: string;
    name: string;
    room: string;
}
const users: UserParams[] = [];

/** Needs the mentioned properties to work with chat functions */
export const addUser = (params: UserParams) => {
    let { id, name, room } = params;
    name = name.trim().toLowerCase();
    room = name.trim().toLowerCase();
    // if the user already exists in the room
    const existinguser = users.find(user => user.room === room && user.name === name);
    if (existinguser) {
        return { error: 'Username is taken' }
    }
    const user = { id, name, room };
    users.push(user);
    return { user: user };
}

export const removeUser = (id: string) => {
    const index = users.findIndex(user => user.id === id);
    if (index !== -1) {
        // returns deleted user
        return users.splice(index, 1)[0]
    }
}

export const getUser = (id: string) => {
    return users.find(user => user.id === id);
}

export const getUsersInRoom = (room: string) => {
    users.filter(user => user.room === room)
}
