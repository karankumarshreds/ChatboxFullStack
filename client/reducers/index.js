import { types } from './types';

export const initialState = {
    name: '',
    room: ''
}

const reducer = (state, action) => {
    console.log("Calling action", action);
    switch (action.type) {
        case types.SET_NAME:
            return { ...state, name: action.name }
        case types.SET_ROOM:
            return { ...state, name: action.room }
        default:
            return state;
    }
}

