document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-scroll-to]').forEach((el) => {
    el.addEventListener('click', () => {
      const targetId = el.getAttribute('data-scroll-to');
      const target = document.getElementById(targetId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  const form = document.getElementById('offer-form');
  const successPanel = document.getElementById('form-success');

  if (!form) return;

  const validators = {
    'full-name': (value) => value.trim().length > 0 || 'Please enter your name.',
    email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()) || 'Please enter a valid email address.',
    needs: (value) => value.trim().length > 0 || 'Let us know what you need help with.',
  };

  function showError(fieldId, message) {
    const row = document.getElementById(fieldId).closest('.form-row');
    const errorEl = form.querySelector(`[data-error-for="${fieldId}"]`);
    row.classList.add('has-error');
    if (errorEl) errorEl.textContent = message;
  }

  function clearError(fieldId) {
    const row = document.getElementById(fieldId).closest('.form-row');
    const errorEl = form.querySelector(`[data-error-for="${fieldId}"]`);
    row.classList.remove('has-error');
    if (errorEl) errorEl.textContent = '';
  }

  function validateField(fieldId) {
    const field = document.getElementById(fieldId);
    const validate = validators[fieldId];
    if (!validate) return true;
    const result = validate(field.value);
    if (result === true) {
      clearError(fieldId);
      return true;
    }
    showError(fieldId, result);
    return false;
  }

  Object.keys(validators).forEach((fieldId) => {
    const field = document.getElementById(fieldId);
    field.addEventListener('blur', () => validateField(fieldId));
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const fieldIds = Object.keys(validators);
    const results = fieldIds.map(validateField);
    const isValid = results.every(Boolean);

    if (!isValid) return;

    const data = {
      fullName: document.getElementById('full-name').value.trim(),
      email: document.getElementById('email').value.trim(),
      phone: document.getElementById('phone').value.trim(),
      needs: document.getElementById('needs').value.trim(),
    };

    // No backend wired up yet — this mockup just logs the captured lead.
    console.log('Primetime VA offer form submission:', data);

    form.hidden = true;
    successPanel.hidden = false;
    successPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});
