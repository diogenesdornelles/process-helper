export default function addObserverTr () {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      entry.target.classList.toggle('show-tr-table', entry.isIntersecting)
      // if (entry.isIntersecting) observer.unobserve(entry.target)
    })
  },
  {
    rootMargin: '-125px'
  })
  const rowsSelected = document.querySelectorAll('#tbody tr')
  rowsSelected.forEach((element) => observer.observe(element))
}
