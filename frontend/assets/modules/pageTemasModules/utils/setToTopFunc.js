export default function setToTopFunc () {
  document.getElementById('to-top-anchor').addEventListener('click', (e) => {
    e.preventDefault()
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    })
  })
}
