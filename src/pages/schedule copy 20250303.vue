<template>
  <v-container>
    <v-card class="calendar-wrapper" max-width="800px">
      <FullCalendar :options="calendarOptions" />
    </v-card>

    <!-- 新增 Dialog 視窗 -->
    <v-dialog v-model="dialog" max-width="400px">
      <v-card>
        <v-card-title>{{ dialogTitle }}</v-card-title>
        <v-card-text>
          <v-text-field v-model="eventTitle" label="劇本名稱" />
          <v-text-field v-model="eventPlayer" label="玩家名稱" />
          <v-text-field v-model="eventChara" label="角色名稱" />
          <v-text-field v-model="eventTime" label="選擇時間" readonly @click="timePicker = true" />

          <v-dialog v-model="timePicker" max-width="380px">
            <v-card>
              <v-card-title>選擇時間</v-card-title>
              <v-card-text>
                <v-time-picker v-model="eventTime" format="24hr" @update:model-value="timePicker = false" />
              </v-card-text>
            </v-card>
          </v-dialog>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn v-if="selectedEvent" color="red" @click="deleteEvent">刪除</v-btn>
          <v-divider></v-divider>
          <v-btn color="grey" @click="dialog = false">取消</v-btn>
          <v-btn color="primary" @click="saveEvent">確定</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import { useAxios } from '@/composables/axios'
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import { VTimePicker } from 'vuetify/labs/VTimePicker'

const { apiAuth } = useAxios()

// 定義狀態
const events = ref([])
const dialog = ref(false)
const dialogTitle = ref('')
const eventTitle = ref('')
const eventPlayer = ref('')
const eventChara = ref('')
const eventTime = ref('12:00')
const timePicker = ref(false)
const selectedDate = ref('')
const selectedEvent = ref(null)
const tooltipContent = ref('')

// calendarOptions 設定
const calendarOptions = ref({
  plugins: [dayGridPlugin, interactionPlugin],
  initialView: 'dayGridMonth',
  editable: true,
  events: events.value,
  displayEventTime: false,
  dateClick: handleDateClick,
  eventClick: handleEventClick,
  eventDrop: handleEventDrop,
  eventMouseEnter: handleEventMouseEnter,
})

// **滑鼠移入行程顯示更多資訊**
function handleEventMouseEnter(info) {
  const event = info.event
  tooltipContent.value = `劇本: ${event.title}<br>玩家: ${event.extendedProps.player}<br>角色: ${event.extendedProps.chara}<br>時間: ${event.extendedProps.time}`

  // 顯示 Tooltip
  const tooltip = document.createElement('div')
  tooltip.innerHTML = tooltipContent.value
  tooltip.style.position = 'absolute'
  tooltip.style.backgroundColor = 'rgba(0, 0, 0, 0.7)'
  tooltip.style.color = 'white'
  tooltip.style.padding = '10px'
  tooltip.style.borderRadius = '4px'
  tooltip.style.zIndex = '1000'
  tooltip.style.top = `${info.jsEvent.pageY}px`
  tooltip.style.left = `${info.jsEvent.pageX}px`
  document.body.appendChild(tooltip)

  // 在滑鼠移出時，移除 Tooltip
  info.el.addEventListener('mouseleave', () => {
    tooltip.remove()
  })
}

// **點擊日期新增行程**
function handleDateClick(arg) {
  dialogTitle.value = '新增行程'
  eventTitle.value = ''
  eventPlayer.value = ''
  eventChara.value = ''
  eventTime.value = '12:00'
  selectedDate.value = arg.dateStr
  selectedEvent.value = null
  dialog.value = true
}

// **點擊行程編輯行程**
function handleEventClick(info) {
  dialogTitle.value = '編輯行程'
  eventTitle.value = info.event.title
  eventPlayer.value = info.event.extendedProps.player
  eventChara.value = info.event.extendedProps.chara
  eventTime.value = info.event.extendedProps.time
  selectedDate.value = info.event.extendedProps.date
  selectedEvent.value = info.event
  dialog.value = true
}

async function saveEvent() {
  try {
    if (!eventTitle.value.trim()) {
      alert('行程名稱不能為空')
      return
    }

    const eventData = {
      title: eventTitle.value,
      player: eventPlayer.value,
      chara: eventChara.value,
      time: eventTime.value,
      date: selectedDate.value,
    }

    if (selectedEvent.value) {
      const eventId = selectedEvent.value.id
      await apiAuth.patch(`/schedule/${eventId}`, eventData)
    } else {
      // 新增模式，將事件資料送給後端儲存
      await apiAuth.post('/schedule', eventData)
    }

    // 將新增的事件加入 FullCalendar
    // calendarOptions.value.events.push(newEvent)

    console.log(calendarOptions.value.events)
    getSchedule()
    console.log(calendarOptions.value.events)
  } catch (error) {
    console.log(error)
  }

  dialog.value = false
}

async function deleteEvent() {
  if (!selectedEvent.value) return

  if (confirm(`確定要刪除「${selectedEvent.value.title}」嗎？`)) {
    const eventId = selectedEvent.value.id

    // 從 calendarOptions 中移除事件
    calendarOptions.value.events = calendarOptions.value.events.filter((event) => event.id !== eventId)

    try {
      // 送出刪除請求到後端並等待回應
      await apiAuth.delete(`/schedule/${eventId}`)

      // 刪除後清理 dialog
      dialog.value = false
    } catch (error) {
      console.log(error)
    }
  }
}

// **拖曳行程修改日期**
function handleEventDrop(info) {
  alert(`行程「${info.event.title}」已移動到 ${info.event.start.toISOString().split('T')[0]}`)
}

const getSchedule = async () => {
  try {
    const { data } = await apiAuth.get('/schedule')
    console.log(data.result)

    // 在獲取事件後將 MongoDB 的 _id 轉換為 id
    const eventsWithId = data.result.map((event) => ({
      id: event._id, // 將 _id 轉換為 id
      title: event.title,
      player: event.player,
      chara: event.chara,
      time: event.time,
      date: event.date,
    }))

    // 將資料加入 FullCalendar
    events.value.length = 0
    events.value.push(...eventsWithId)
    console.log(events.value)
  } catch (error) {
    console.log(error)
  }
  console.log()
}
getSchedule()
</script>

<style scoped>
.calendar-wrapper {
  padding: 20px;
  margin: auto;
}
</style>
