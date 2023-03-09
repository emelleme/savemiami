import Alpine from 'alpinejs'

window.Alpine = Alpine
var handler = document.querySelector('.handler');
var wrapper = document.querySelector('.wrapper');
var boxA = wrapper.querySelector('.box');
var isHandlerDragging = false;

document.addEventListener('mousedown', function (e) {
    if (e.target === handler) {
        isHandlerDragging = true;
    }
});

document.addEventListener('mousemove', function (e) {
  // Debounce
  if (!isHandlerDragging) {
      return;
  }
  var containerOffsetLeft = wrapper.offsetLeft;
  var pointerRelativeXpos = e.clientX - containerOffsetLeft;
  var boxAminWidth = 60;
  boxA.style.width = (Math.max(boxAminWidth, pointerRelativeXpos - 8)) + 'px';
  boxA.style.flexGrow = 0;
});

document.addEventListener('mouseup', function (e) {
  // Debounce
  if (!isHandlerDragging) {
      return;
  }
  isHandlerDragging = false;
  var canvas = document.getElementById("tool_render_canvas");
  canvas.width = boxA.clientWidth;
  canvas.height = boxA.clientHeight;
  window.dispatchEvent(new Event('resize'));
});

// Start Alpine when the page is ready.
window.addEventListener('DOMContentLoaded', () => {
  Alpine.start()
  Module = {};
  Module.preRun = new Array();
  Module.preRun.push(function () {
      ENV.SDL_EMSCRIPTEN_KEYBOARD_ELEMENT = "#canvas";
  });

  // Load the demo script
  var script = document.createElement("script");
  script.src = "/assets/index.js";
  script.onload = function () {
      var canvas = document.getElementById("tool_render_canvas");
      canvas.width = boxA.clientWidth;
      canvas.height = boxA.clientHeight;
      Module.canvas = canvas;
  }
  document.body.appendChild(script);
});

// Basic Store Example in Alpine.
window.addEventListener('alpine:initializing', () => {
  Alpine.store('nav', {
    isOpen: false,
    close() { return this.isOpen = false },
    open() { return this.isOpen = true },
    toggle() { return this.isOpen = !this.isOpen }
  })
});

// Pointer to the rendering context
var last_context_ptr = 0;

// This function is called once after initialization
window.context_on_init_js = function(context_ptr) {
    // Save the frame pointer
    last_context_ptr = context_ptr;

    // Initialize the text editor
    document.getElementById("edit_shader_tool_shader_text").value = Module.get_fragment_source();

    // Trigger window resize
    window.dispatchEvent(new Event('resize'));
}

// This function is called every frame
window.context_on_frame_js = function(context_ptr) {
    // Save the frame pointer
    last_context_ptr = context_ptr;
}

window.focus_canvas = function() {
    document.getElementById("tool_render_canvas").focus()
}

window.update_settings = function () {
    // Update the wave settings
    let wave_amplitude = Number(document.getElementById("in_wave_amplitude").value);
    let wave_resolution = Number(document.getElementById("in_wave_resolution").value);
    let wind_speed_x = Number(document.getElementById("in_wind_speed_x").value);
    let wind_speed_z = Number(document.getElementById("in_wind_speed_z").value);
    Module.update_water_settings(last_context_ptr, wave_amplitude, wave_resolution, wind_speed_x, wind_speed_z);
}
window.update_shader = function () {
    Module.recompile_program(last_context_ptr, document.getElementById("edit_shader_tool_shader_text").value);
}