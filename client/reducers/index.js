import { types } from './types';

export const initialState = {
    name: '',
    room: ''
}

export const reducer = (state, action) => {
    console.log("Calling action", action);
    switch (action.type) {
        case types.SET_NAME:
            return { ...state, name: action.name }
        case types.SET_ROOM:
            return { ...state, room: action.room }
        default:
            return state;
    }
}

