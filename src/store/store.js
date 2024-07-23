// store.js
import { createStore } from 'vuex';
import { v4 as uuidv4 } from 'uuid';

const store = createStore({
    state() {
        return {
            count: 53,
            form: JSON.parse(localStorage.getItem('localdata')) || [],
            storedBacklogData: "",
            taskInColumn: JSON.parse(localStorage.getItem('Task counts')) ||{
                backlog: 0,
                open: 0,
                new: 0,
                inProgress: 0,
                feedBackNeeded: 0,
                readyForTesting: 0,
                qaInProgress: 0,
            }
        };
    },
    mutations: {
        setInitialFormData(state, payload) {
            state.form = payload;
            this.commit('taskCount');
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
            localStorage.setItem("localdata", JSON.stringify(state.form));
            this.commit('taskCount');
        },
        updateData(state, updatedItem) {
            const index = state.form.findIndex(item => item.id === updatedItem.id);
            if (index !== -1) {
                state.form.splice(index, 1, updatedItem);
                localStorage.setItem("localdata", JSON.stringify(state.form));
                this.commit('taskCount');
            }
        },
        updateItemColumn(state, { id, columnId, status }) {
            const item = state.form.find(item => item.id === id);
            if (item) {
                item.columnId = columnId;
                item.status = status;
                localStorage.setItem("localdata", JSON.stringify(state.form));
                this.commit('taskCount');
            }
        },
        editData(state, payload) {
            const gid = state.form.find(fid => fid.id == payload.id);
            if (gid) {
                Object.assign(gid, payload);
                localStorage.setItem("localdata", JSON.stringify(state.form));
                this.commit('taskCount');
            }
        },
        setFormData(state, payload) {
            const mergeData = [...payload, ...state.form];

            function filterUniqueTasks(tasks) {
                const seen = new Set();
                return tasks.filter(task => {
                    const isDuplicate = seen.has(task.id);
                    seen.add(task.id);
                    return !isDuplicate;
                });
            }

            const uniqueTasks = filterUniqueTasks(mergeData);
            state.form = uniqueTasks;
            localStorage.setItem("localdata", JSON.stringify(state.form));
            this.commit('taskCount');
        },
        taskCount(state) {
            state.taskInColumn = {
                backlog: 0,
                open: 0,
                new: 0,
                inProgress: 0,
                feedBackNeeded: 0,
                readyForTesting: 0,
                qaInProgress: 0,
            };
            state.form.forEach(item => {
                switch (item.columnId) {
                    case 1:
                        state.taskInColumn.backlog += 1;
                        break;
                    case 2:
                        state.taskInColumn.open += 1;
                        break;
                    case 3:
                        state.taskInColumn.new += 1;
                        break;
                    case 4:
                        state.taskInColumn.inProgress += 1;
                        break;
                    case 5:
                        state.taskInColumn.feedBackNeeded += 1;
                        break;
                    case 6:
                        state.taskInColumn.readyForTesting += 1;
                        break;
                    case 7:
                        state.taskInColumn.qaInProgress += 1;
                        break;
                    default:
                        console.log('Unknown columnId:', item.columnId);
                }
            });
            console.log('Task counts:', state.taskInColumn);
            localStorage.setItem("Task counts", JSON.stringify(state.taskInColumn));
        }
    },
});

export default store;
