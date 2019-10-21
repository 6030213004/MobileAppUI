//initial firebase
var firebaseConfig = {
  apiKey: "AIzaSyCDNTAIU-fPOyviQbq6EMjS-rfeQwtyQj0",
  authDomain: "foodjobs-70e88.firebaseapp.com",
  databaseURL: "https://foodjobs-70e88.firebaseio.com",
  projectId: "foodjobs-70e88",
  storageBucket: "foodjobs-70e88.appspot.com",
  messagingSenderId: "483185772329",
  appId: "1:483185772329:web:fbd877493374a6716f1938",
  measurementId: "G-8N17GZ87JF"
};


firebase.initializeApp(firebaseConfig);

var db = firebase.firestore();


// check login status
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    //var displayName = user.displayName;
    var email = user.email;
    console.log(email + "signed in");
    // var emailVerified = user.emailVerified;
    // var photoURL = user.photoURL;
    // var isAnonymous = user.isAnonymous;
    // var uid = user.uid;
    // var providerData = user.providerData;
    // ...
  } else {
    console.log("sign out");
    // User is signed out.
    // ...
  }
});


document.addEventListener('init', function (event) {
  var page = event.target;
 


  if (page.id === 'homePage') {
    console.log("homePage");

    $("#menubtn").click(function () {
      $("#sidemenu")[0].open();      
    });

    $("#carousel").empty();
    db.collection("recommended").get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
          
        var item = `
        <ons-carousel-item modifier="nodivider" id="${doc.data().id}" class="recomended_item">
            <div class="thumbnail" style="background-image: url('${doc.data().photoUrl}')">
            </div>
            <div class="recomended_item_title" id="item1_name">${doc.data().name}</div>
        </ons-carousel-item>`

        $("#carousel").append(item);


      });
    });

  }

});

$("#googlelogin").click(function () {
  var email = $("#email").val();
  var password = $("#password").val();
  firebase.auth().signInWithEmailAndPassword(email, password).then(function () {
    content.load('home.html');

  }
  )

    .catch(function (error) {
     
      console.log(error.message);
    });



})

if (page.id === 'signuppage') {
  console.log("signup");

  $("#createbtn").click(function () {

    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;

      if (errorCode === 'auth/weak-password') {
        alert('The password is too weak');

      } else {
        alert(errorMessage);
        content.load('login.html');
      }
      console.log(error);

    });


  });

  
}

if (page.id === 'loginPage') {
  console.log("loginPage");

  $("#gbtn").click(function () {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function(result) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      content.load('home.html');
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
  });

}
