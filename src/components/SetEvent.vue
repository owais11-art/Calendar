<script setup>
    import { ref, inject } from 'vue'
    import { ACTIONS } from '../store/actions'
    const emit = defineEmits(['displaySetEventModal'])

    const {state, dispatch} = inject('store')
    const handleClick = () => emit('displaySetEventModal')
    const event = ref('')
    const note = ref('')
    const saveEvent = () => {
        if(!event.value) return
        const payload = {
            id: Math.floor(Math.random()*100000000000000),
            event: event.value,
            note: note.value,
            date: new Date(),
            eventAt: state.value.eventAt.at
        }
        dispatch({type: ACTIONS.SAVE_EVENT, payload})
        dispatch({type: ACTIONS.UPDATE_DATE_GRID})
        handleClick()
    }
</script>

<template>
    <div class="set-event-modal">
        <div class="set-event-block">
            <div class="cancel" @click="handleClick">&#10060;</div>
            <div class="event-wrapper">
                <label for="event">Enter Event</label><br/>
                <input type="text" id="event" v-model="event" placeholder="This block is required" required><br/><br/>
                <label for="note">Note</label><br/>
                <textarea id="note" v-model="note" placeholder="Optional"></textarea>
            </div>
            <button @click="saveEvent">SAVE</button>
        </div>
    </div>
</template>

<style scoped lang="less">
    .set-event-modal{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        .set-event-block{
            position: relative;
            width: 350px;
            padding: 40px;
            border-radius: 5px;
            display: flex;
            flex-direction: column;
            gap: 20px;
            background-color: antiquewhite;
            .cancel{
                width: 20px;
                height: 20px;
                position: absolute;
                top: 5px;
                right: 5px;
                cursor: pointer;
            }
            button{
                border: none;
                font-family: 'Courier New', Courier, monospace;
                font-weight: bolder;
                padding: 5px;
                border-radius: 5px;
                background-color: aquamarine;
                cursor: pointer;
            }
            .event-wrapper{
                width: 100%;
                label{
                    font-weight: bold;
                }
                input, textarea{
                    width: 100%;
                    border: 1px solid #575454;
                    background-color: transparent;
                    padding: 5px;
                    border-radius: 5px;
                    margin-top: 5px;
                    font-family: 'Courier New', Courier, monospace;
                    font-weight: bolder;
                    &:focus{
                        outline: none;
                    }
                }
            }
        }
    }
</style>