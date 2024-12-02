
const menuDiv = document.querySelector("#menu")
const eventsDiv = document.querySelector("#events")
const modal = document.getElementById("eventModal")
const closeButton = document.querySelector(".close-button")

const modalElements = {
    name: document.getElementById('modalName'),
    location: document.getElementById('modalLocation'),
    date: document.getElementById('modalDate'),
    time: document.getElementById('modalTime')
}

const getMenu = async () => {
    const response = await fetch('api/v1/menu')
    return await response.json()
}

const showMenuList = menus => {
    menus?.forEach(({ name, description, price, image }) => {
        const menuItem = document.createElement('span')
        menuItem.className = "item"
        menuItem.innerHTML = `
            <p>${name}</p>
            <p>${description}</p>
            <p>${price}</p>
            <img src="${image}" alt="${name}" width=500 height=500>
        `
        menuDiv.appendChild(menuItem)
    })
}

const getEvents = async () => {
    const response = await fetch('api/v1/events')
    return await response.json()
}

const getEvent = async id => {
    const response = await fetch(`/api/v1/events/${id}`)
    return await response.json()
}

const showEventList = events => {
    events?.forEach(({ _id, name, location, date, time }) => {
        const eventItem = document.createElement('span')
        eventItem.className = "eventItem"
        eventItem.innerHTML = `
            <p>${name}</p>
            <p>${date}</p>
        `
        eventItem.onclick = () => showEventDetails(_id)
        eventsDiv.appendChild(eventItem)
    })
}

const showEventDetails = async id => {

    const {name, location, date, time} = await getEvent(id)

    modalElements.name.textContent = name
    modalElements.location.textContent = location
    modalElements.date.textContent = date
    modalElements.time.textContent = time

    modal.style.display = 'block'
}

closeButton.onclick = () => modal.style.display = 'none'

window.onclick = event => {
    if (event.target === modal) modal.style.display = 'none'
}

;(async () => {
    const menu = await getMenu()
    const event = await getEvents()
    showMenuList(menu)
    showEventList(event)
})()