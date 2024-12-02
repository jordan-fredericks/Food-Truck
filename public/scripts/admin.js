
const menuSubmit = document.querySelector('.item10')
const menuName = document.querySelector('#menuName')
const menuDesc = document.querySelector('#menuDescription')
const menuPrice = document.querySelector('#menuPrice')
const menuURL = document.querySelector('#menuURL')

const eventsSubmit = document.querySelector('.event10')
const eventName = document.querySelector('#eventName')
const eventLocation = document.querySelector('#eventLocation')
const eventDate = document.querySelector('#eventDate')
const eventTime = document.querySelector('#eventTime')


//Send the data from the new menu item form to the database
const menuPost = async (name, description, price, image) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json")
    const data = {
        name: name,
        description: description,
        price: price,
        image: image
    }
    
    const response = await fetch('/api/v1/menu', {
        method: "POST",
        body: JSON.stringify(data),
        headers: myHeaders,
    })
}

menuSubmit.addEventListener('click', () => {
    name = menuName.value
    description = menuDesc.value
    price = menuPrice.value
    url = menuURL.value

   menuPost(name, description, price, url)
})


//Send the data from the new event item form to the database
const eventPost = async (name, location, date, time) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json")
    const data = {
        name: name,
        location: location,
        date: date,
        time: time
    }
    
    const response = await fetch('/api/v1/events', {
        method: "POST",
        body: JSON.stringify(data),
        headers: myHeaders,
    })
}

eventsSubmit.addEventListener('click', () => {
    name = eventName.value
    locat = eventLocation.value
    date = eventDate.value
    time = eventTime.value

   eventPost(name, locat, date, time)
})