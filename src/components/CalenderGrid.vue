<script setup>
    import { ref, computed, inject } from 'vue'
    import { ACTIONS } from '../store/actions'
    import { DAYS } from '../store/helpers'
    const emit = defineEmits(['displaySetEventModal'])

    const {state, dispatch} = inject('store')
    const current = ref({
        currentDay: DAYS[new Date().getDay()],
        currentDate: new Date().getDate(),
        currentMonth: new Date().getMonth(),
        currentYear: new Date().getFullYear()
    })
    const isCurrentMonthAndYear = computed(() => (
        state.value.date.str.getMonth() === current.value.currentMonth && 
        state.value.date.str.getFullYear() === current.value.currentYear
    ))

    const isPastDate = dt => {
        const month = state.value.date.str.getMonth()
        const year = state.value.date.str.getFullYear()
        return (
            !dt ||
            (year < current.value.currentYear)||
            (
                (
                    (dt < current.value.currentDate && month <= current.value.currentMonth)||
                    (month < current.value.currentMonth)
                ) && 
                year === current.value.currentYear
            )
        )
    }
    const handleDoubleClick = (dt) => {
        if(isPastDate(dt)) return
        emit('displaySetEventModal')
        dispatch({type: ACTIONS.SET_EVENT_AT, payload: {dt}})
    }
</script>

<template>
    <div class="calender-grid">
        <div class="days-grid">
            <div
                v-for="day, index in DAYS"
                :key="index"
                :class="['day', {today: day === current.currentDay && isCurrentMonthAndYear}]"
                :title="day"
            >{{ day[0] }}</div>
        </div>
        <div class="date-grid">
            <div class="date"
                v-for="date in state.dateGrid"
                :key="date.id"
                @dblclick="() => handleDoubleClick(date.dt)"
            >
                <div 
                    :class="['val', {today: date.dt === current.currentDate && isCurrentMonthAndYear, event: date.haveEvent}]" 
                    v-if="date.dt">
                    {{ date.dt }}
                </div>
                <div v-else>&#10060;</div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="less">
    .calender-grid{
        margin-top: 15px;
        display: grid;
        gap: 20px;
        user-select: none;
        .days-grid{
            display: grid;
            grid-template-columns: repeat(7, 1fr);
            justify-content: space-between;
            align-items: center;
            .day{
                text-align: center;
                font-weight: bold;
                &.today{
                    color: blueviolet;
                }
            }
        }
        .date-grid{
            display: grid;
            grid-template-columns: repeat(7, 1fr);
            justify-content: space-between;
            align-items: center;
            row-gap: 20px;
            .date{
                display: flex;
                justify-content: center;
                cursor: pointer;
                .val{
                    width: 20px;
                    height: 20px;
                    text-align: center;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 15px;
                    position: relative;
                    background-color: antiquewhite;
                    &.today{
                        color: blueviolet;
                        font-weight: bold;
                    }
                    &.event{
                        // border: 1px solid salmon;
                        background-color: antiquewhite;
                        font-weight: bold;
                        &::before{
                            content: '';
                            width: 5px;
                            height: 5px;
                            border-radius: 50%;
                            background-color: salmon;
                            position: absolute;
                            top: 2px;
                            right: 2px;
                        }
                    }
                }
            }
        }
    }
</style>