export class Database{
    static KEY = 'events'
    static getEvents(){
        const events = JSON.parse(localStorage.getItem(Database.KEY)) || []
        return events
    }

    static setEvent(event){
        const events = Database.getEvents()
        const newEvents = [...events, event]
        localStorage.setItem(Database.KEY, JSON.stringify(newEvents))
    }

    static haveEvent(month, year, date){
        const events = Database.getEvents()
        let e = false
        for(let event of events){
            const [_, evtMonth, evtDate , evtYear] = event.eventAt.split(' ')
            if(year === evtYear && month === evtMonth && date === parseInt(evtDate)) {
                e = true
                break
            }
        }
        return e
    }

    static removeEvent(id){
        const events = Database.getEvents().filter(item => item.id !== id)
        localStorage.setItem(Database.KEY, JSON.stringify(events))
    }

    static clearEvents(){
        localStorage.clear(Database.KEY)
    }
}