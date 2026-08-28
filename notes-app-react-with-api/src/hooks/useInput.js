import { useState } from 'react';

function useInput(defaultValue = '') {
    if (typeof defaultValue !== 'string') {
        throw new TypeError('defaultValue harus berupa string');
    }

    const [value, setValue] = useState(defaultValue);

    const onValueChangeHandler = (event) => {
        setValue(event.target.value);
    };

    return [value, onValueChangeHandler, setValue];
}

export default useInput;