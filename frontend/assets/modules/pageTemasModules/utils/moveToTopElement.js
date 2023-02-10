export default function moveToTopElement (el, y = 0) {
  const top = el.getBoundingClientRect().top + window.scrollY - document.querySelector('#nav-menu').offsetHeight + y
  window.scroll({
    top,
    behavior: 'smooth'
  })
}
