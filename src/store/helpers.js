const increase = (month, year) => {
    const obj = {}
    if(month !== 11){
        obj.str = new Date(`${year}-${month+2}`)
        obj.dateString = new Date(`${year}-${month+2}`).toDateString()
    }else{
        obj.str = new Date(`${year+1}-01`)
        obj.dateString = new Date(`${year+1}-01`).toDateString()
    }
    return obj
}
const decrease = (month, year) => {
    const obj = {}
    if(month !== 0){
        obj.str = new Date(`${year}-${month}`)
        obj.dateString = new Date(`${year}-${month}`).toDateString()
    }else{
        obj.str = new Date(`${year-1}-12`)
        obj.dateString = new Date(`${year-1}-12`).toDateString()
    }
    return obj
}
const arrangeGridAccordingToDays = oldDateGrid => {
    let newDateGrid = []
    const firstDay = DAYS.indexOf(oldDateGrid[0].day)
    for(let i = 0; i <= firstDay; i++){
        if(i < firstDay){
            newDateGrid = [...newDateGrid, {
                id: Math.random(),
                dt: '',
                day: DAYS[i],
                haveEvent: false
            }]
        }else{
            newDateGrid = [...newDateGrid, ...oldDateGrid]
        }
    }
    return newDateGrid
}

const isLeapYear = year => {
    const firstCondition = year % 4 === 0 && year % 100 !== 0
    const secondCondition = year % 4 === 0 && year % 100 === 0 && year % 400 === 0
    if(firstCondition || secondCondition) return true
    return false
}

const getNumberOfDays = (month, year) => {
    const thirtyOneDays = ['Jan', 'Mar', 'May', 'Jul', 'Aug', 'Oct', 'Dec']
    if(thirtyOneDays.includes(month)) return 31
    else if(month === 'Feb') return isLeapYear(year) ? 29 : 28
    return 30
}

const MONTHS = {
    Jan: "January",
    Feb: "February",
    Mar: "March",
    Apr: "April",
    May: "May",
    Jun: "June",
    Jul: "July",
    Aug: "August",
    Sep: "September",
    Oct: "October",
    Nov: "November",
    Dec: "December"
}

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

export {
    MONTHS,
    DAYS,
    getNumberOfDays,
    increase,
    decrease,
    arrangeGridAccordingToDays
}