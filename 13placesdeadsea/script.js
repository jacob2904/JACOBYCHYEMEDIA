(() => {
  const toast = document.getElementById('toast');
  const dialog = document.getElementById('copy-fallback');
  const field = document.getElementById('copy-value');
  let toastTimer;

  function showToast(message) {
    toast.textContent = message;
    toast.classList.add('show');
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => toast.classList.remove('show'), 2200);
  }

  function legacyCopy(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'fixed';
    textarea.style.top = '-9999px';
    const previousFocus = document.activeElement;
    document.body.appendChild(textarea);
    try {
      textarea.focus();
      textarea.select();
      return document.execCommand('copy');
    } finally {
      textarea.remove();
      previousFocus?.focus();
    }
  }

  async function copyText(text) {
    if (!text?.trim()) return;
    try {
      let copied = false;
      if (navigator.clipboard && window.isSecureContext) {
        try {
          await navigator.clipboard.writeText(text);
          copied = true;
        } catch { /* Try the fallback when clipboard permissions are denied. */ }
      }
      if (!copied) copied = legacyCopy(text);
      if (!copied) throw new Error('Clipboard unavailable');
      showToast('הועתק בהצלחה');
    } catch {
      field.value = text;
      dialog.showModal();
      field.focus();
      field.select();
    }
  }

  document.addEventListener('click', (event) => {
    const button = event.target.closest('[data-copy], [data-copy-all]');
    if (!button) return;
    const text = button.hasAttribute('data-copy-all')
      ? '13 מקומות בים המלח | Jacob Ychye\nההליכה על אחריותכם. ים המלח משתנה; קראו את פרטי המיקומים לפני ההגעה.\nhttps://jacobychye.com/13placesdeadsea/\n\n' +
        [...document.querySelectorAll('.copy-all-location')]
          .map((item) => item.getAttribute('data-copy')).join('\n\n')
      : button.getAttribute('data-copy');
    copyText(text);
  });

  document.getElementById('place-select').addEventListener('change', (event) => {
    const target = document.getElementById(event.target.value);
    if (!target) return;
    target.scrollIntoView();
    const heading = target.querySelector('h2');
    heading.setAttribute('tabindex', '-1');
    heading.focus({ preventScroll: true });
  });
})();
