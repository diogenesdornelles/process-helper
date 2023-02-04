export default function copyProcessNumber () {
  const processos = document.querySelectorAll('.select-processo')
  console.log(processos)
  processos.forEach(processo => {
    processo.addEventListener('click', (el) => {
      console.log(el)
      console.log('ola')
      const number = el.target.innerHTML
      navigator.clipboard.writeText(number)
    })
  })
}
