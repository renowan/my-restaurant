/**
 * instead of v-html
 */

function cv(el, value) {
  if (!value) {
    el.innerHTML = ''
  } else {
    el.innerHTML = value.replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;')
      .replace(/\n/g, '<br>')
      .replace(/\\n/g, '<br>')
  }
}

export default {
  bind (el, binding) {
    cv(el, binding.value)
  },
  update (el, binding) {
    cv(el, binding.value)
  },
  unbind (el, binding) {
  }
}
