
const imageSize = {
	width: 200,
	height: 200
}

const halfImageSize = {
	width: imageSize.width / 2,
	height: imageSize.height / 2
}


const instructorImages = [
	'appel'
].reduce((acc, instructor) => {
	const names = [ '0', '1', '2', '3', '4', '5', '6', '7', 'default' ]
	const images = names.reduce((acc, name) => {
		const img = new Image()
		img.src = `images/${instructor}/${instructor}_${name}.png`
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


const instructorSection = document.querySelector('#instructors')
instructorSection.addEventListener('mousemove', e => {
	// mouse position
	const x = e.clientX
	const y = e.clientY

	Object.entries(instructorImages).forEach(([instructor, images]) => {
		// calculate offset from center of image to mouse
		const img = instructorSection.querySelector(`#${instructor} img`)
		const offsetX = x - img.offsetLeft - halfImageSize.width
		const offsetY = y - img.offsetTop - halfImageSize.height
		const angle = Math.atan2(offsetY, offsetX)
		const distanceSq = offsetX * offsetX + offsetY * offsetY
		const radiusSq = 90 * 90
		if (distanceSq <= radiusSq) {
			const image = images.default
			img.src = image.src
			img.classList.add('hover')
		}
		else {
			const index = angleToImageIndex(angle)
			const image = images[index.toString()]
			img.src = image.src
			img.classList.remove('hover')
		}

	})
})