window.addEventListener('DOMContentLoaded', () => {
	// LOADER
	const loader = document.querySelector('.loader')

	if (loader) {
		setTimeout(() => {
			loader.style.display = 'none'
		}, 2000)
	}

	// TABS
	const tabs = document.querySelectorAll('.about__tabs-btn')
	const tabContents = document.querySelectorAll('.about__tabs-content')
	const tabParents = document.querySelector('.about__tabs-list')

	function hideTabContents() {
		tabContents.forEach(tabContent => {
			tabContent.classList.add('hide')
			tabContent.classList.remove('show')
		})

		tabs.forEach(tab => {
			tab.classList.remove('about__tabs-btn--active')
		})
	}

	function showTabContent(index = 0) {
		tabContents[index].classList.add('show', 'fade')
		tabContents[index].classList.remove('hide')

		tabs[index].classList.add('about__tabs-btn--active')
	}

	hideTabContents()
	showTabContent()

	tabParents.addEventListener('click', (event) => {
		const target = event.target

		if (target && target.classList.contains('about__tabs-btn')) {
			tabs.forEach((item, index) => {
				if (target == item) {
					hideTabContents()
					showTabContent(index)
				}
			})
		}
	})

	// TIMER
	const deadline = '2025-06-01'

	function getTimeRemaining(endtime) {
		let days, hours, minutes, seconds

		const time = Date.parse(endtime) - Date.parse(new Date())

		if (time <= 0) {
			days = 0
			hours = 0
			minutes = 0
			seconds = 0
		} else {
			days = Math.floor(time / (1000 * 60 * 60 * 24))
			hours = Math.floor((time / (1000 * 60 * 60)) % 24)
			minutes = Math.floor(time / (1000 * 60) % 24)
			seconds = Math.floor((time / 1000) % 60)
		}

		return {
			total: time,
			days: days,
			hours: hours,
			minutes: minutes,
			seconds: seconds
		}
	}

	function getZero(number) {
		if (number >= 0 && number < 10) {
			return `0${number}`
		} else {
			return number
		}
	}

	function setClock(selector, endtime) {
		const timer = document.querySelector(selector),
			days = timer.querySelector('#days'),
			hours = timer.querySelector('#hours'),
			minutes = timer.querySelector('#minutes'),
			seconds = timer.querySelector('#seconds'),
			timeInterval = setInterval(updateClock, 1000)

		updateClock()

		function updateClock() {
			const time = getTimeRemaining(endtime)

			days.textContent = getZero(time.days)
			hours.textContent = getZero(time.hours)
			minutes.textContent = getZero(time.minutes)
			seconds.textContent = getZero(time.seconds)

			if (time.total <= 0) {
				clearInterval(timeInterval)
			}
		}
	}

	setClock('.timer', deadline)

	// MODAL
	const modal = document.querySelector('.modal'),
		modalOpenBtns = document.querySelectorAll('[data-modal]'),
		modalCloseBtn = document.querySelector('.modal__close')

	function openModal() {
		modal.classList.add('show', 'modal-fade')
		modal.classList.remove('hide')
		document.body.style.overflow = 'hidden'

		clearTimeout(modalTimerId)
	}

	modalOpenBtns.forEach(btn => {
		btn.addEventListener('click', openModal)
	})

	function closeModal() {
		modal.classList.add('hide')
		modal.classList.remove('show')
		document.body.style.overflow = ''
	}

	modalCloseBtn.addEventListener('click', closeModal)

	modal.addEventListener('click', event => {
		if (event.target === modal) {
			closeModal()
		}
	})

	document.addEventListener('keydown', event => {
		if (event.key === 'Escape' && modal.classList.contains('show')) {
			closeModal()
		}
	})

	const modalTimerId = setTimeout(openModal, 5000)


	// Slider
	const slides = document.querySelectorAll('.gallery__slider-item'),
		prevSlideBtn = document.querySelector('.gallery__slider-prev'),
		nextSlideBtn = document.querySelector('.gallery__slider-next'),
		currentSlide = document.querySelector('#current'),
		totalSlide = document.querySelector('#total'),
		slider = document.querySelector('.gallery__slider-inner'),
		sliderList = document.querySelector('.gallery__slider-list'),
		width = window.getComputedStyle(sliderList).width

	let slideIndex = 1
	let offset = 0
	let Interval

	if (slides.length < 10) {
		totalSlide.textContent = `0${slides.length}`
		currentSlide.textContent = `0${slideIndex}`
	} else {
		totalSlide.textContent = slides.length
		currentSlide.textContent = slideIndex
	}

	sliderList.style.width = 100 * slides.length + '%'
	sliderList.style.display = 'flex'
	slider.style.overflow = 'hidden'

	slides.forEach(slide => {
		slide.style.width = width
	})

	function prevSlide() {
		if (offset == 0) {
			offset = +width.slice(0, width.length - 2) * (slides.length - 1)
		} else {
			offset -= +width.slice(0, width.length - 2)
		}

		sliderList.style.transform = `translateX(-${offset}px)`

		if (slideIndex == 1) {
			slideIndex = slides.length
		} else {
			slideIndex--
		}

		if (slides.length < 10) {
			currentSlide.textContent = `0${slideIndex}`
		} else {
			currentSlide.textContent = slideIndex
		}
	}

	function nextSlide() {
		if (offset == +width.slice(0, width.length - 2) * (slides.length - 1)) {
			offset = 0
		} else {
			offset += +width.slice(0, width.length - 2)
		}

		sliderList.style.transform = `translateX(-${offset}px)`

		if (slideIndex == slides.length) {
			slideIndex = 1
		} else {
			slideIndex++
		}

		if (slides.length < 10) {
			currentSlide.textContent = `0${slideIndex}`
		} else {
			currentSlide.textContent = slideIndex
		}
	}

	function startAutoSlide() {
		Interval = setInterval(nextSlide, 1000)
	}

	function stopAutoSlide() {
		clearInterval(Interval)
	}

	prevSlideBtn.addEventListener('click', prevSlide)
	nextSlideBtn.addEventListener('click', prevSlide)

	slider.addEventListener('mousedown', stopAutoSlide)
	slider.addEventListener('mouseup', startAutoSlide)

	startAutoSlide()

	// header nav

	const headerNav = document.querySelectorAll('.header__nav-link')

	headerNav.forEach(link => {
		link.addEventListener('click', () => {
			headerNav.forEach(link => link.classList.remove('active'))
			link.classList.add('active')
		})
	})

})