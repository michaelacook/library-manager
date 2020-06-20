/* 
This file handles the closing behaviour of the flash message
Also trims the current url to remove any query strings so that 
the flash message does not reappear if the user refreshes the 
page
*/

const alertbox = document.querySelector(".alertbox")

if (alertbox) {
  const closeBtn = document.getElementById("close")
  closeBtn.style.cursor = "pointer"
  closeBtn.addEventListener("click", (e) => {
    alertbox.remove()
    let href = window.location.href
    if (href.includes("?")) {
      window.location = href.substring(0, href.indexOf("?"))
    }
  })
}


