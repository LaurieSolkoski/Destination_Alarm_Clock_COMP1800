// defines loadSkeleton function which inserts skeleton html elements.
function loadSkeleton (){
    console.log($("#navTemplate").load("./text/nav.html"));
}

// invokes loadSkeleton
loadSkeleton();