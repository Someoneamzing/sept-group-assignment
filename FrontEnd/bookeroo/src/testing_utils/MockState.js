import React, {useEffect} from 'react';
import {useSetRecoilState} from 'recoil';

export default function MockState({atom, value, children}) {
    const set = useSetRecoilState(atom);
    useEffect(() => {
        set(value);
    }, [set, value]);
    return <>{children}</>;
}
