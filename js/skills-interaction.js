const iconFaces = document.querySelectorAll(".orbit-inner .icon-face");

let angle = 0;

function animateInnerIcons() {

    angle -= 0.5;

    iconFaces.forEach(icon => {
        icon.style.transform = `rotate(${-angle}deg)`;
    });

    requestAnimationFrame(animateInnerIcons);
}

animateInnerIcons();