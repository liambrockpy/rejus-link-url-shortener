let history = JSON.parse(localStorage.getItem("links"))
let historyDiv = document.querySelector(".history-modal")

if (document.querySelector(".result-modal")) {
	let resultModal = document.querySelector(".result-modal")
	let long = resultModal.querySelector(".long-url").textContent
	let short = resultModal.querySelector(".short-url").textContent

	let h = JSON.parse(localStorage.getItem("links"))
	if (h) {
		if (h[0]["short"] != short) {
			h.unshift({ long: long, short: short })
		}
	} else {
		h = [{ long: long, short: short }]
	}
	localStorage.setItem("links", JSON.stringify(h))
}

let children = []
let index = 0

history &&
	history.forEach((link) => {
		let parentDiv = document.createElement("div")
		parentDiv.className = "container"

		let linkDiv = document.createElement("div")
		linkDiv.className = "link"

		let faviconImg = document.createElement("img")
		faviconImg.src = `https://www.google.com/s2/favicons?domain=${link.long}`
		faviconImg.className = "fav"

		let linkLong = document.createElement("div")
		linkLong.className = "long-url"
		linkLong.textContent = link.long

		let linkShort = document.createElement("a")
		linkShort.id = index
		linkShort.className = "short-url"
		linkShort.textContent = link.short
		linkShort.href = `https://${link.short}`
		linkShort.target = "_blank"

		let svgDiv = document.createElement("span")
		svgDiv.className = "svg-div"
		let linkSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
		linkSvg.setAttribute("xmlns", "http://www.w3.org/2000/svg")
		linkSvg.setAttribute("width", "24px")
		linkSvg.setAttribute("height", "24px")
		linkSvg.setAttribute("fill", "none")
		linkSvg.setAttribute("viewbox", "0 0 20 20")
		linkSvg.setAttribute("stroke-width", "1.5")
		linkSvg.setAttribute("stroke", "black")
		linkSvg.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />`

		svgDiv.appendChild(linkSvg)
		linkShort.appendChild(svgDiv)
		linkDiv.appendChild(faviconImg)
		linkDiv.appendChild(linkLong)
		linkDiv.appendChild(linkShort)

		// let qrImg = document.createElement("img")
		// qrImg.src = `/static/images/qrcode-${link.short.slice(-6)}.png`
		// qrImg.className = "qrcode"

		let qrButton = document.createElement("button")
		qrButton.className = "qr-button"
		let qrSvgDiv = document.createElement("span")
		let qrSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
		qrSvg.setAttribute("xmlns", "http://www.w3.org/2000/svg")
		qrSvg.setAttribute("width", "24px")
		qrSvg.setAttribute("height", "24px")
		qrSvg.setAttribute("fill", "none")
		qrSvg.setAttribute("viewbox", "0 0 24 24")
		qrSvg.setAttribute("stroke-width", "1.5")
		qrSvg.setAttribute("stroke", "black")
		qrSvg.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 013.75 9.375v-4.5zM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 01-1.125-1.125v-4.5zM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0113.5 9.375v-4.5z" />
		<path stroke-linecap="round" stroke-linejoin="round" d="M6.75 6.75h.75v.75h-.75v-.75zM6.75 16.5h.75v.75h-.75v-.75zM16.5 6.75h.75v.75h-.75v-.75zM13.5 13.5h.75v.75h-.75v-.75zM13.5 19.5h.75v.75h-.75v-.75zM19.5 13.5h.75v.75h-.75v-.75zM19.5 19.5h.75v.75h-.75v-.75zM16.5 16.5h.75v.75h-.75v-.75z" />`

		qrSvgDiv.appendChild(qrSvg)
		qrButton.appendChild(qrSvgDiv)

		let copyButton = document.createElement("button")
		copyButton.className = "copy"
		let copySvgDiv = document.createElement("span")
		let copySvg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
		copySvg.setAttribute("xmlns", "http://www.w3.org/2000/svg")
		copySvg.setAttribute("width", "24px")
		copySvg.setAttribute("height", "24px")
		copySvg.setAttribute("fill", "none")
		copySvg.setAttribute("viewbox", "0 0 24 24")
		copySvg.setAttribute("stroke-width", "1.5")
		copySvg.setAttribute("stroke", "black")
		copySvg.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />`

		copySvgDiv.appendChild(copySvg)
		copyButton.appendChild(copySvgDiv)

		let removeButton = document.createElement("button")
		removeButton.className = "remove"
		removeButton.innerHTML = "&times;"

		let buttonsContainer = document.createElement("div")
		buttonsContainer.className = "buttons-container"
		buttonsContainer.appendChild(copyButton)
		buttonsContainer.appendChild(qrButton)
		// buttonsContainer.appendChild(qrImg)
		buttonsContainer.appendChild(removeButton)

		parentDiv.appendChild(linkDiv)
		parentDiv.appendChild(buttonsContainer)

		children.push(parentDiv)
		index += 1
	})

if (children.length != 0) {
	let header = document.createElement("h3")
	header.textContent = "History"
	historyDiv.appendChild(header)
}

children.forEach((element) => {
	historyDiv.appendChild(element)
})
