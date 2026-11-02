// Landing page interactions.
const contactToggle = document.querySelector('[data-sidebar-btn]');
const contactPanel = document.querySelector('[data-sidebar]');

if (contactToggle && contactPanel) {
  contactToggle.setAttribute('aria-expanded', 'false');
  contactToggle.addEventListener('click', () => {
    const expanded = contactPanel.classList.toggle('active');
    contactToggle.setAttribute('aria-expanded', String(expanded));
    const label = contactToggle.querySelector('span');
    if (label) label.textContent = expanded ? 'Hide Contacts' : 'Show Contacts';
  });
}
