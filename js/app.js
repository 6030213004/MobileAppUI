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
firebase.auth().onAuthStateChanged(function (user) {
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

    $("#backhome").click(function () {
      $("#content")[0].load("home.html");
    });

    $("#tomyummer").click(function () {
      console.log('tomyummer');
      $("#content")[0].load("tomyummer.html");
    });

    $("#login").click(function () {
      $("#content")[0].load("login.html");
    });

    $("#logout").click(function () {
      $("#content")[0].load("login.html");
    });

    $("#profile").click(function () {
      $("#content")[0].load("profile.html");
    });

    $("#thai").click(function () {
      $("#content")[0].load("thai.html");
    });
  }

  if (page.id === 'thaipage') {
    console.log("Get in thai page");

    $("#tomyummer").click(function () {
      console.log('tomyummer');
      $("#content")[0].load("tomyummer.html");
    });

    $("#backtohome").click(function () {
      console.log('back to home');
      $("#content")[0].load("home.html");
    });
  }

  if (page.id === 'tomyummer') {
    console.log("Thai");

    $("#backtothai").click(function () {
      console.log('back to thai page');
      $("#content")[0].load("thai.html");
    });
  }

  if (page.id === 'loginpage') {
    console.log("login");

    $("#backhome").click(function () {
      console.log('back to home');
      $("#content")[0].load("home.html");
    });
  }

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



});





