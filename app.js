
const mail = document.getElementById('mail')
const pw = document.getElementById('pw')
const names = document.getElementById('name')
const signBox = document.querySelector('.sign-box')
const errormsg = document.querySelector('#error')

var val;
function signup() {
  firebase.auth().createUserWithEmailAndPassword(mail.value, pw.value)
    .then((result) => {
      // Signed in 
      // ...
      console.log(result)
      if (result) {
        val = names.value
signBox.style.opacity = '0'
signBox.style.pointerEvents='none'
signBox.style.transform = 'translateY(0px)'
text.disabled =false
      }
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      errormsg.innerHTML = errorMessage
      // ..
    });
}

function signin() {
  firebase.auth().signInWithEmailAndPassword(mail.value, pw.value)
    .then((user) => {
      // Signed in 
      // ...
      if (user) {
    
        val = names.value
        signBox.style.opacity = '0'
        signBox.style.pointerEvents='none'
signBox.style.transform = 'translateY(0px)'
text.disabled =false

      }
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      errormsg.innerHTML = errorMessage
    });
}
let text = document.getElementById('text')
let msgBox = document.querySelector('.messages')

var send = () => {
  if (text.value != "") {
    console.log(val);
    var key = firebase.database().ref('txt').push().key
    var obj = {
      t: val + ":  " + text.value,
      key: key
    }
    firebase.database().ref('txt').child(key).set(obj)
    text.value = ""
    console.log(arr)
  }
}

firebase.database().ref('txt').on('child_added', function (data) {
  const div = document.createElement('div')
  const p = document.createElement('p')
  var msg = document.createTextNode(data.val().t)
  p.appendChild(msg)
  div.appendChild(p)
  msgBox.appendChild(div)
})

function user(){
signBox.style.opacity = '1'
signBox.style.pointerEvents = 'all'
signBox.style.transform = 'translateY(30px)'
text.disabled =true
}