 
document.getElementById("submitButton").addEventListener("click", function() {
      
      let thankYouContainer = document.createElement("div");
      thankYouContainer.id = "thankyou-container";
      thankYouContainer.style.position = "fixed";
      thankYouContainer.style.top = "50%";
      thankYouContainer.style.left = "50%";
      thankYouContainer.style.transform = "translate(-50%, -50%)";
      thankYouContainer.style.zIndex = "10";  
  
       
      let thankYouGif = document.createElement("img");
      thankYouGif.src = "thankyou.gif";  
      thankYouGif.alt = "Thank you!";
      thankYouContainer.appendChild(thankYouGif);
  
       
      document.body.appendChild(thankYouContainer);
  
       
      setTimeout(function() {
           
          window.location.href = "homepage.html";  
  
           
          thankYouContainer.remove();
      }, 3000); 
  });
  