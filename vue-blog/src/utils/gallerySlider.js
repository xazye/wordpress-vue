class GallerySlider {
    constructor(el) {
        this.SLIDEACTIVECLASSNAME = 'is-active';
        // prolly need to redo this
        //  caus rn it accepts only one element
        // will need to change the types of the elements
        // or like recreate the whole slider with new elements
        // this would be so much easier with jquery
        // this.slider = wrapAll(this.sliderTarget)
        this.slider = document.querySelector(el)
        this.slider.classList.add('slider-active', 'slider-slides')
        this.slides = [...this.slider.children].map(item => { item.classList.add('slider-slide'); return item });
        this.currentSlide = Math.max(0, this.slides.findIndex(el => el.classList.contains(this.SLIDEACTIVECLASSNAME)))
        this.createNavigation();
        this.setSlide(this.currentSlide)
    }
    createNavigation() {
        this.prevBtn = document.createElement("button")
        this.prevBtn.type = "button"
        this.prevBtn.innerHTML = "previous slide"
        this.prevBtn.classList.add('slider-button', 'slider-button-prev')
        this.prevBtn.addEventListener('click', () => { this.slidePrev() })

        this.nextBtn = document.createElement("button")
        this.nextBtn.type = "button"
        this.nextBtn.innerHTML = "next slide"
        this.nextBtn.classList.add('slider-button', 'slider-button-next')
        this.nextBtn.addEventListener('click', () => { this.slideNext() })

        const nav = document.createElement("div")
        nav.classList.add("slider-nav")
        this.slider.append(this.prevBtn)
        this.slider.append(this.nextBtn)
        this.slider.append(nav)
    }
    slidePrev() {
        this.currentSlide -= 1;
        if (this.currentSlide < 0) {
            this.currentSlide = this.slides.length - 1;
        }
        this.setSlide(this.currentSlide)
    }
    slideNext() {
        this.currentSlide += 1;
        if (this.currentSlide > this.slides.length - 1) {
            this.currentSlide = 0
        }
        this.setSlide(this.currentSlide)
    }
    setSlide(index) {
        this.slides.map(item => item.classList.remove(this.SLIDEACTIVECLASSNAME))
        this.slides[index].classList.add(this.SLIDEACTIVECLASSNAME)
    }
}

export function initSlider() {
    const Slider = new GallerySlider('.wp-block-gallery')
    console.log('slider', Slider.slider)
    console.log('childre', Slider.slides)
    console.log('currentSlide', Slider.currentSlide)
}