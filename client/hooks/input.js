import { useState } from 'react';

export const input = (state = '') => {
    const [value, setValue] = useState(state);
    const valueHandler = (event) => {
        setValue(event.target.value);
    }
    return [value, valueHandler];
}

