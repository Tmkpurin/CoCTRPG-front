<template>
  <div>
    <!-- 移除選擇視圖模式的下拉選單 -->
    <v-sheet>
      <!-- 月曆 -->
      <v-calendar
        ref="calendar"
        v-model="value"
        :events="events"
        @click:date="openAddDialog"
        @click:event="openEditDialog"
      ></v-calendar>
    </v-sheet>

    <!-- 新增/編輯行程的 Dialog -->
    <v-dialog v-model="dialog" max-width="400px">
      <v-card>
        <v-card-title>{{ isEditing ? 'Edit Event' : 'Add Event' }}</v-card-title>
        <v-card-text>
          <v-text-field v-model="editedEvent.title" label="Event Title"></v-text-field>
          <v-menu ref="startMenu" v-model="startMenu" :close-on-content-click="false">
            <template #activator="{ on, attrs }">
              <v-text-field
                v-model="editedEvent.start"
                label="Start Time"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="editedEvent.start" @input="startMenu = false"></v-date-picker>
          </v-menu>
        </v-card-text>
        <v-card-actions>
          <v-btn text @click="dialog = false">Cancel</v-btn>
          <v-btn v-if="isEditing" color="error" text @click="deleteEvent">Delete</v-btn>
          <v-btn color="primary" text @click="saveEvent">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: new Date(),
      events: [],
      dialog: false,
      isEditing: false,
      editedEvent: { title: '', start: new Date(), color: 'blue' },
      selectedEvent: null,
      startMenu: false,
    }
  },
  methods: {
    // 當使用者點擊日期時，開啟新增行程的 Dialog
    openAddDialog({ date }) {
      this.isEditing = false
      this.editedEvent = { title: '', start: new Date(date), color: 'blue' }
      this.dialog = true
    },

    // 當使用者點擊行程時，開啟編輯 Dialog
    openEditDialog({ event }) {
      this.isEditing = true
      this.selectedEvent = event
      this.editedEvent = { ...event } // 複製避免影響原資料
      this.dialog = true
    },

    // 儲存行程（新增或更新）
    saveEvent() {
      if (this.isEditing) {
        // 編輯模式
        Object.assign(this.selectedEvent, this.editedEvent)
      } else {
        // 新增模式
        this.events.push({ ...this.editedEvent })
      }
      this.dialog = false
    },

    // 刪除行程
    deleteEvent() {
      this.events = this.events.filter((e) => e !== this.selectedEvent)
      this.dialog = false
    },
  },
}
</script>

<template>
  <div class="text-center">
    <v-menu open-on-hover>
      <template v-slot:activator="{ props }">
        <v-btn color="primary" v-bind="props"> Dropdown </v-btn>
      </template>

      <v-list>
        <v-list-item v-for="(item, index) in items" :key="index">
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>
<script>
export default {
  data: () => ({
    items: [{ title: 'Click Me' }, { title: 'Click Me' }, { title: 'Click Me' }, { title: 'Click Me 2' }],
  }),
}
</script>
