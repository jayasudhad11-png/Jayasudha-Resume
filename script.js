/**
 * D. JAYASUDHA - PERSONAL PROFILE WEBSITE
 * Vanilla JavaScript (No frameworks, beginner friendly)
 */

function initApp() {
  // -------------------------------------------------------------
  // 1. ANIMATED LOADING SCREEN
  // -------------------------------------------------------------
  const loadingScreen = document.getElementById('loading-screen');
  const progressBar = document.getElementById('loading-progress-bar');
  const progressPercentText = document.getElementById('loading-percentage-text');
  const loadingStepPhrase = document.getElementById('loading-step-phrase');
  const skipBtn = document.getElementById('skip-intro-btn');
  const replayBtn = document.getElementById('replay-intro-btn');

  const loadingPhrases = [
    { min: 0, max: 20, text: '💻 Booting Computer Science & Engineering System...' },
    { min: 21, max: 42, text: '📚 Scanning Academic Books, Theory & Lab Manuals...' },
    { min: 43, max: 64, text: '🎓 Calibrating Degree Cap (95% Diploma CSE Honors)...' },
    { min: 65, max: 85, text: '⚡ Compiling Core Technical Skills (Python, C, SQL)...' },
    { min: 86, max: 99, text: '✨ Rendering D. Jayasudha\'s Visual Portfolio...' },
    { min: 100, max: 100, text: '🚀 Systems Online! Welcome to Profile!' }
  ];

  let loadInterval;

  function runLoadingAnimation() {
    if (!loadingScreen) return;
    
    // Show screen
    loadingScreen.classList.remove('hidden');
    let progress = 0;
    if (progressBar) progressBar.style.width = '0%';
    if (progressPercentText) progressPercentText.textContent = '0%';
    if (loadingStepPhrase) loadingStepPhrase.textContent = loadingPhrases[0].text;

    clearInterval(loadInterval);
    loadInterval = setInterval(() => {
      // Medium slow realistic tech boot cadence (~3.8 to 4.2 seconds total)
      progress += Math.floor(Math.random() * 2) + 1;
      if (progress > 100) progress = 100;

      if (progressBar) progressBar.style.width = progress + '%';
      if (progressPercentText) progressPercentText.textContent = progress + '%';

      if (loadingStepPhrase) {
        const matchingPhrase = loadingPhrases.find(p => progress >= p.min && progress <= p.max);
        if (matchingPhrase) {
          loadingStepPhrase.textContent = matchingPhrase.text;
        }
      }

      if (progress >= 100) {
        clearInterval(loadInterval);
        setTimeout(() => {
          loadingScreen.classList.add('hidden');
        }, 700);
      }
    }, 60);
  }

  // Initial load execution
  runLoadingAnimation();

  // Skip button click
  if (skipBtn) {
    skipBtn.addEventListener('click', () => {
      clearInterval(loadInterval);
      if (loadingScreen) loadingScreen.classList.add('hidden');
    });
  }

  // Replay button in navbar
  if (replayBtn) {
    replayBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      runLoadingAnimation();
    });
  }

  // -------------------------------------------------------------
  // 2. RESUME VIEW / DOWNLOAD MODAL & FILE ATTACHMENTS
  // -------------------------------------------------------------
  const modalOverlay = document.getElementById('resume-modal');
  const openModalBtns = document.querySelectorAll('.open-resume-modal');
  const closeModalBtn = document.getElementById('close-resume-modal');
  const modalDownloadBtn = document.getElementById('modal-download-btn');
  const modalViewTabBtn = document.getElementById('modal-view-tab-btn');
  const modalPrintBtn = document.getElementById('modal-print-btn');
  const modalToggleUploadBtn = document.getElementById('modal-toggle-upload-btn');
  const modalUploadContainer = document.getElementById('modal-upload-container');
  const dropzone = document.getElementById('resume-upload-dropzone');
  const fileInput = document.getElementById('resume-file-input');
  const uploadStatusPill = document.getElementById('upload-status-pill');
  const activeFilenameElem = document.getElementById('modal-active-filename');
  const pdfIframe = document.getElementById('modal-pdf-iframe');

  const tabVisualView = document.getElementById('tab-visual-view');
  const tabEmbedView = document.getElementById('tab-embed-view');
  const viewVisualContainer = document.getElementById('view-visual-container');
  const viewEmbedContainer = document.getElementById('view-embed-container');

  function openModal() {
    if (modalOverlay) {
      modalOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeModal() {
    if (modalOverlay) {
      modalOverlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  openModalBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal();
    });
  });

  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', closeModal);
  }

  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        closeModal();
      }
    });
  }

  // Esc key closes modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal();
    }
  });

  // Modal Tabs (Visual Pages vs PDF Reader)
  if (tabVisualView && tabEmbedView) {
    tabVisualView.addEventListener('click', () => {
      tabVisualView.classList.add('active');
      tabEmbedView.classList.remove('active');
      if (viewVisualContainer) viewVisualContainer.classList.remove('hidden');
      if (viewEmbedContainer) viewEmbedContainer.classList.add('hidden');
    });

    tabEmbedView.addEventListener('click', () => {
      tabEmbedView.classList.add('active');
      tabVisualView.classList.remove('active');
      if (viewEmbedContainer) viewEmbedContainer.classList.remove('hidden');
      if (viewVisualContainer) viewVisualContainer.classList.add('hidden');
    });
  }

  // Print button
  if (modalPrintBtn) {
    modalPrintBtn.addEventListener('click', () => {
      if (pdfIframe && pdfIframe.contentWindow) {
        try {
          pdfIframe.contentWindow.focus();
          pdfIframe.contentWindow.print();
          return;
        } catch (err) {
          // If cross-origin or restricted in iframe, fallback to window.open print
        }
      }
      const printWindow = window.open('resume.pdf', '_blank');
      if (printWindow) {
        printWindow.addEventListener('load', () => {
          printWindow.print();
        });
      }
    });
  }

  // Toggle Upload Container
  if (modalToggleUploadBtn && modalUploadContainer) {
    modalToggleUploadBtn.addEventListener('click', () => {
      modalUploadContainer.classList.toggle('hidden');
    });
  }

  // Handle PDF file attachment via Dropzone or File Input
  let attachedPdfUrl = null;

  function handleAttachedPdf(file) {
    if (!file) return;

    if (file.type && file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
      if (uploadStatusPill) {
        uploadStatusPill.className = 'upload-status-pill';
        uploadStatusPill.style.background = '#fee2e2';
        uploadStatusPill.style.color = '#dc2626';
        uploadStatusPill.style.borderColor = '#fecaca';
        uploadStatusPill.innerHTML = '⚠️ Please select a valid PDF file (.pdf)';
        uploadStatusPill.classList.remove('hidden');
      }
      return;
    }

    if (attachedPdfUrl) {
      URL.revokeObjectURL(attachedPdfUrl);
    }

    attachedPdfUrl = URL.createObjectURL(file);

    // Update active filename display
    if (activeFilenameElem) {
      activeFilenameElem.textContent = file.name;
    }

    // Update download and view tab buttons
    if (modalDownloadBtn) {
      modalDownloadBtn.href = attachedPdfUrl;
      modalDownloadBtn.download = file.name;
    }

    if (modalViewTabBtn) {
      modalViewTabBtn.href = attachedPdfUrl;
    }

    // Update embedded iframe
    if (pdfIframe) {
      pdfIframe.src = attachedPdfUrl;
    }

    // Switch to embedded PDF tab automatically to view attached file
    if (tabEmbedView) {
      tabEmbedView.click();
    }

    // Show status message
    if (uploadStatusPill) {
      uploadStatusPill.className = 'upload-status-pill';
      uploadStatusPill.style.background = '#dcfce7';
      uploadStatusPill.style.color = '#166534';
      uploadStatusPill.style.borderColor = '#bbf7d0';
      uploadStatusPill.innerHTML = `✅ Successfully attached <strong>${file.name}</strong> (${(file.size / 1024).toFixed(1)} KB)! All resume requirements loaded.`;
      uploadStatusPill.classList.remove('hidden');
    }
  }

  if (fileInput) {
    fileInput.addEventListener('change', (e) => {
      if (e.target.files && e.target.files[0]) {
        handleAttachedPdf(e.target.files[0]);
      }
    });
  }

  if (dropzone) {
    ['dragenter', 'dragover'].forEach(eventName => {
      dropzone.addEventListener(eventName, (e) => {
        e.preventDefault();
        e.stopPropagation();
        dropzone.classList.add('dragover');
      });
    });

    ['dragleave', 'drop'].forEach(eventName => {
      dropzone.addEventListener(eventName, (e) => {
        e.preventDefault();
        e.stopPropagation();
        dropzone.classList.remove('dragover');
      });
    });

    dropzone.addEventListener('drop', (e) => {
      if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0]) {
        handleAttachedPdf(e.dataTransfer.files[0]);
      }
    });
  }

  // -------------------------------------------------------------
  // 4. COPY CONTACT QUICK ACTION (EMAIL / PHONE)
  // -------------------------------------------------------------
  const copyEmailBtn = document.getElementById('copy-email-btn');
  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const email = 'jayasudhad19510057@gmail.com';
      navigator.clipboard.writeText(email).then(() => {
        const originalText = copyEmailBtn.innerHTML;
        copyEmailBtn.innerHTML = '<span>✓ Copied!</span>';
        setTimeout(() => {
          copyEmailBtn.innerHTML = originalText;
        }, 2000);
      });
    });
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
