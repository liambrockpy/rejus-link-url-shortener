const tooltip = document.querySelector(".tooltip")
const modal = document.querySelector("#myModal")
const modalContent = document.querySelector(".modal-content")
const closeSpan = document.querySelector(".close")

closeSpan.onclick = function () {
	closeModal()
}

window.onclick = function (event) {
	if (event.target == modal) {
		closeModal()
	}
}

function closeModal() {
	let qr = document.querySelector(".qr-div")
	modalContent.removeChild(qr)
	modal.style.display = "none"
}

if (document.querySelector(".qr-button")) {
	let qrBtns = document.querySelectorAll(".qr-button")
	qrBtns.forEach((el) =>
		el.addEventListener("click", (e) => {
			let longText =
				e.currentTarget.parentNode.parentNode.children[0].children[1]
					.textContent
			let shortText =
				e.currentTarget.parentNode.parentNode.children[0].children[2]
					.textContent
			let shortArr = shortText.split("/")
			let short = shortArr[shortArr.length - 1]

			let parentDiv = document.createElement("div")
			parentDiv.className = "qr-div"

			let qrLong = document.createElement("div")
			qrLong.className = "qr-long"
			qrLong.textContent = longText

			let qrShort = document.createElement("div")
			qrShort.className = "qr-short"
			qrShort.textContent = shortText

			let qrImg = document.createElement("img")
			qrImg.className = "qrcode"
			qrImg.src = `/static/images/qrcode-${short}.png`

			parentDiv.appendChild(qrShort)
			parentDiv.appendChild(qrImg)
			parentDiv.appendChild(qrLong)

			modalContent.appendChild(parentDiv)
			modal.style.display = "block"
		})
	)
}

if (document.querySelector(".copy")) {
	let allCopy = document.querySelectorAll(".copy")
	allCopy.forEach((el) =>
		el.addEventListener("click", (e) => {
			copyToClipboard(e.currentTarget.parentNode.parentNode.children[0])
			let popper = Popper.createPopper(el, tooltip, {
				placement: "top",
				modifiers: [
					{
						name: "offset",
						options: {
							offset: [0, 8],
						},
					},
				],
			})
			showPopper(tooltip, popper)
			setTimeout(() => {
				hidePopper(tooltip, popper)
			}, 2000)
		})
	)
}

function showPopper(tTip, pop) {
	tTip.setAttribute("data-show", "")
	pop.setOptions((options) => ({
		...options,
		modifiers: [
			...options.modifiers,
			{ name: "eventListeners", enabled: true },
		],
	}))
	pop.update()
}

function hidePopper(tTip, pop) {
	tTip.removeAttribute("data-show")

	pop.setOptions((options) => ({
		...options,
		modifiers: [
			...options.modifiers,
			{ name: "eventListeners", enabled: false },
		],
	}))
}

if (document.querySelector(".remove")) {
	let allRm = document.querySelectorAll(".remove")
	allRm.forEach((el) =>
		el.addEventListener("click", (e) => {
			removeFromHistory(e.target.parentNode.children[1].id)
		})
	)
}

function copyToClipboard(target) {
	let text = target.children[2].textContent

	let textarea = document.createElement("textarea")
	textarea.value = text
	document.body.appendChild(textarea)
	textarea.select()
	textarea.setSelectionRange(0, 99999) // For mobile

	navigator.clipboard.writeText(textarea.value)

	textarea.remove()
}

function removeFromHistory(index) {
	let links = JSON.parse(localStorage.getItem("links"))
	let hLength = document.querySelectorAll(".history-modal").length
	console.log(hLength)

	links.splice(hLength == links.length ? index : index + 1, 1)
	if (links.length == 0) {
		localStorage.removeItem("links")
	} else {
		localStorage.setItem("links", JSON.stringify(links))
	}
	location.reload()
}
