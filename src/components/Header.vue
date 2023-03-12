<script setup>
    import { ref, watch, inject } from 'vue'
    import { MONTHS } from '../store/helpers'
    import { ACTIONS } from '../store/actions'
    import chev from '../assets/chev.svg'
    const emit = defineEmits(['displayShowEventsModal'])

    const {state, dispatch} = inject('store')
    const [ _, month, __, year ] = state.value.date.dateString.split(' ')
    const current = ref({
        month: MONTHS[month],
        year
    })
    const handleClick = direction => dispatch({type: ACTIONS.UPDATE_DATE, payload: {direction}})
    const getEvents = () => emit('displayShowEventsModal')
    watch(() => state.value.date, (date) => {
        const [ _, month, __, year ] = date.dateString.split(' ')
        current.value = {
            month: MONTHS[month],
            year
        }
    })
</script>

<template>
    <div class="header">
        <div class="info">
            <div class="year">
                <p>{{ current.year }}</p>
            </div>
            <div class="events" @click="getEvents">
                <div class="number-of-events" v-if="state.events.length">{{ state.events.length }}</div>
                Events
            </div>
        </div>
        <div class="wrapper">
            <div class="left-chev chev" @click="() => handleClick('previous-month')">
            <img :src="chev" alt="left-chevron">
            </div>
            <div class="month">
                <h2>{{ current.month }}</h2>
            </div>
            <div class="right-chev chev" @click="() => handleClick('next-month')">
                <img :src="chev" alt="right-chevron">
            </div>
        </div>
    </div>
</template>

<style scoped lang="less">
    .header{
        display: flex;
        flex-direction: column;
        padding: 10px;
        background-color: antiquewhite;
        border-radius: 5px 5px 0 0;
        .info{
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-weight: bold;
            .events{
                cursor: pointer;
                background: rgb(247, 175, 81);
                padding: 5px 8px;
                border-radius: 5px;
                position: relative;
                &:hover{
                    background: rgb(233, 173, 95);
                }
                .number-of-events{
                    position: absolute;
                    width: 20px;
                    height: 20px;
                    border-radius: 50%;
                    background-color: orangered;
                    top: -6px;
                    right: -6px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    color: antiquewhite;
                    font-size: 14px;
                }
            }
        }
        .wrapper{
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 20px 0;
            .month{
                h2{
                    font-size: 32px;
                    font-weight: bolder;
                    letter-spacing: 5.5px;
                }
            }
            .chev{
                user-select: none;
                width: 40px;
                height: 40px;
                border-radius: 50%;
                display: flex;
                justify-content: center;
                align-items: center;
                cursor: pointer;
                transition: background-color .5s;
                &:hover{
                    background-color: rgb(243, 206, 158);
                }
                img{
                    width: 100%;
                    height: auto;
                    transform: translateX(2px);
                }
            }
            .left-chev{
                transform: rotate(180deg);
            }
        }
    }
</style>