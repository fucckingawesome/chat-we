//firebase import
import firebase from "https://cdn.skypack.dev/firebase/compat/app";
import "https://cdn.skypack.dev/firebase/compat/auth";
import "https://cdn.skypack.dev/firebase/compat/firestore";

//jquery import
import "https://code.jquery.com/jquery-3.6.1.min.js"





const config = {
    apiKey: "AIzaSyDAk6wPmjinvA2AaKkBpXFpOkEwXssluvc",
    authDomain: "chainresolver.firebaseapp.com",
    projectId: "chainresolver",
    storageBucket: "chainresolver.appspot.com",
    messagingSenderId: "28247484124",
    appId: "1:28247484124:web:af0fc65ac1c51600b1b619"
}

firebase.initializeApp(config);
const db = firebase.firestore();
const auth = firebase.auth();



function login() {
    const you = prompt('')
    
    db.collection("chat_account").doc(you).get().then( (doc) => {
        if (doc.exists) {
            console.log(doc.data())

            localStorage.setItem('COLOR', doc.data().COLOR)
            localStorage.setItem('NAME', doc.data().NAME)
            localStorage.setItem('identity', 'yes')

        } else {
            console.log('alaws')
        }
    }).catch( (error) => {
        console.log(error);
    })
}

if (localStorage.getItem('identity') !== null) {
    console.log('goods')
} else {
    login()
}

function addMessage2DOM(data) {

    let divMessage = `
    <div class="message theirs">
    <div class="message__name" style="display:none">${data.accountName}</div>
    <div class="message__bubble" style="background-color: ${data.color}">${data.messageContent}</div>
    <small class="date" style="display:none">${data.time}</small>
    </div>
    `;
    
    $('.messages').append(divMessage)

    const allMessages = document.querySelector('.messages')
    allMessages.scrollTop = allMessages.scrollHeight - allMessages.clientHeight;
    return;
}


function sendMessage() {
    const inputMsg = $('input').val()
    const data = {
        accountName: localStorage.getItem("NAME"),
        messageContent: inputMsg,
        color: localStorage.getItem("COLOR"),
        time: new Date()
    }//
    $('input').val('')

    db.collection('chat_test').add(data).then( function(docRef) {
        //console.log(docRef.id);
        
    }).catch( function(error) {
        console.log(error)
    } )
}

$('#sendBtn').on('click', sendMessage)

$('input').keypress(function(event) {
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if(keycode == '13') {
        sendMessage()
    }
})

  
  //lisen to DB changes . onSnapshot() works everytime data changed from anywhere  
  db.collection("chat_test").orderBy("time").onSnapshot((querySnapshot) => { //this methods reads data from DB and calls addMessage2DOM
    console.log("querySnapshot.docs.length: " + querySnapshot.docs.length);

    function spawn(theBody, theIcon, theTitle) {
        const options = {
          body: theBody,
          icon: theIcon
        };
        
        const notification = new Notification(theTitle, options);  
    
    }

    function moNotify() {
        const identify = $('.message').last().find('.message__name').html()
        
        if (identify === localStorage.getItem('NAME')) {
            //
            console.log('ok');
        } else {
           spawn('','', identify)
            console.log(identify)
        }   
        //
    }

    setTimeout(moNotify, 2000)

    //querySnapshot.forEach((doc) => {  //if you want all
    querySnapshot.docChanges().forEach((change) => {  //if you want only changes
      addMessage2DOM(change.doc.data(), change.doc.id);

    });
  
  });


