import { useContext } from 'react';
import { input } from '../hooks/input';
import Link from 'next/link';
import { DataContext } from '../context/DataProvider';
import { types } from '../reducers/types';

const Join = () => {
    const [name, setName] = input('');
    const [room, setRoom] = input('');

    const submit = () => {
        console.log('FORM');
        const [state, dispatch] = useContext(DataContext);
        dispatch({
            type: types.SET_NAME,
            name
        });
        dispatch({
            type: types.SET_ROOM,
            room
        })
    }
    return (
        <div>
            <h1>Join</h1>

            <input onChange={(e) => setName(e)} placeholder="name" />
            <input onChange={(e) => setRoom(e)} placeholder="room" />
            <Link href="/chat">
                <button type="submit" onClick={() => submit()}>Submit</button>
            </Link>

        </div>
    )
}

export default Join;