
const h1 = document.querySelector('h1')
h1.textContent = "Ryan's lame webpage!"

const copyright = document.querySelector('footer > p')
copyright.textContent = "BLA"

const link = document.querySelector('.active')
link.style.color = "#ff0000"
link.style.textDecoration = "underline"

const contactLink = document.querySelector('#contact')
contactLink.style.fontWeight = "bold"

const links = document.querySelectorAll('nav a')
links.forEach(link => link.style.display = 'none')

const isAJerk = true
const firstName = "Ryan"
const lastName = "Appel"
const job = "Nerd"
const salary = 10000
console.log({ salary, lastName })