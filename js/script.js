/*================================================
 HAMBURGER MENU
================================================*/ 
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const icon = menuToggle.querySelector("i");

function closeMobileMenu() {
    navLinks.classList.remove("active");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
    icon.classList.remove("fa-xmark");
    icon.classList.add("fa-bars");
}

menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");

    if(navLinks.classList.contains("active")){
        menuToggle.setAttribute("aria-expanded", "true");
        menuToggle.setAttribute("aria-label", "Close navigation menu");
        icon.classList.remove("fa-bars");
        icon.classList.add("fa-xmark");
    }else{
        closeMobileMenu();
    }
});

navLinks.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", closeMobileMenu);
});

document.addEventListener("keydown", event => {
    if (event.key === "Escape" && navLinks.classList.contains("active")) {
        closeMobileMenu();
        menuToggle.focus();
    }
});

document.addEventListener("click", event => {
    if (
        navLinks.classList.contains("active") &&
        !navLinks.contains(event.target) &&
        !menuToggle.contains(event.target)
    ) {
        closeMobileMenu();
    }
});
/* ==========================================
   PROJECT SCROLL ANIMATION
========================================== */

const projectCards = document.querySelectorAll(".project-card");
const projectObserver = new IntersectionObserver((entries) => {

    entries.forEach(entry => {
        if(entry.isIntersecting){
            entry.target.classList.add("show");
        }
    });
},{

    threshold:0.2

});

projectCards.forEach(card => {
    projectObserver.observe(card);

});
function showProjectImage(thumb, src) {
    document.getElementById('projectMainImage').src = src;
    document.querySelectorAll('.gallery-thumbs .thumb').forEach(t => t.classList.remove('active'));
    thumb.classList.add('active');
}
/* ==========================================
   tap to expand for ipad only 1200px
========================================== */
const contactBoxes = document.querySelectorAll(".contact-box");

contactBoxes.forEach(box => {
    box.addEventListener("click", (e) => {
        e.stopPropagation();

        contactBoxes.forEach(item => {
            if (item !== box) {
                item.classList.remove("active");
            }
        });

        box.classList.toggle("active");
    });
});

// Close kung mo-click sa bisan asa sa page
document.addEventListener("click", () => {
    contactBoxes.forEach(box => {
        box.classList.remove("active");
    });
});
/* ==============================================
   CONTACT FORM
============================================== */

console.log("Contact JS Loaded");

const form = document.getElementById("contact-form");
const submitBtn = document.getElementById("submit-btn");
const aiPopup = document.getElementById("ai-popup");
const aiClose = document.getElementById("ai-close");

const tapSound = document.getElementById("tapSound");
const clickSound = document.getElementById("clickSound");
const cardOpenSound = document.getElementById("cardOpenSound");
const popupSound = document.getElementById("popupSound");
const robotOff = document.getElementById("robotOff");

const speech = document.querySelector(".typing-text");

const message =
`Thank you! 
I'll reply as soon as possible.`;

let index = 0;

function typeSpeech(){

    speech.innerHTML = "";
    index = 0;

    aiClose.classList.remove("ready");

    const typing = setInterval(() => {

        speech.innerHTML += message.charAt(index);

        index++;

        if(index >= message.length){

            clearInterval(typing);
    
    aiClose.classList.add("ready");        

        }

    },40);

}

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    cardOpenSound.currentTime = 0;
    cardOpenSound.play();

    submitBtn.disabled = true;

    submitBtn.innerHTML =
    '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';

        try{

        const result = await emailjs.sendForm(
            "service_z6u05aa",
            "template_be2lttc",
            form
        );

        if(result.status === 200){

            form.reset();
            
              // Google Analytics - track form submission
                gtag('event', 'generate_lead', {
                    'event_category': 'Contact Form',
                    'event_label': 'Request a Free Quote'
                });
                    
              // Play send sound immediately
               cardOpenSound.currentTime = 0;
               cardOpenSound.play();

             // Popup appears
               setTimeout(() => {

               aiPopup.classList.add("show");

               }, 700);

             // Robot startup sound
               setTimeout(() => {

              popupSound.currentTime = 0;
              popupSound.play();

              }, 1200);

             // Typing starts
              setTimeout(() => {

              typeSpeech();

              }, 1900);
            


        }else{

            alert("❌ Failed to send message. Please try again.");

        }

    }catch(error){

        console.error(error);

        alert("🌐 Network Error. Please check your internet connection.");

    }

    submitBtn.disabled = false;

    submitBtn.innerHTML =
    '<i class="fa-solid fa-paper-plane"></i> Request a Free Quote';

});

aiClose.addEventListener("click", () => {

    robotOff.currentTime = 0;
    robotOff.play();

    setTimeout(() => {

        aiPopup.classList.remove("show");

    },300);

});

/* ==============================================
   UI CLICK SOUND FOR NAV BAR
============================================== */

document.querySelectorAll(
'button, nav a, .hero-contact a, .social-links a, .project-card, .project-btn'
).forEach(element => {

    element.addEventListener("click", () => {

        clickSound.currentTime = 0;
        clickSound.play();

    });

});
/* ==============================================
   UI CLICK SOUND FOR HERO CONTACT
============================================== */
document.querySelectorAll(".hero-contact a, .hire-btn, .hero-buttons").forEach(link => {

    link.addEventListener("click", () => {

        tapSound.currentTime = 0;
        tapSound.play();

    });

});
/* ==============================================
   WORKFLOW CARD CLICK EFFECTS
============================================== */
const workflowCards = document.querySelectorAll(".workflow-card");

workflowCards.forEach((card) => {

    card.addEventListener("click", () => {

        // Tangtangon ang glow sa tanan cards
        workflowCards.forEach((c) => {
            c.classList.remove("active-card");
        });

        // Ibutang ang glow sa gi-click
        card.classList.add("active-card");

    });

});
