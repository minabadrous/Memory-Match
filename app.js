// Chosen images array
var chosenImages = [];
var ImagesOrder = new Array(4);



// Create random images array function and triggering
const findCoff = () => {
    for(var i=0; i<6; i++){
        do{
            var coff = Math.floor( Math.random()*6 ) + 1
        } while( chosenImages.includes(coff) )
    
        chosenImages.push(coff)
    }
}
findCoff()
chosenImages = chosenImages.concat(chosenImages)
chosenImages.sort( () => Math.random()-0.5 )



// handling clicks
var choosing = false
var otherId = ""
var otherSrc= ""
var score = 0;

document.getElementById("result").innerHTML = score
const uncoverThis = (event) => {
    if( event.target.classList.contains("covered") ){
        event.target.classList.remove("covered")
        event.target.classList.add("uncovered")

        if( choosing ){
            first = true
            if(event.target.querySelector("img").src === otherSrc ) {
                console.log("BINGO!")
                score++
                document.getElementById("result").innerHTML = score

                if( document.getElementsByClassName("covered").length == 0) console.log( "YOU WIN!")
            }
            else{
                setTimeout( () => {
                    console.log("next time?")
                    event.target.classList.add("covered")
                    event.target.classList.remove("uncovered")
    
                    document.getElementById(otherId).classList.add("covered")
                    document.getElementById(otherId).classList.remove("uncovered")
                }, 300)
            }
        choosing = false;
        }
        else{
            first = false
            otherId = event.target.id
            otherSrc = event.target.querySelector("img").src
            choosing = true
        }
    }
}



// appending images
for(var i=0; i<12; i++){
    var div = document.createElement('div')
    var card = document.createElement('img')
    
    card.src = "./images/" + chosenImages[i] + ".png"
    div.classList.add("covered")
    div.id =  "img"+i

    div.addEventListener("click", uncoverThis)
    div.append(card)
    document.getElementById("grid").append(div)
}




// AI automated solution
var aiMemory = []
var pic = 0;
var items = [...document.getElementsByClassName("covered")]
var save = true

const ai = () => {
    setTimeout( ()=> {
        var itemSrc = items[pic].querySelector("img").src
        items[pic].click()
        if(items[pic-1]){
            items[pic-1].querySelector("img").classList.remove("active")
        }
        items[pic].querySelector("img").classList.add("active")


        if(aiMemory.includes(itemSrc)) {
            if( choosing ){
                console.log('first!!')
                setTimeout(()=>{
                    items[aiMemory.indexOf(itemSrc)].click()
                    if(score == 6) document.querySelector(".congrats").classList.add("animate")

                }, 300)
            }
            
            else{
                if(items[aiMemory.indexOf(itemSrc)].classList.contains("covered")){
                    setTimeout(()=>{
                        save = false
                        console.log('second->')
                        pic = pic-1
                    }, 300)
                }
            }
        }

        if( save ) aiMemory.push(itemSrc)
        console.log(aiMemory)
        save = true
        pic++
    if(pic<12) ai()
    }, 1000)
}




