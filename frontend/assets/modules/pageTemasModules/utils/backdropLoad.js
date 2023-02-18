export async function setBackdropLoad (el) {
  setTimeout(() => { el.classList.remove('hidden') }, 1)
}

export async function removeBackdropLoad (el) {
  setTimeout(() => { el.classList.add('hidden') }, 500)
}
