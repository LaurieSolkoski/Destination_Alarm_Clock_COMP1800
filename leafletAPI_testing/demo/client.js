Template.myTemplate.rendered = function(){
    document.getElementById("slider").oninput = function() {
        myFunction()
    };
    }
    
    function myFunction() {
       var val = document.getElementById("slider").value //gets the oninput value
       document.getElementById('output').innerHTML = val //displays this value to the html page
       console.log(val)
    }