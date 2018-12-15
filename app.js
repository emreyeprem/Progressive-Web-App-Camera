
let player = document.getElementById("player")
let canvas = document.getElementById("canvas")
const context = canvas.getContext('2d')

let showNotificationButton = document.getElementById("showNotificationButton")
showNotificationButton.addEventListener('click',() => {

  Notification.requestPermission()
  .then((permission) => {
    if(permission == 'granted') {
      new Notification('Hello World!')
    }
  })

})

let takePictureButton = document.getElementById("takePictureButton")
takePictureButton.addEventListener('click',() => {
  context.drawImage(player,0,0,canvas.width,canvas.height)
})

let closeCameraButton = document.getElementById("closeCameraButton")
closeCameraButton.addEventListener('click',() => {
  player.srcObject.getVideoTracks().forEach(track => track.stop())
})

let openCameraButton = document.getElementById("openCameraButton")
openCameraButton.addEventListener('click',() => {

  // turn on the camera and display live feed on the video element

  const contraints = {
    video: true
  }

  if("mediaDevices" in navigator) {

    navigator.mediaDevices.getUserMedia(contraints)
    .then((stream) => {
      player.srcObject = stream
    })
  }

})


// register a service worker
if("serviceWorker" in navigator) {
  navigator.serviceWorker.register('/serviceWorker.js')
  .then((registration) => {
    console.log('Server worker registered with scope ',registration.scope)
  }).catch((error) => {
    console.log(error)
  })
}
