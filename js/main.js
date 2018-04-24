(() => {
	const mobileWidth = 680 ;

	const addMenuBackground = () => {
		const pageWidth = window.innerWidth;
		const boddyOffset = document.body.scrollTop || document.documentElement.scrollTop;
		const navigation = document.querySelector(".header-nav");

        if(pageWidth > mobileWidth) {
            boddyOffset > 0 ? navigation.classList.add(".nav-fixed") : navigation.classList.remove(".nav-fixed");
        }
	}

   const reorderResponsiveMenu = () =>{
	 const pageWidth = window.innerWidth;
	 const navContainer = document.querySelector(".header-nav.wrapper");
	 const navigation = document.querySelector(".header-nav.navigation");
	 const mobileNavigation = document.querySelector("body >.navigation");


	 if (pageWidth <= mobileWidth) {

	 document.body.insertAdjacentElement("afterbegin", navigation);
	} else if (pageWidth > mobileWidth && mobileNavigation){
		navContainer.insertAdjacentElement ("beforeend", mobileNavigation );
	}
   }

  const mobileMenuToggle = ()=> {
	const menuToggle = document.querySelector(".nav-toogle");
	menuToggle.addEventListener("click", ()=> {
		const mobileNavigation = document.querySelector("body >.navigation");
		mobileNavigation.classList.toggle("navigation-opened)")
	}
	)}







	const onNavItemClick = () => {
		const navItemList = document.querySelectorAll(".section-link");
		const navItems = [...navItemList];

		navItems.forEach(item => {
			item.addEventListener("click", event => {
				event.preventDefault();

				const sectionId = event.target.getAttribute("href") || event.target.dataset.href;

                scrollToSection(sectionId);
			})
		})
	}

	const scrollToSection = sectionId => {
		let sectionPosition, sectionOffset;
		const navigationHeight = document.querySelector(".header-nav").offsetHeight;
		const pageWidth = window.innerWidth;

		if(sectionId !== "#") {
            sectionOffset = document.querySelector(sectionId).offsetTop;
            sectionPosition = pageWidth > mobileWidth ? sectionOffset - navigationHeight : sectionOffset;
		} else {
            sectionPosition = 0;
		}
        
        window.scrollTo({
        	'behavior': 'smooth',
        	'left': 0,
        	'top': sectionPosition
        })
	}

	const onTestimonialChange = () => {
		let firstChild, lastChild;
        const prevArrow = document.querySelector("#testimonials-prev");
        const nextArrow = document.querySelector("#testimonials-next");
        const testimonials = document.querySelector(".testimonials ul");

        document.addEventListener("click", () => {
        	if(event.target === prevArrow) {
                lastChild = testimonials.lastElementChild;
                testimonials.insertAdjacentElement("afterbegin", lastChild);
        	} else if (event.target === nextArrow) {
                firstChild = testimonials.firstElementChild;
                testimonials.insertAdjacentElement("beforeend", firstChild);
        	}
        })
	}

	const onGalleryImageClick = () => {
        const galleryImageList = document.querySelectorAll("#gallery li");
        const galleryImages = [...galleryImageList];

        galleryImages.forEach(image => {
        	image.addEventListener("click", event => {
        		galleryImageOpen(event.target);
        	})
        })
	}

	const galleryImageOpen = image => {
		const imageSrc = image.getAttribute("src");
		const openedImage = `<div class='backdrop'><img src='${imageSrc}' alt='' />
		<span class="backdrop-close">X</span></div>`;

		document.body.insertAdjacentHTML("beforeend", openedImage);
		galleryImageClose();
	}

	const galleryImageClose = () => {
		const closeButton = document.querySelector(".backdrop-close");

		closeButton.addEventListener("click", () => {
			const backdrop = document.querySelector(".backdrop");
			backdrop.remove();
		})
	}

	window.addEventListener("scroll", () => {
		addMenuBackground();
	})

	window.addEventListener("resize", () => {
		reorderResponsiveMenu();
	})

    reorderResponsiveMenu();
	onNavItemClick();
	mobileMenuToggle();
	onTestimonialChange();
	onGalleryImageClick();

})();