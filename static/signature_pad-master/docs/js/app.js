var wrapper = document.getElementById("signature-pad");
var clearButton = wrapper.querySelector("[data-action=clear]");
var changeColorButton = wrapper.querySelector("[data-action=change-color]");
var undoButton = wrapper.querySelector("[data-action=undo]");
var saveJPGButton = wrapper.querySelector("[data-action=save-jpg]");
var canvas = wrapper.querySelector("canvas");
var equipmentRemoved = document.body.querySelector("#equipmentRemovedSignature");
var backupInstalled = document.body.querySelector("#backupInstalledSignature");
var equipmentReturned = document.body.querySelector("#equipmentReturnedSignature");
var callClosedClient = document.body.querySelector("#callClosedClientSignature");
var callClosedTech = document.body.querySelector('#callClosedTechSignature');
var prclientsign1 = document.body.querySelector('#prclientsign1');
var prclientsign2 = document.body.querySelector('#prclientsign2');
var techniciansignpr = document.body.querySelector('#techsignpr');
var clientsigner = document.body.querySelector('#clientSignEquipRemove');
var techniciansigner = document.body.querySelector('#technicianSignEquipRemove');
var signaturePad = new SignaturePad(canvas, {
  // It's Necessary to use an opaque color when saving image as JPEG;
  // this option can be omitted if only saving as PNG or SVG
  backgroundColor: 'rgb(255, 255, 255)'
});

// Adjust canvas coordinate space taking into account pixel ratio,
// to make it look crisp on mobile devices.
// This also causes canvas to be cleared.
function resizeCanvas() {
  // When zoomed out to less than 100%, for some very strange reason,
  // some browsers report devicePixelRatio as less than 1
  // and only part of the canvas is cleared then.
  var ratio =  Math.max((window.devicePixelRatio || 1), 1);

  // This part causes the canvas to be cleared
  canvas.width = (canvas.offsetWidth * ratio);
  canvas.height = canvas.offsetHeight * ratio;
  canvas.getContext("2d").scale(ratio, ratio);

  // This library does not listen for canvas changes, so after the canvas is automatically
  // cleared by the browser, SignaturePad#isEmpty might still return false, even though the
  // canvas looks empty, because the internal data of this library wasn't cleared. To make sure
  // that the state of this library is consistent with visual state of the canvas, you
  // have to clear it manually.
  signaturePad.clear();
}

// On mobile devices it might make more sense to listen to orientation change,
// rather than window resize events.
window.onresize = resizeCanvas;
resizeCanvas();

function download(dataURL, filename) {
  var blob = dataURLToBlob(dataURL);
  var url = window.URL.createObjectURL(blob);

  var a = document.createElement("a");
  a.style = "display: none";
  a.href = url;
  a.download = filename;

  document.body.appendChild(a);
  a.click();

  window.URL.revokeObjectURL(url);
}

// One could simply use Canvas#toBlob method instead, but it's just to show
// that it can be done using result of SignaturePad#toDataURL.
function dataURLToBlob(dataURL) {
  // Code taken from https://github.com/ebidel/filer.js
  var parts = dataURL.split(';base64,');
  var contentType = parts[0].split(":")[1];
  var raw = window.atob(parts[1]);
  var rawLength = raw.length;
  var uInt8Array = new Uint8Array(rawLength);

  for (var i = 0; i < rawLength; ++i) {
    uInt8Array[i] = raw.charCodeAt(i);
  }

  return new Blob([uInt8Array], { type: contentType });
}

clearButton.addEventListener("click", function (event) {
  signaturePad.clear();
});

undoButton.addEventListener("click", function (event) {
  var data = signaturePad.toData();

  if (data) {
    data.pop(); // remove the last dot or line
    signaturePad.fromData(data);
  }
});

let active_signature = null;

if (equipmentRemoved != null) {

equipmentRemoved.addEventListener("click", function (event) {
  wrapper.classList.remove("hide_on_screen");
  resizeCanvas();
  active_signature = document.body.querySelector("#equipmentRemovedSignatureBackground");
});
}

if (backupInstalled != null) {
backupInstalled.addEventListener("click", function (event) {
  wrapper.classList.remove("hide_on_screen");
  resizeCanvas();
  active_signature = document.body.querySelector("#backupInstalledSignatureBackground");
});
}

if (equipmentReturned != null) {
equipmentReturned.addEventListener("click", function (event) {
  wrapper.classList.remove("hide_on_screen");
  resizeCanvas();
  active_signature = document.body.querySelector("#equipmentReturnedSignatureBackground");
});
}

if (callClosedClient != null) {
callClosedClient.addEventListener("click", function (event) {
  wrapper.classList.remove("hide_on_screen");
  resizeCanvas();
  active_signature = document.body.querySelector("#callClosedClientSignatureBackground");
});
}

if (callClosedTech != null) {
callClosedTech.addEventListener("click", function (event) {
  wrapper.classList.remove("hide_on_screen");
  resizeCanvas();
  active_signature = document.body.querySelector("#callClosedTechSignatureBackground");
});
}

if (prclientsign1 != null) {
prclientsign1.addEventListener("click", function (event) {
  wrapper.classList.remove("hide_on_screen");
  resizeCanvas();
  active_signature = document.body.querySelector("#customersignpr1background");
});
}
if (prclientsign2 != null) {
prclientsign2.addEventListener("click", function (event) {
  wrapper.classList.remove("hide_on_screen");
  resizeCanvas();
  active_signature = document.body.querySelector("#customersignpr2background");
});
}
if (techniciansignpr != null) {
techniciansignpr.addEventListener("click", function (event) {
  wrapper.classList.remove("hide_on_screen");
  resizeCanvas();
  active_signature = document.body.querySelector("#techsignprbackground");
});
}

if (clientsigner != null) {
clientsigner.addEventListener("click", function (event) {
  wrapper.classList.remove("hide_on_screen");
  resizeCanvas();
  active_signature = document.body.querySelector("#clientSignEquipRemoveBackground");
});
}

if (techniciansigner != null) {
techniciansigner.addEventListener("click", function (event) {
  wrapper.classList.remove("hide_on_screen");
  resizeCanvas();
  active_signature = document.body.querySelector("#technicianSignEquipRemoveBackground");
});
}



saveJPGButton.addEventListener("click", function (event) {
  if (signaturePad.isEmpty()) {
    alert("Please provide a signature first.");
  } else {
    var dataURL = signaturePad.toDataURL("image/jpeg");
    var img = new Image;
    img.src = dataURL;
    active_signature.style.backgroundImage = "url(" + img.src + ")";
    //equipmentRemoved.appendChild(img);
    //download(dataURL, "signature.jpg");
    wrapper.classList.add("hide_on_screen");
  }
});
