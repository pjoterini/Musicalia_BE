const submitButtons = document.querySelectorAll('.find-api-btn')

submitButtons.forEach(async (btn) => {
  btn.addEventListener('click', (e) => {
    targetedInput = e.currentTarget.parentNode.firstElementChild

    targetedInput.value = targetedInput.placeholder
  })
})
