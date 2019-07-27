import store from 'store';

const NAME_SPACE = 'vn.sellpro.';

export default {
    get: (key) => {
        const realKey = NAME_SPACE + key;

        return store.get(realKey);
    },
    set: (key, data) => {
        const realKey = NAME_SPACE + key;

        return store.set(realKey, data);
    },
    clear: (key) => {
        const realKey = NAME_SPACE + key;

        return store.remove(realKey);
    },
    clearAll: () => {
        store.clearAll();
    }
};
