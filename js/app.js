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
    console.log("open homePage");

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

    $("#confirmorder").click(function () {
      console.log('confirm the order');
      $("#content")[0].load("confirmorder.html");
    });
  }

  if (page.id === 'loginpage') {
    console.log("login page");

    $("#backhome").click(function () {
      console.log('back to home page');
      $("#content")[0].load("home.html");
    });

    $("#signinbtn").click(function () {
      console.log('Signed in');
      $("#content")[0].load("home.html");
    });

    $("#gosignup").click(function () {
      console.log('go to signup page');
      $("#content")[0].load("signup.html");
    });
  }

  if (page.id === 'signuppage') {
    console.log("Sign up page");


    $("#signupbtn").click(function () {
      console.log('Signed up');
      $("#content")[0].load("home.html");
    });
  }

  if (page.id === 'confirmorder') {
    console.log("confirm order page");

    $("#backtoselect").click(function () {
      console.log('back to select page');
      $("#content")[0].load("home.html");
    });

    $("#payment").click(function () {
      console.log('go to payment page');
      $("#content")[0].load("bill.html");
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

  // -----------------------------------------------------------------------------------------------

  var shoppingCart = (function() {
    // =============================
    // Private methods and propeties
    // =============================
    cart = [];

    // Constructor
    function Item(name, price, count) {
        this.name = name;
        this.price = price;
        this.count = count;
    }

    // Save cart
    function saveCart() {
        sessionStorage.setItem('shoppingCart', JSON.stringify(cart));
    }

    // Load cart
    function loadCart() {
        cart = JSON.parse(sessionStorage.getItem('shoppingCart'));
    }
    if (sessionStorage.getItem("shoppingCart") != null) {
        loadCart();
    }


    // =============================
    // Public methods and propeties
    // =============================
    var obj = {};

    // Add to cart
    obj.addItemToCart = function(name, price, count) {
            for (var item in cart) {
                if (cart[item].name === name) {
                    cart[item].count++;
                    saveCart();
                    return;
                }
            }
            var item = new Item(name, price, count);
            cart.push(item);
            saveCart();
        }
        // Set count from item
    obj.setCountForItem = function(name, count) {
        for (var i in cart) {
            if (cart[i].name === name) {
                cart[i].count = count;
                break;
            }
        }
    };
    // Remove item from cart
    obj.removeItemFromCart = function(name) {
        for (var item in cart) {
            if (cart[item].name === name) {
                cart[item].count--;
                if (cart[item].count === 0) {
                    cart.splice(item, 1);
                }
                break;
            }
        }
        saveCart();
    }

    // Remove all items from cart
    obj.removeItemFromCartAll = function(name) {
        for (var item in cart) {
            if (cart[item].name === name) {
                cart.splice(item, 1);
                break;
            }
        }
        saveCart();
    }

    // Clear cart
    obj.clearCart = function() {
        cart = [];
        saveCart();
    }

    // Count cart 
    obj.totalCount = function() {
        var totalCount = 0;
        for (var item in cart) {
            totalCount += cart[item].count;
        }
        return totalCount;
    }

    // Total cart
    obj.totalCart = function() {
        var totalCart = 0;
        for (var item in cart) {
            totalCart += cart[item].price * cart[item].count;
        }
        return Number(totalCart.toFixed(2));
    }

    // List cart
    obj.listCart = function() {
        var cartCopy = [];
        for (i in cart) {
            item = cart[i];
            itemCopy = {};
            for (p in item) {
                itemCopy[p] = item[p];

            }
            itemCopy.total = Number(item.price * item.count).toFixed(2);
            cartCopy.push(itemCopy)
        }
        return cartCopy;
    }

    // cart : Array
    // Item : Object/Class
    // addItemToCart : Function
    // removeItemFromCart : Function
    // removeItemFromCartAll : Function
    // clearCart : Function
    // countCart : Function
    // totalCart : Function
    // listCart : Function
    // saveCart : Function
    // loadCart : Function
    return obj;
})();


// *****************************************
// Triggers / Events
// ***************************************** 
// Add item
$('.add-to-cart').click(function(event) {
    event.preventDefault();
    var name = $(this).data('name');
    var price = Number($(this).data('price'));
    shoppingCart.addItemToCart(name, price, 1);
    displayCart();
});

// Clear items
$('.clear-cart').click(function() {
    shoppingCart.clearCart();
    displayCart();
});


function displayCart() {
    var cartArray = shoppingCart.listCart();
    var output = "";
    for (var i in cartArray) {
        output += "<tr>" +
            "<td>" + cartArray[i].name + "</td>" +
            "<td>(" + cartArray[i].price + ")</td>" +
            "<td><div class='input-group'><button class='minus-item input-group-addon btn btn-primary' data-name=" + cartArray[i].name + ">-</button>" +
            "<input type='number' class='item-count form-control' data-name='" + cartArray[i].name + "' value='" + cartArray[i].count + "'>" +
            "<button class='plus-item btn btn-primary input-group-addon' data-name=" + cartArray[i].name + ">+</button></div></td>" +
            "<td><button class='delete-item btn btn-danger' data-name=" + cartArray[i].name + ">X</button></td>" +
            " = " +
            "<td>" + cartArray[i].total + "</td>" +
            "</tr>";
    }
    $('.show-cart').html(output);
    $('.total-cart').html(shoppingCart.totalCart());
    $('.total-count').html(shoppingCart.totalCount());
}

// Delete item button

$('.show-cart').on("click", ".delete-item", function(event) {
    var name = $(this).data('name')
    shoppingCart.removeItemFromCartAll(name);
    displayCart();
})


// -1
$('.show-cart').on("click", ".minus-item", function(event) {
        var name = $(this).data('name')
        shoppingCart.removeItemFromCart(name);
        displayCart();
    })
    // +1
$('.show-cart').on("click", ".plus-item", function(event) {
    var name = $(this).data('name')
    shoppingCart.addItemToCart(name);
    displayCart();
})

// Item count input
$('.show-cart').on("change", ".item-count", function(event) {
    var name = $(this).data('name');
    var count = Number($(this).val());
    shoppingCart.setCountForItem(name, count);
    displayCart();
});

displayCart();


});





