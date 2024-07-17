import { createStore } from 'vuex';
import { v4 as uuidv4 } from 'uuid';

const store = createStore({
    state() {
        return {
            count: 53,
            form: JSON.parse(localStorage.getItem('localdata')) ||  [
                {

                },
            ],
            storedBacklogData: ""
        };
    },
    mutations: {
        setInitialFormData(state, payload) {
            state.form = payload;
        },
        increment(state) {
            state.count++;
        },
        adddata(state, payload) {
            const newItem = {
                id: uuidv4(),
                ...payload,
                columnId: 1, // Initialize new items with column ID 1 (Backlog)
            };
            state.form.unshift(newItem);
            const localdata = JSON.stringify(state.form);
            localStorage.setItem("localdata", localdata);
        },
        updateData(state, updatedItem) {
            const index = state.form.findIndex(item => item.id === updatedItem.id);
            if (index !== -1) {
                state.form.splice(index, 1, updatedItem);
            }
        },
        updateItemColumn(state, { id, columnId }) {
            const item = state.form.find(item => item.id === id);
            if (item) {
                item.columnId = columnId;
            }
        },
        editData(state, payload) {
            const gid = state.form.find(fid => fid.id == payload.id);
            if (gid) {
                Object.assign(gid, payload);
            }
        },
        setFormData(state,payload)
        {
            console.log(payload)
            state.form = payload
            const localdata = JSON.stringify(state.form);
            localStorage.setItem("localdata", localdata);

        }
    },
});

export default store;