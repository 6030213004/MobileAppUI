// document.addEventListener('init', function(event) {
//     var page = event.target;
  
//     if (page.id === 'page1') {
//       page.querySelector('#push-button').onclick = function() {
//         document.querySelector('#myNavigator').pushPage('login.html', {data: {title: 'login'}});
//       };
//     } else if (page.id === 'page2') {
//       page.querySelector('ons-toolbar .center').innerHTML = page.data.title;
//     }
//   });


  document.addEventListener('init', function(event) {
    var page = event.target;
  
    if (page.id === 'restuarant') {
      page.querySelector('#segment-button').onclick = function() {
        document.querySelector('#myNavigator').pushPage('restuarant.html', {data: {title: 'Restuarant'}});
      };
    } else if (page.id === 'category') {
      page.querySelector('#segment-button').onclick = function() {
        document.querySelector('#myNavigator').pushPage('category.html', {data: {title: 'Category'}});
      };
    }
  });



