export default function textareaAutoExpand () {
  const tx = document.getElementsByTagName('TEXTAREA')
  for (let i = 0; i < tx.length; i++) {
    textAreaAdjust(tx[i])
    tx[i].setAttribute('style', 'height:' + (tx[i].scrollHeight) + 'px;overflow-y:hidden;padding-left:10px;padding-right:10px;')
    tx[i].addEventListener('input', OnInput, false)
  }
}

function OnInput () {
  this.style.height = '1px'
  this.style.height = (this.scrollHeight) + 'px'
}

function textAreaAdjust (elem) {
  if (elem.clientHeight < elem.scrollHeight) elem.style.height = elem.scrollHeight + 'px'
}
