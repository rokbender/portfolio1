const printFunc=()=>{
  const elem=document.querySelector(".title");

  let text1=[" Привіт! Я & Андрій,$ інженер-електронік"];
  let text2=["Електронщик","Комп'ютерщик","Програміст"];

  const print=(word)=>{
    console.log(elem.innerHTML);
    elem.innerHTML="&#128075;";
    let count=0;
    let interval=setInterval(() => {
      console.log(word[count]);
      if(word[count]=="&"){
        elem.innerHTML+="&#128526";
      }
      else if(word[count]=="$"){
        console.log("w4233333333");
        elem.innerHTML+="<br>";
      }
      else{
        elem.innerHTML+=word[count];
      }
      
      count++;
      if(count===word.length){
        clearInterval(interval);
        
      }
    }, 120);
  }

 text1.forEach((word)=>{
  print(word);
 });
  
 function getRandomInt(max){
  return Math.floor(Math.random() * Math.floor(max));
 }
  



}




// // When the user scrolls the page, execute myFunction
// //window.onscroll = function() {myFunction()};

// // Get the navbar
// var navbar = document.getElementById("navbar");
// let header = document.querySelector(".header");
// // Get the offset position of the navbar
// var sticky = navbar.offsetTop;
// window.onload = function() { 
//   let text=" Привіт! Я & Андрій,";
//   let text2=["Електронщик","Комп'ютерщик","Програміст","Front-end розробник"];
//   let title=document.querySelector(".title");
//   title.innerHTML="&#128075;";


  
//   // text.split("").forEach(function(letter,index){
//   //   setTimeout(function(){
//   //     if(letter=="&"){
//   //       title.innerHTML+="&#128526";
//   //     }
//   //     else{
//   //       title.innerHTML+=letter;
//   //     }
//   // }, index * 150);
//   // });
  
 
  
  

// };
function showNavbar(){
    
  var x = document.getElementById("nav_list");
    if (x.className === "nav_list") {
        x.className += " responsive";
        navbar.classList.add("fig");
    } else {
        x.className = "nav_list";
       navbar.classList.remove("fig");
    }
}

// Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position

// function validate(){
//   let inputs=document.querySelectorAll("#form input");
//   let error=true;
//   inputs.forEach(input=>{
//     if (input.value.length==0){
//       error=false;
//     }
//     else{
//       input.style.borderColor="red";
//     }
//   });
//   return error;
// }
function send(event, php){
  console.log("Відправка запиту");
    event.preventDefault ? event.preventDefault() : event.returnValue = false;
    var req = new XMLHttpRequest();
    req.open('POST', php, true);
    req.onload = function() {
      if (req.status >= 200 && req.status < 400) {
        console.log(this.response);
      json = JSON.parse(this.response); 
          console.log(json);
            
      
          if (json.result == "success") {
            alert("Повідомлення відправлено");
            document.getElementById('form').reset();
          } else {
            alert("Помилка. Повідомлення не відправлено");
          }
        // Якщо невдалося звязатися з php файлом
        } else {alert("Помилка сервера. Номер: "+req.status);}}; 
    
    // Якщо не вдалося надіслати запит. Непрацює сервер
    req.onerror = function() {alert("Помилка відправки запиту");};
    req.send(new FormData(event.target));

  
  

}

document.addEventListener("DOMContentLoaded",()=>{
  const scrollItems=document.querySelectorAll(".scroll-item");
  const line=document.querySelector(".progress_item");
  const checkBox=document.querySelector("#btn_theme");
  const colorPicker=document.querySelector("#paletre");
  var r = document.querySelector(':root');
  let navbar = document.getElementById("navbar");
  let header = document.querySelector(".header");
  let sticky = navbar.offsetTop;

  const scrollAnimation=()=>{
    let windowCenter=(window.innerHeight/2)+window.scrollY;
    scrollItems.forEach(el => {
      let scrollOffset=el.offsetTop;
      if(windowCenter>=scrollOffset){
        el.classList.add("animation-class");
      }
      else{
        el.classList.remove("animation-class");
      }
      
    });
  }
  const progressAnimation=()=>{
    let scrollTop=window.scrollY;
    let windowHeight=window.innerHeight;
    let siteHeight=document.documentElement.scrollHeight;
    let percentageBar=Math.floor(scrollTop/(siteHeight-windowHeight)*100);
    line.style.width=`${percentageBar}%`
  }
  const changeTheme=()=>{
    checkBox.addEventListener('change',()=>{
      document.body.classList.toggle("dark-theme");
      document.body.classList.toggle("light-theme");
    });

  }
  const colorChange=(event)=>{
   // console.log(event.target.value);
    r.style.setProperty('--color3', event.target.value);
  }
  function myFunction() {
    if (window.pageYOffset >= sticky && window.innerWidth>800) {
      navbar.classList.add("sticky");
      header.style.paddingTop = "60px";
    } else {
      navbar.classList.remove("sticky");
      header.style.paddingTop = "0px";
    }
  }
  

  const observer=new IntersectionObserver((entries)=>{
   // console.log(entries);
    entries.forEach((entry)=>{
      if (entry.isIntersecting){
        document.querySelectorAll(".nav_link").forEach((link)=>{
          let id=link.getAttribute("href").replace('#',"");
          if(id === entry.target.id){
            link.classList.add("navlink--active");
          }
          else{
            link.classList.remove("navlink--active");
          }
        });
      }
    });
  },{
    threshold:0.5
  });

  document.querySelectorAll("section").forEach((section1)=>observer.observe(section1));
  scrollAnimation();
  progressAnimation();
  changeTheme();
  printFunc();

  colorPicker.addEventListener("change", colorChange, false)
  window.addEventListener("scroll",()=>{
    myFunction();
    scrollAnimation();
    progressAnimation();
  });
});