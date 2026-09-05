/* =========================================================
   GAMING HUB — INTERACTIVE JAVASCRIPT
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =======================================================
     LOADER
  ======================================================= */

  const loader = document.getElementById("loader");

  window.addEventListener("load", () => {

    setTimeout(() => {

      if (loader) {
        loader.classList.add("hidden");
      }

    }, 900);

  });


  /* =======================================================
     NAVBAR SCROLL EFFECT
  ======================================================= */

  const navbar = document.querySelector(".navbar");

  function updateNavbar() {

    if (!navbar) return;

    if (window.scrollY > 80) {

      navbar.style.background =
        "rgba(5,5,5,0.88)";

      navbar.style.height = "75px";

    } else {

      navbar.style.background =
        "rgba(5,5,5,0.58)";

      navbar.style.height = "90px";

    }

  }

  window.addEventListener(
    "scroll",
    updateNavbar,
    { passive: true }
  );

  updateNavbar();


  /* =======================================================
     SCROLL REVEAL
  ======================================================= */

  const revealElements = document.querySelectorAll(
    ".section, .feature-card, .game-row, .cafe-card, .stat, .visual-card"
  );

  const revealObserver = new IntersectionObserver(
    (entries) => {

      entries.forEach((entry) => {

        if (entry.isIntersecting) {

          entry.target.style.opacity = "1";

          entry.target.style.transform =
            "translateY(0)";

          revealObserver.unobserve(entry.target);

        }

      });

    },
    {
      threshold: 0.12
    }
  );


  revealElements.forEach((element) => {

    element.style.opacity = "0";

    element.style.transform =
      "translateY(45px)";

    element.style.transition =
      "opacity 0.9s ease, transform 0.9s cubic-bezier(.2,.8,.2,1)";

    revealObserver.observe(element);

  });


  /* =======================================================
     STAGGER FEATURE CARDS
  ======================================================= */

  document.querySelectorAll(".feature-card")
    .forEach((card, index) => {

      card.style.transitionDelay =
        `${index * 80}ms`;

    });


  /* =======================================================
     GAME ROW HOVER
  ======================================================= */

  const gameRows =
    document.querySelectorAll(".game-row");

  gameRows.forEach((row) => {

    row.addEventListener("mouseenter", () => {

      row.style.zIndex = "5";

    });

    row.addEventListener("mouseleave", () => {

      row.style.zIndex = "1";

    });

  });


  /* =======================================================
     MOUSE GLOW
  ======================================================= */

  const mouseGlow =
    document.createElement("div");

  mouseGlow.className =
    "mouse-glow";

  document.body.appendChild(mouseGlow);


  const glowStyle =
    document.createElement("style");

  glowStyle.innerHTML = `

    .mouse-glow {
      position: fixed;

      width: 300px;
      height: 300px;

      border-radius: 50%;

      pointer-events: none;

      z-index: 1;

      transform:
        translate(-50%, -50%);

      background:
        radial-gradient(
          circle,
          rgba(255,20,147,0.10),
          rgba(139,44,255,0.05),
          transparent 70%
        );

      filter: blur(25px);

      opacity: 0;

      transition: opacity 0.4s ease;

    }

    @media (max-width: 700px) {

      .mouse-glow {
        display: none;
      }

    }

  `;

  document.head.appendChild(glowStyle);


  document.addEventListener(
    "mousemove",
    (event) => {

      mouseGlow.style.left =
        `${event.clientX}px`;

      mouseGlow.style.top =
        `${event.clientY}px`;

      mouseGlow.style.opacity = "1";

    }
  );


  /* =======================================================
     PARALLAX HERO
  ======================================================= */

  const heroMedia =
    document.querySelector(".hero-media");

  const heroBackground =
    document.querySelector(".hero-background");


  window.addEventListener(
    "scroll",
    () => {

      const scroll =
        window.scrollY;

      if (heroMedia && scroll < window.innerHeight) {

        heroMedia.style.transform =
          `translateY(${scroll * 0.12}px) rotate(3deg)`;

      }

      if (heroBackground && scroll < window.innerHeight) {

        heroBackground.style.transform =
          `translateY(${scroll * 0.08}px)`;

      }

    },
    { passive: true }
  );


  /* =======================================================
     DYNAMIC NEON BACKGROUND
  ======================================================= */

  let ticking = false;


  window.addEventListener(
    "scroll",
    () => {

      if (!ticking) {

        window.requestAnimationFrame(() => {

          const scroll =
            window.scrollY;

          const hue =
            Math.min(
              scroll / 15,
              35
            );

          document.body.style.setProperty(
            "--scroll-hue",
            `${hue}deg`
          );

          ticking = false;

        });

        ticking = true;

      }

    },
    { passive: true }
  );


  /* =======================================================
     3D TILT — FEATURE CARDS
  ======================================================= */

  const cards =
    document.querySelectorAll(
      ".feature-card, .cafe-card"
    );


  cards.forEach((card) => {

    card.addEventListener(
      "mousemove",
      (event) => {

        if (window.innerWidth < 700)
          return;

        const rect =
          card.getBoundingClientRect();

        const x =
          event.clientX - rect.left;

        const y =
          event.clientY - rect.top;

        const centerX =
          rect.width / 2;

        const centerY =
          rect.height / 2;

        const rotateX =
          ((y - centerY) / centerY) * -4;

        const rotateY =
          ((x - centerX) / centerX) * 4;

        card.style.transform =
          `perspective(800px)
           rotateX(${rotateX}deg)
           rotateY(${rotateY}deg)
           translateY(-8px)`;

      }
    );


    card.addEventListener(
      "mouseleave",
      () => {

        card.style.transform =
          "";

      }
    );

  });


  /* =======================================================
     SMOOTH ANCHOR SCROLL
  ======================================================= */

  document.querySelectorAll(
    'a[href^="#"]'
  ).forEach((link) => {

    link.addEventListener(
      "click",
      (event) => {

        const target =
          document.querySelector(
            link.getAttribute("href")
          );

        if (!target) return;

        event.preventDefault();

        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });

      }
    );

  });


  /* =======================================================
     CURSOR EFFECT
  ======================================================= */

  const cursor =
    document.createElement("div");

  cursor.className =
    "custom-cursor";

  const cursorRing =
    document.createElement("div");

  cursorRing.className =
    "custom-cursor-ring";


  document.body.appendChild(cursor);
  document.body.appendChild(cursorRing);


  const cursorCSS =
    document.createElement("style");

  cursorCSS.innerHTML = `

    .custom-cursor {
      position: fixed;

      width: 6px;
      height: 6px;

      border-radius: 50%;

      background: white;

      pointer-events: none;

      z-index: 999999;

      transform:
        translate(-50%, -50%);

      mix-blend-mode: difference;

    }


    .custom-cursor-ring {
      position: fixed;

      width: 35px;
      height: 35px;

      border-radius: 50%;

      border: 1px solid
        rgba(255,255,255,0.45);

      pointer-events: none;

      z-index: 999998;

      transform:
        translate(-50%, -50%);

      transition:
        width 0.25s ease,
        height 0.25s ease,
        border-color 0.25s ease;

    }


    .cursor-hover
    .custom-cursor-ring {

      width: 65px;
      height: 65px;

      border-color:
        rgba(255,20,147,0.8);

    }


    @media (max-width: 700px) {

      .custom-cursor,
      .custom-cursor-ring {
        display: none;
      }

    }

  `;

  document.head.appendChild(cursorCSS);


  let cursorX = 0;
  let cursorY = 0;

  let ringX = 0;
  let ringY = 0;


  document.addEventListener(
    "mousemove",
    (event) => {

      cursorX =
        event.clientX;

      cursorY =
        event.clientY;

      cursor.style.left =
        `${cursorX}px`;

      cursor.style.top =
        `${cursorY}px`;

    }
  );


  function animateCursor() {

    ringX +=
      (cursorX - ringX) * 0.15;

    ringY +=
      (cursorY - ringY) * 0.15;

    cursorRing.style.left =
      `${ringX}px`;

    cursorRing.style.top =
      `${ringY}px`;

    requestAnimationFrame(
      animateCursor
    );

  }

  animateCursor();


  /* =======================================================
     CURSOR HOVER TARGETS
  ======================================================= */

  document.querySelectorAll(
    "a, .feature-card, .game-row, .cafe-card, .btn"
  ).forEach((element) => {

    element.addEventListener(
      "mouseenter",
      () => {

        document.body.classList.add(
          "cursor-hover"
        );

      }
    );


    element.addEventListener(
      "mouseleave",
      () => {

        document.body.classList.remove(
          "cursor-hover"
        );

      }
    );

  });


  /* =======================================================
     HERO TEXT MOUSE PARALLAX
  ======================================================= */

  const heroTitle =
    document.querySelector(".hero-title");


  document.addEventListener(
    "mousemove",
    (event) => {

      if (
        !heroTitle ||
        window.innerWidth < 800
      ) return;

      const x =
        (event.clientX / window.innerWidth - 0.5);

      const y =
        (event.clientY / window.innerHeight - 0.5);

      heroTitle.style.transform =
        `translate(
          ${x * 8}px,
          ${y * 8}px
        )`;

    }
  );


  /* =======================================================
     RANDOM NEON COLOR SHIFT
  ======================================================= */

  const neonColors = [
    "#ff1493",
    "#ff2fa4",
    "#d629ff",
    "#8b2cff",
    "#6633ff"
  ];

  let colorIndex = 0;


  setInterval(() => {

    colorIndex =
      (colorIndex + 1)
      % neonColors.length;

    document.documentElement.style.setProperty(
      "--pink",
      neonColors[colorIndex]
    );

  }, 5000);


  /* =======================================================
     IMAGE PLACEHOLDER HOVER LIGHT
  ======================================================= */

  document.querySelectorAll(
    ".image-placeholder, .media-placeholder"
  ).forEach((element) => {

    element.addEventListener(
      "mousemove",
      (event) => {

        const rect =
          element.getBoundingClientRect();

        const x =
          ((event.clientX - rect.left) /
          rect.width) * 100;

        const y =
          ((event.clientY - rect.top) /
          rect.height) * 100;

        element.style.background = `

          radial-gradient(
            circle at ${x}% ${y}%,
            rgba(255,20,147,0.24),
            transparent 45%
          ),

          #0d0d0d

        `;

      }
    );


    element.addEventListener(
      "mouseleave",
      () => {

        element.style.background = "";

      }
    );

  });


  /* =======================================================
     CONSOLE
  ======================================================= */

  console.log(
    "%c GAMING HUB ",
    "background:#ff1493;color:white;font-size:20px;padding:10px;"
  );

  console.log(
    "Play. Compete. Repeat."
  );

});