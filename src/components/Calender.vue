<script setup>
    import { ref, inject, watch } from 'vue'
    import { ACTIONS } from '../store/actions'
    import Header from './Header.vue'
    import CalenderGrid from './CalenderGrid.vue'
    import SetEvent from './SetEvent.vue'
    import ShowEvents from './ShowEvents.vue'

    const openSetEventModal = ref(false)
    const openShowEventsModal = ref(false)
    const {state, dispatch} = inject('store')

    const displaySetEventModal = () => openSetEventModal.value = !openSetEventModal.value

    const displayShowEventsModal = () => openShowEventsModal.value = !openShowEventsModal.value

    watch(
        () => state.value.date,
        () => dispatch({type: ACTIONS.UPDATE_DATE_GRID}),
        {immediate: true}
    )
</script>

<template>
    <main>
        <Header
            @display-show-events-modal="displayShowEventsModal"
        />
        <CalenderGrid
            @display-set-event-modal="displaySetEventModal"
        />
        <SetEvent
            v-if="openSetEventModal"
            @display-set-event-modal="displaySetEventModal"
        />
        <ShowEvents
            v-if="openShowEventsModal"
            @display-show-events-modal="displayShowEventsModal"
        />
    </main>
</template>

<style scoped lang="less">
    main{
        width: 500px;
        padding-bottom: 30px;
        border-radius: 5px;
        background-color: azure;
        box-shadow: 5px 5px 20px 0 rgba(0, 0, 0, 0.5);
        @media(max-width: 500px){
            width: 90vw;
        }
    }
</style>