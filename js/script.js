document.addEventListener("DOMContentLoaded", () => {
  // --- Global Selectors ---
  const body = document.body;
  const themeToggle = document.getElementById("theme-toggle");
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.querySelector(".nav-links");
  const yearContainer = document.getElementById("year-node");

  // --- Themes Initialization & Management ---
  const savedTheme =
    localStorage.getItem("theme") ||
    (window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light");

  body.setAttribute("data-theme", savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const currentActive = body.getAttribute("data-theme");
      const targetTheme = currentActive === "dark" ? "light" : "dark";
      body.setAttribute("data-theme", targetTheme);
      localStorage.setItem("theme", targetTheme);
    });
  }

  // --- Responsive Mobile Menu Drawer Controller ---
  if (hamburger && navLinks) {
    hamburger.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      console.log("Menu state toggle triggered!");

      body.classList.toggle("menu-is-active");

      if (body.classList.contains("menu-is-active")) {
        body.style.overflow = "hidden";
      } else {
        body.style.overflow = "auto";
      }
    });
  }

  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
      body.classList.remove("menu-is-active");
      body.style.overflow = "auto";
    });
  });

  // --- Dynamic Footer Calendar Date Node ---
  if (yearContainer) {
    yearContainer.textContent = new Date().getFullYear();
  }

  // --- FAQ Accordion Component Setup ---
  const faqItems = document.querySelectorAll(".faq-accordion-item");
  faqItems.forEach((item) => {
    const trigger = item.querySelector(".accordion-trigger");
    const panel = item.querySelector(".accordion-content-panel");

    if (trigger && panel) {
      trigger.addEventListener("click", (e) => {
        e.preventDefault();
        const isOpen = item.classList.contains("is-open");

        // Close alternative nodes
        faqItems.forEach((otherItem) => {
          if (otherItem !== item) {
            otherItem.classList.remove("is-open");
            const otherPanel = otherItem.querySelector(
              ".accordion-content-panel",
            );
            const otherTrigger = otherItem.querySelector(".accordion-trigger");
            if (otherPanel) otherPanel.style.maxHeight = null;
            if (otherTrigger)
              otherTrigger.setAttribute("aria-expanded", "false");
          }
        });

        if (isOpen) {
          item.classList.remove("is-open");
          panel.style.maxHeight = null;
          trigger.setAttribute("aria-expanded", "false");
        } else {
          item.classList.add("is-open");
          panel.style.maxHeight = panel.scrollHeight + "px";
          trigger.setAttribute("aria-expanded", "true");
        }
      });
    }
  });
});

// --- Global Helper Calculation Utilities (Available Globally) ---
function getProficiency(percent) {
  if (percent < 50) return "Beginner";
  if (percent <= 85) return "Intermediate";
  return "Industry Expert";
}

