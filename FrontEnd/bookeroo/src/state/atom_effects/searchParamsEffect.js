import {DefaultValue} from 'recoil';

const searchParamsEffect =
    (key, defaultValue) =>
    ({setSelf, onSet, resetSelf}) => {
        // read from persistence on startup and on persistence change
        const setFromUrl = () => {
            const search = new URLSearchParams(window.location.search);
            const savedValue = search.get(key);
            if (savedValue) {
                setSelf(JSON.parse(savedValue));
            } else {
                resetSelf();
            }
        };
        setFromUrl();
        // persistence updated externall (through browser forward back)
        window.addEventListener('popstate', setFromUrl);
        // write to persistence when app updates state
        onSet((newValue) => {
            const search = new URLSearchParams(window.location.search);
            const totalCurrent = search.toString();
            const current = search.get(key);
            // do nothing if new search param is same as current search param
            if (current === newValue) return;
            if (newValue instanceof DefaultValue || newValue === defaultValue) {
                search.delete(key);
            } else {
                search.set(key, JSON.stringify(newValue));
            }
            // do nothing if everything is empty
            if (!search.toString().length && !totalCurrent.length) return;
            let newurl = new URL(window.location.href);
            newurl.search = search;
            window.history.pushState({path: newurl.toString()}, '', newurl);
        });
    };

export default searchParamsEffect;
