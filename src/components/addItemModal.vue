<template>
  <div class="text-center bg-body-tertiary fw-semibold py-2" style="max-width: 100%;"><h5>Scrum Board</h5></div>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">

    <div class="container-fluid">
      <div id="navbarSupportedContent" class="d-flex justify-content-between w-100 px-5">
        <!-- submit form modal -->
        <div>
          <!-- Button trigger modal -->
          <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
            Add Tasks
          </button>
          <!-- Modal -->
          <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel"
               aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
              <div class="modal-content p-4">
                <div class="modal-header">
                  <h5 class="modal-title text-primary" id="exampleModalLabel">Add Task to Backlog</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                  <form @submit.prevent="dataSendToBacklog">
                    <div class="mb-3">
                      <input
                          type="text"
                          v-model="name"
                          required
                          placeholder="Task Name"
                          class="form-control"
                    </div>
                    <div class="mb-3">
                      <input
                          type="text"
                          v-model="description"
                          required
                          placeholder="Task Description"
                          class="form-control"
                    </div>
                    <div class="mb-3">
                      <input
                          type="text"
                          v-model="assignee"
                          required
                          placeholder="Assignee"
                          class="form-control"
                    </div>
                    <div class="mb-3">
                      <input
                          type="date"
                          v-model="dueDate"
                          :min="today"
                          required
                          placeholder="Due Date"
                          class="form-control">
                    </div>
                    <!--                    <div class="mb-3">-->
                    <!--                      <input-->
                    <!--                          type="hidden"-->
                    <!--                          v-model="status"-->
                    <!--                          required-->
                    <!--                          placeholder="Status"-->
                    <!--                          class="form-control">-->
                    <!--                    </div>-->
                    <div class="mb-3">
                      <input
                          type="number"
                          v-model="spentTime"
                          step="0.01"
                          min="0"
                          required
                          placeholder="Spent Time in hours"
                          class="form-control">
                    </div>
                    <div class="mb-3">
                      <label class="form-label">Select Task Priority</label>
                      <div>
                        <div class="form-check">
                          <input
                              class="form-check-input"
                              type="radio"
                              name="priority"
                              value="low"
                              v-model="priority"
                              id="priorityLow"
                              required>
                          <label class="form-check-label" for="priorityLow">
                            Low
                          </label>
                        </div>
                        <div class="form-check">
                          <input
                              class="form-check-input"
                              type="radio"
                              name="priority"
                              value="high"
                              v-model="priority"
                              id="priorityHigh">
                          <label class="form-check-label" for="priorityHigh">
                            High
                          </label>
                        </div>
                        <div class="form-check">
                          <input
                              class="form-check-input"
                              type="radio"
                              name="priority"
                              value="urgent"
                              v-model="priority"
                              id="priorityUrgent">
                          <label class="form-check-label" for="priorityUrgent">
                            Urgent
                          </label>
                        </div>
                      </div>
                    </div>

                    <button type="submit" class="btn btn-primary">Add Task</button>
                  </form>

                </div>
              </div>
            </div>
          </div>

        </div>
        <!-- Download Button -->

        <div class="d-flex px-2 ">
          <div class="mx-4">
            <button class="btn btn-primary" @click="triggerFileInput">
              Import Tasks
            </button>
            <input type="file" ref="fileInput" @change="handleFileUpload" style="display: none;">
          </div>
          <button class="btn btn-primary" @click="downloadJson">
            Export Tasks
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>


<script>
import BacklogData from "./BacklogData";

export default {
  data() {
    return {
      name: "",
      description: "",
      assignee: "",
      dueDate: "",
      status: "Back Log",
      spentTime: "",
      priority: "",
      today: new Date().toISOString().split('T')[0],
      backlogData: BacklogData,
    };
  },
  props: {
    show: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    triggerFileInput() {
      this.$refs.fileInput.click();
    },
    handleFileUpload(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const json = JSON.parse(e.target.result);
            // Assuming the JSON structure matches your `form` structure
            this.$store.commit('setFormData', json);
          } catch (error) {
            console.error("Invalid JSON file");
            alert("Please Upload Json file")
          }
        };
        reader.readAsText(file);
      }
    },
    downloadJson() {
      const jsonString = JSON.stringify(this.backlogData, null, 2);
      const blob = new Blob([jsonString], {type: "application/json"});
      const link = document.createElement("a");
      link.download = "backlog-data.json";
      link.href = URL.createObjectURL(blob);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },
    dataSendToBacklog() {
      this.$store.commit('adddata', {
        name: this.name,
        description: this.description,
        assignee: this.assignee,
        duedate: this.dueDate,
        status: this.status,
        spenttime: this.spentTime,
        priority: this.priority,
      });

      this.name = "";
      this.description = "";
      this.assignee = "";
      this.dueDate = "";
      this.spentTime = "";
      this.priority = "";
    }
  },
};
</script>


<style scoped>
p, h1, h2, h3, h4, h5, h6, ul, li {
  padding: 0 !important;
  margin: 0 !important;
}

</style>
