
const imageSize = {
	width: 200,
	height: 200
}

const halfImageSize = {
	width: imageSize.width / 2,
	height: imageSize.height / 2
}

const instructorSection = document.querySelector('#instructors')
const instructorDivs = instructorSection.querySelectorAll('.instructor')
const instructorIds = [ ...instructorDivs ].map(e => e.id)

const instructorNameDiv = document.querySelector('#info-name')
const instructorDescriptionDiv = document.querySelector('#info-description')

const instructorImages = instructorIds.reduce((acc, instructor) => {
	const names = [ '0', '1', '2', '3', '4', '5', '6', '7', 'default' ]
	const images = names.reduce((acc, name) => {
		const img = new Image()
		img.src = `images/${instructor}/hs_${name}.png`
		acc[name] = img
		return acc
	}, { })
	acc[instructor] = images
	return acc
}, { })

const angleToImageIndex = angle => {
    // Add π to make the range [0, 2π] and shift left by π/8 to center bins
    return ((Math.round((angle + Math.PI) / (Math.PI / 4)) + 7) % 8)
}

const hasHoverState = e => e.parentElement.querySelector(':hover') === e


instructorSection.addEventListener('mousemove', e => {
	const x = e.clientX
	const y = e.clientY

	let hovering = false
	Object.entries(instructorImages).forEach(([instructor, images]) => {
		// check if instructor has hover state
		const div = document.querySelector(`#${instructor}`)
		if (!div) return

		const img = instructorSection.querySelector(`#${instructor} img`)

		const hover = hasHoverState(div)
		if (hover) {
			hovering = true
			const image = images.default
			img.src = image.src
			img.classList.add('hover')

			// get the data-attribute for color:
			const { color, hue, name, description } = div.dataset
			document.documentElement.style.setProperty('--instructor-bg-hue', hue)
			instructorNameDiv.innerText = name
			instructorDescriptionDiv.innerText = description

			return
		}

		const offsetX = x - img.offsetLeft - halfImageSize.width
		const offsetY = y - img.offsetTop - halfImageSize.height
		const angle = Math.atan2(offsetY, offsetX)
		const index = angleToImageIndex(angle)
		const image = images[index.toString()]
		img.src = image.src
		img.classList.remove('hover')

	})
})

instructorSection.addEventListener('mouseleave', e => {
	document.documentElement.style.setProperty('--instructor-bg-hue', '0')
	instructorNameDiv.innerText = 'Select an Instructor'
	instructorDescriptionDiv.innerText = 'Hover over an instructor to learn more.'
})