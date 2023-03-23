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
    "Saved.",
    "Well that was easy.",
    "You can leave now.",
    "Seriously.",
    "stop clicking.",
    "you've done your part.",
    "now leave me alone"
  ])
});
