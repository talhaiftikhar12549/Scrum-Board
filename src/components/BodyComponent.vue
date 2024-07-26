<template>
  <div class="text-center" style="max-width: 100%;">
    <div class="row" style="max-width: 100%; max-height: 100vh; height: 100vh;">
      <div
          v-for="(column, index) in columns"
          :key="index"
          :id="column.id"
          class="col py-2 d-flex flex-column"
          style="width: 100%; height: 100%; border: 1px solid #ddd; overflow-y: auto;"
          @dragover="dragOver($event)"
          @drop="drop($event, column)"
      >
        <!-- Add search input at the top of the Backlog column -->
        <div v-if="column.id === 1" class="mb-2">
          <input
              type="text"
              v-model="searchQuery"
              class="form-control"
              placeholder="Search tasks..."
          />
        </div>
        <ul class="list-unstyled flex-grow-1">
          <li
              v-for="item in filteredColumnData(column.id)"
              :key="item.id"
              style="list-style: none"
              @click="setSelectedItem(item)"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal2"
              draggable="true"
              @dragstart="startDrag($event, item)"
          >
            <div class="border my-2 py-2 px-2" :style="getStyle(item.priority)">
              <div class="d-flex">
                <div class="clearstyle" style="width: 80%">
                  <p class="clearstyle fw-semibold" style="margin: 0px; text-align: left">{{ item.name }}</p>
                  <p class="clearstyle" style="margin: 0px; text-align: left">Priority: {{ item.priority }}</p>
                </div>
                <div class="clearstyle" style="width: 20%; padding-right: 4px; text-align: left">{{
                    item.spenttime
                  }}h
                </div>
              </div>
              <div class="clearstyle" style="border-top: darkgrey solid 1px; text-align: left">{{ item.assignee }}</div>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <!-- Show Modals Start -->
    <div class="modal fade" id="exampleModal2" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">Task Details</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body text-start">
            <p><strong>Name:</strong> {{ selectedItem.name }}</p>
            <p><strong>Description:</strong> {{ selectedItem.description }}</p>
            <p><strong>Assignee:</strong> {{ selectedItem.assignee }}</p>
            <p><strong>Due Date:</strong> {{ selectedItem.duedate }}</p>
            <p><strong>Status:</strong> {{ selectedItem.status }}</p>
            <p><strong>Spent Time:</strong> {{ selectedItem.spenttime }}h</p>
            <p><strong>Priority:</strong> {{ selectedItem.priority }}</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal3">Edit
              Data
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- Show Modal Ends -->

    <!-- Edit Modal Start -->
    <div class="modal fade" id="exampleModal3" tabindex="-1" aria-labelledby="exampleModalLabel2" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel2">Edit Task</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="dataSendToBacklog">
              <div class="mb-3">
                <input type="text" v-model="selectedItem.name" required placeholder="Name" class="form-control">
              </div>
              <div class="mb-3">
                <input type="text" v-model="selectedItem.description" required placeholder="Description"
                       class="form-control">
              </div>
              <div class="mb-3">
                <input type="text" v-model="selectedItem.assignee" required placeholder="Assignee" class="form-control">
              </div>
              <div class="mb-3">
                <input type="date" v-model="selectedItem.duedate" :min="today" required placeholder="Due Date"
                       class="form-control">
              </div>
              <div class="mb-3">
                <input type="hidden" v-model="selectedItem.status" required placeholder="Status" class="form-control">
              </div>
              <div class="mb-3">
                <input type="number" step="0.01" min="0" v-model="selectedItem.spenttime" required
                       placeholder="Spent Time" class="form-control">
              </div>
              <div class="mb-3">
                <div class="text-start">
                  <label class="form-label">Select Task Priority</label>
                  <div class="form-check">
                    <input class="form-check-input" type="radio" name="priority" value="low"
                           v-model="selectedItem.priority" id="priorityLow" required>
                    <label class="form-check-label" for="priorityLow">
                      Low
                    </label>
                  </div>
                  <div class="form-check">
                    <input class="form-check-input" type="radio" name="priority" value="high"
                           v-model="selectedItem.priority" id="priorityHigh">
                    <label class="form-check-label" for="priorityHigh">
                      High
                    </label>
                  </div>
                  <div class="form-check">
                    <input class="form-check-input" type="radio" name="priority" value="urgent"
                           v-model="selectedItem.priority" id="priorityUrgent">
                    <label class="form-check-label" for="priorityUrgent">
                      Urgent
                    </label>
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <button type="submit" class="btn btn-primary"  >Save changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <!-- Edit Modal End -->
  </div>
</template>

<script>
import {mapState, mapMutations} from 'vuex';

export default {
  name: 'BodyComponent',
  data() {
    return {
      searchQuery: "",
      today: new Date().toISOString().split('T')[0],
      selectedItem: {},
      draggedItem: null,
      columns: [
        {id: 1, name: 'Backlog'},
        {id: 2, name: 'Open'},
        {id: 3, name: 'New'},
        {id: 4, name: 'In Progress'},
        {id: 5, name: 'Feedback Needed'},
        {id: 6, name: 'Ready for Testing'},
        {id: 7, name: 'QA in Progress'},
      ],
    };
  },
  computed: {
    ...mapState(['form']),
    filteredBacklogData() {
      return this.form.filter((item) =>
          item.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
    filteredColumnData() {
      return (columnId) => {
        return this.form.filter(item => item.columnId === columnId && (columnId !== 1 || item.name.toLowerCase().includes(this.searchQuery.toLowerCase())));
      };
    },
  },
  methods: {
    startDrag(event, item) {
      this.draggedItem = item;
      event.dataTransfer.effectAllowed = 'move';
    },
    drop(event, column) {
      event.preventDefault();
      if (this.draggedItem) {
        this.updateItemColumn({id: this.draggedItem.id, columnId: column.id, status: column.name});
        this.draggedItem = null;
      }
    },
    dragOver(event) {
      event.preventDefault();
      event.dataTransfer.dropEffect = 'move';
    },
    ...mapMutations(['adddata', 'updateItemColumn', 'editData']),
    checkEnter(event) {
      if (event.key === "Enter") {
        console.log("Search function called");
      }
    },
    setSelectedItem(item) {
      this.selectedItem = {...item};
    },
    dataSendToBacklog() {
      this.$store.commit('editData', this.selectedItem);
      this.selectedItem = {};
    },
    editdata(){
alert("Data Changed, You Can Now Close the Modal")
    },
    getStyle(priority) {
      if (priority === "low") {
        return {backgroundColor: "#d3fff0"};
      } else if (priority === "high") {
        return {backgroundColor: "#ffdbbb"};
      } else if (priority === "urgent") {
        return {backgroundColor: "#ffe2e4"};
      } else {
        return {};
      }
    },
  },
}
</script>

<style scoped>
.list-unstyled {
  padding-left: 0;
  margin-bottom: 0;
}
</style>
