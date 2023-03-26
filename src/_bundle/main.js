import Alpine from 'alpinejs'

window.Alpine = Alpine







// Start Alpine when the page is ready.
window.addEventListener('DOMContentLoaded', () => {
  Alpine.start()


});

// Basic Store Example in Alpine.
window.addEventListener('alpine:initializing', () => {
  Alpine.store('nav', {
    isOpen: false,
    close() { return this.isOpen = false },
    open() { return this.isOpen = true },
    toggle() { return this.isOpen = !this.isOpen }
  })
  Alpine.store('messages',[
    "Click here to save Miami.",
    "Saved. click to view reward.",
    "You are the reward",
    "Well that was easy.",
    "j/k. you ready?",
    "Seriously?",
    "ok. LFG!!!."
  ])
});
