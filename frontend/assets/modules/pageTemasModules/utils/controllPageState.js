export function setOriginal () {
  const buttons = document.querySelector('#temas-btns')
  const temas = document.querySelector('#temas-content')
  buttons.style.display = 'flex'
  temas.style.display = 'flex'
  document.querySelector('#search-result').innerHTML = ''
}

export function hideTemaSearch () {
  const buttons = document.querySelector('#temas-btns')
  const temas = document.querySelector('#temas-content')
  buttons.style.display = 'none'
  temas.style.display = 'none'
}
