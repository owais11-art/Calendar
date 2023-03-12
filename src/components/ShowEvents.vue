<script setup>
    import { inject } from 'vue'
    import { ACTIONS } from '../store/actions'
    const emit = defineEmits(['displayShowEventsModal'])

    const {state, dispatch} = inject('store')
    const handleClick = () => emit('displayShowEventsModal')
    const handleRemove = id => {
        dispatch({type: ACTIONS.REMOVE_EVENT, payload: {id}})
        dispatch({type: ACTIONS.UPDATE_DATE_GRID})
    }
</script>

<template>
    <div class="show-events-modal">
        <div class="events-block">
            <div class="cancel" @click="handleClick">&#10060;</div>
            <template v-if="state.events.length > 0">
                <div class="event"
                    v-for="evt in state.events"
                    :key="evt.id"
                >
                    <div class="date">
                        <small>{{ evt.date.split('T')[0] }}</small>
                    </div>
                    <div class="event-name">
                        <h5>Event</h5>
                        <p>{{ evt.event }}</p>
                    </div>
                    <div class="event-on">
                        <h5>Event on</h5>
                        <p>{{ evt.eventAt }}</p>
                    </div>
                    <div class="event-note">
                        <h5>Note</h5>
                        <p :class="{empty: !evt.note}">{{ evt.note ? evt.note : '--Notes not available--' }}</p>
                    </div>
                    <div class="remove-btn" @click="() => handleRemove(evt.id)">
                        <button>Remove</button>
                    </div>
                </div>
            </template>
            <div class="no-events" v-else>😊No Events</div>
        </div>
    </div>
</template>

<style scoped lang="less">
    .show-events-modal{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        .events-block{
            width: 700px;
            height: 500px;
            border-radius: 5px;
            background-color: antiquewhite;
            overflow-y: scroll;
            padding: 20px;
            position: relative;
            &::-webkit-scrollbar{
                width: 5px;
            }
            &::-webkit-scrollbar-track{
                appearance: none;
                width: 5px;
                background-color: transparent;
            }
            &::-webkit-scrollbar-thumb{
                width: 5px;
                border-radius: 10px;
                background: rgb(247, 175, 81);
            }
            .no-events{
                margin-top: 25%;
                margin-left: 50%;
                transform: translate(-50%, -25%);
                text-align: center;
                font-weight: bolder;
            }
            .cancel{
                width: 20px;
                height: 20px;
                position: absolute;
                top: 5px;
                right: 5px;
                cursor: pointer;
            }
            .event{
                width: 100%;
                background-color: rgb(249, 219, 180);
                margin-top: 20px;
                padding: 15px;
                border-radius: 5px;
                .date{
                    display: flex;
                    align-items: center;
                    justify-content: flex-end;
                    small{
                        font-weight: bold;
                    }
                }
                div{
                    &:first-child{
                        h5{
                            margin-top: 0;
                        }
                    }
                    h5{
                        font-size: 20px;
                        font-weight: bolder;
                        margin: 8px 0;
                    }
                    p{
                        border: 1px solid #5c5757;
                        border-radius: 5px;
                        padding: 5px;
                        font-weight: bold;
                        color: #5c5757;
                    }
                }
                .event-note{
                    p{
                        height: 100px;
                        overflow-y: scroll;
                        &::-webkit-scrollbar{
                            width: 5px;
                        }
                        &::-webkit-scrollbar-track{
                            appearance: none;
                            width: 5px;
                            background-color: transparent;
                        }
                        &::-webkit-scrollbar-thumb{
                            width: 5px;
                            border-radius: 10px;
                            background: rgb(247, 175, 81);
                        }
                        &.empty{
                            color: rgb(247, 175, 81);
                        }
                    }
                }
                .remove-btn{
                    display: flex;
                    align-items: center;
                    justify-content: flex-end;
                    margin-top: 8px;
                    button{
                        border: none;
                        font-weight: bold;
                        padding: 5px 10px;
                        background-color: orangered;
                        color: antiquewhite;
                        cursor: pointer;
                        border-radius: 5px;
                        font-family: 'Courier New', Courier, monospace;
                        letter-spacing: 3px;
                    }
                }
            }
        }
    }
</style>