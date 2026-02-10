document.addEventListener("DOMContentLoaded", () => {
  // ================================
  // Bakery Gallery Tab Functionality
  // ================================
  const tabButtons = document.querySelectorAll(".bakery-tab");

  tabButtons.forEach(tab => {
    tab.addEventListener("click", function () {
      const selectedTab = this.getAttribute("data-tab");

      // Deactivate all gallery sections
      document.querySelectorAll(".bakery-gallery-section").forEach(section =>
        section.classList.remove("active")
      );

      // Deactivate all tab buttons
      tabButtons.forEach(t => t.classList.remove("active"));

      // Activate selected gallery section and tab
      const targetSection = document.getElementById(selectedTab);
      if (targetSection) {
        targetSection.classList.add("active");
        this.classList.add("active");
      }
    });
  });

  // ======================
  // Hamburger Menu Toggle
  // ======================
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active");
      navMenu.classList.toggle("active");
    });
  }

  // ========================
  // Back to Top Button Logic
  // ========================
  const backToTopBtn = document.querySelector(".floating-back-to-top");

  if (backToTopBtn) {
    window.addEventListener("scroll", () => {
      backToTopBtn.style.display = window.scrollY > 200 ? "flex" : "none";
    });

    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // =========================
  // Scroll-Linked Timeline UI
  // =========================
  // For .timeline-step
  const timelineSteps = document.querySelectorAll(".timeline-step");
  const timelineBar = document.getElementById("barFill");

  function getActiveTimelineStepIndex() {
    let maxIndex = -1;
    timelineSteps.forEach((step, i) => {
      const rect = step.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.45) {
        maxIndex = i;
      }
    });
    return maxIndex;
  }

  function updateTimeline() {
    const idx = getActiveTimelineStepIndex();

    timelineSteps.forEach((step, i) => {
      step.classList.toggle("active", i === idx);
      step.classList.toggle("completed", i < idx);
    });

    if (idx >= 0 && timelineBar && timelineSteps.length > 0) {
      const container = timelineSteps[0].closest(".timeline-container");
      const startMarker = timelineSteps[0].querySelector(".marker");
      const endMarker = timelineSteps[idx].querySelector(".marker");

      if (container && startMarker && endMarker) {
        const containerRect = container.getBoundingClientRect();
        const startRect = startMarker.getBoundingClientRect();
        const endRect = endMarker.getBoundingClientRect();

        const fillTop = startRect.top + startRect.height / 2 - containerRect.top;
        const fillBottom = endRect.top + endRect.height / 2 - containerRect.top;

        timelineBar.style.height = (fillBottom - fillTop) + "px";
      }
    } else if (timelineBar) {
      timelineBar.style.height = "0";
    }
  }

  window.addEventListener("scroll", updateTimeline);
  window.addEventListener("resize", updateTimeline);

  // Initial setup
  updateTimeline();

  // =========================
  // Scroll-Linked Process Steps UI (optional)
  // =========================
  const processSteps = document.querySelectorAll('.process-step');
  const processBar = document.getElementById('barFill');

  function getActiveProcessStepIndex() {
    let maxIndex = -1;
    processSteps.forEach((step, i) => {
      const rect = step.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.45) {
        maxIndex = i;
      }
    });
    return maxIndex;
  }

  function updateProcessTimeline() {
    const idx = getActiveProcessStepIndex();
    processSteps.forEach((step, i) => {
      step.classList.toggle('active', i === idx);
      step.classList.toggle('completed', i < idx);
    });

    // No bar height update here
  }

  window.addEventListener('scroll', updateProcessTimeline);
  window.addEventListener('resize', updateProcessTimeline);

  // Initial setup for process timeline
  updateProcessTimeline();

});
