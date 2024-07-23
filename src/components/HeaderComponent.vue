<template>
  <div class="text-center bg-body-tertiary fw-semibold">

    <div class="row" style="max-width: 100%;">
      <div class="col py-2 border">
        Backlog
        {{ taskInColumn.backlog }}
      </div>
      <div class="col py-2 border">
        Open
        {{ taskInColumn.open }}
      </div>
      <div class="col py-2 border">
        New
        {{ taskInColumn.new }}
      </div>
      <div class="col py-2 border">
        In Progress
        {{ taskInColumn.inProgress }}
      </div>
      <div class="col py-2 border">
        Feedback Needed
        {{ taskInColumn.feedBackNeeded }}
      </div>
      <div class="col py-2 border">
        Ready for Testing
        {{ taskInColumn.readyForTesting }}
      </div>
      <div class="col py-2 border">
        QA in Progress
        {{ taskInColumn.qaInProgress }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'HeaderComponent',
  computed: {
    ...mapState({
      taskInColumn: state => state.taskInColumn,
    })
  }
}
</script>

<style scoped>
#HeaderComp {
  max-width: 100%;
}
</style>
