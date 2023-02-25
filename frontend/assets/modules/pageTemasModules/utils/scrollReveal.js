export default function scrollReveal () {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      entry.target.classList.toggle('show', entry.isIntersecting)
    })
  },
  {
    rootMargin: '-200px'
  })
  const texties = document.querySelectorAll('.observed')
  texties.forEach((element) => observer.observe(element))
}