// --- Heavy-Duty Knowledge Base System Engine ---
window.addEventListener("load", () => {
  const searchField = document.getElementById("kb-search-input");
  const kbAccordionItems = document.querySelectorAll(".kb-accordion-item");
  const fallbackAlert = document.getElementById("search-fallback-message");
  const categoryButtons = document.querySelectorAll(
    ".sidebar-category-btn:not(#clear-filters-btn)",
  );
  const clearButton = document.getElementById("clear-filters-btn");

  if (!kbAccordionItems.length) return;

  // --- Search Filtering Logic ---
  function executeLiveSearchFilter(filterValue) {
    const queryText = filterValue.toLowerCase().trim();
    let matchingArticlesCount = 0;

    kbAccordionItems.forEach((item) => {
      const category = item
        .querySelector(".article-category-tag")
        .textContent.toLowerCase();
      const question = item
        .querySelector(".article-question")
        .textContent.toLowerCase();
      const bodyText = item
        .querySelector(".kb-accordion-inner-text")
        .textContent.toLowerCase();

      if (
        category.includes(queryText) ||
        question.includes(queryText) ||
        bodyText.includes(queryText)
      ) {
        item.style.display = "";
        matchingArticlesCount++;
      } else {
        item.style.display = "none";
        item.classList.remove("is-open");
        const panel = item.querySelector(".kb-accordion-content-panel");
        if (panel) panel.style.maxHeight = null;
      }
    });

    if (fallbackAlert) {
      fallbackAlert.style.display =
        matchingArticlesCount === 0 && queryText !== "" ? "block" : "none";
    }
  }

  // --- Input Field Key Tracking Listener ---
  if (searchField) {
    searchField.addEventListener("input", (e) => {
      categoryButtons.forEach((btn) => btn.classList.remove("is-active"));

      kbAccordionItems.forEach((item) => {
        item.classList.remove("is-open");
        const panel = item.querySelector(".kb-accordion-content-panel");
        if (panel) panel.style.maxHeight = null;
      });

      executeLiveSearchFilter(e.target.value);
    });
  }

  // --- Sidebar Category Button tracking loops ---
  categoryButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const chosenTag = button.getAttribute("data-tag");
      categoryButtons.forEach((btn) => btn.classList.remove("is-active"));
      button.classList.add("is-active");

      if (searchField) {
        searchField.value = chosenTag;
      }
      executeLiveSearchFilter(chosenTag);
    });
  });

  // --- Clear filters button operation click listener ---
  if (clearButton) {
    clearButton.addEventListener("click", () => {
      categoryButtons.forEach((btn) => btn.classList.remove("is-active"));
      if (searchField) searchField.value = "";
      executeLiveSearchFilter("");
    });
  }

  // --- Global Inbound Search Routing Parameter Linkage ---
  const urlParams = new URLSearchParams(window.location.search);
  const passedQuery = urlParams.get("query");
  if (passedQuery && searchField) {
    searchField.value = passedQuery;
    executeLiveSearchFilter(passedQuery);
  }

  // ==========================================
  // Global Navbar Search
  // ==========================================
  const globalSearchField = document.getElementById("global-site-search");
  if (globalSearchField && passedQuery) {
    globalSearchField.value = passedQuery;
  }

  kbAccordionItems.forEach((item) => {
    const trigger = item.querySelector(".kb-accordion-trigger");
    const panel = item.querySelector(".kb-accordion-content-panel");

    if (trigger && panel) {
      trigger.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();

        const isOpen = item.classList.contains("is-open");

        kbAccordionItems.forEach((otherItem) => {
          if (otherItem !== item) {
            otherItem.classList.remove("is-open");
          }
        });

        if (isOpen) {
          item.classList.remove("is-open");
          trigger.setAttribute("aria-expanded", "false");
        } else {
          item.classList.add("is-open");
          trigger.setAttribute("aria-expanded", "true");
        }
      });
    }
  });
});

// ==========================================================================
//  Swiper Carousel Controller
// ==========================================================================
window.addEventListener("load", () => {
  if (
    !document.querySelector(".project-slider") &&
    !document.querySelector(".blog-slider") &&
    !document.querySelector(".service-slider") &&
    !document.querySelector(".detail-services-slider") &&
    !document.querySelector(".blog-carousel-slider")
  )
    return;

  try {
    Swiper.use([Swiper.Navigation, Swiper.Pagination, Swiper.Autoplay]);

    const sharedCarouselConfigs = {
      loop: true,
      slidesPerView: 1,
      spaceBetween: 25,

      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      },

      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },

      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },

      breakpoints: {
        650: { slidesPerView: 2 },
        950: { slidesPerView: 3 },
      },
    };

    if (document.querySelector(".project-slider")) {
      new Swiper(".project-slider", sharedCarouselConfigs);
    }
    if (document.querySelector(".blog-slider")) {
      new Swiper(".blog-slider", sharedCarouselConfigs);
    }
    if (document.querySelector(".service-slider")) {
      new Swiper(".service-slider", sharedCarouselConfigs);
    }
    if (document.querySelector(".detail-services-slider")) {
      new Swiper(".detail-services-slider", sharedCarouselConfigs);
    }
    if (document.querySelector(".blog-carousel-slider")) {
      new Swiper(".blog-carousel-slider", sharedCarouselConfigs);
    }
    console.log(
      "Swiper Modules integrated successfully! Autoplay and arrow clicks operational.",
    );
  } catch (error) {
    console.error(
      "Swiper initialization failed due to engine module locks:",
      error,
    );
  }
});
