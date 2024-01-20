let myShip = document.getElementById("my-ship");

const main = document.querySelector("main");
let myShipMoove = document.getElementById("my-ship-moove");


myShip.addEventListener("keydown", handleKeyPress);
let currentPosition = 0;

function handleKeyPress(event) {
    if (event.key === 'e' || event.key === 'E') {
        currentPosition += 15;
        myShip.style.left = currentPosition + 'px';
    }

    if (event.key === "a" || event.key === "A") {
        currentPosition -= 15;
        myShip.style.left = currentPosition + "px";
    }

    if (event.key === "z" || event.key === "Z") {
        let shoot = document.createElement("span");
        shoot.id = "shoot";
        // shoot.innerText = "I";
        shoot.style.left = currentPosition + 50 + 'px'; 
        shoot.style.bottom = "0px";
        myShipMoove.appendChild(shoot);

        moveShoot(shoot);
    }
   };



  myShip.setAttribute('tabindex', 0);
  myShip.focus();

  let vilainDiv = document.getElementById("vilain-div");
  main.appendChild(vilainDiv);


let vilainImg;
let vilainImgDiv;
let arrayVilain = [];
  function generateVilain() {
    for (let i = 0; i < 20 ; i++) {
        vilainImgDiv = document.createElement("div");
        vilainImg = document.createElement("img");
        vilainImg.classList.add("vilain-img");
        vilainImg.src = "images/vilain.png";
        arrayVilain.push(vilainImgDiv);
        vilainDiv.appendChild(vilainImgDiv);
        vilainImgDiv.appendChild(vilainImg)
    }
}

let positionVilain = 0;

function mooveVilain() {
    setInterval(function() {
        let maxRight = main.offsetWidth - 700;
        // let maxLeft = main.offsetWidth + 1100;
        let currentLeft = parseInt(vilainDiv.style.left) || 0;

        if (positionVilain === 0 && currentLeft < maxRight) {
            vilainDiv.style.left = (currentLeft + 5) + 'px';
        } else if (positionVilain === 0 && currentLeft >= maxRight) {
            let bottomVilain = parseInt(vilainDiv.style.bottom) || 0;
            vilainDiv.style.bottom = (bottomVilain - 50) + 'px'; // Descend de 50px
            positionVilain = 1; // Change positionVilain to 1 to indicate moving back to the left
        }

        if (positionVilain === 1 && currentLeft > 0) {
            vilainDiv.style.left = (currentLeft - 5) + 'px';
        } else if (positionVilain === 1 && currentLeft <= 0) {
            let bottomVilain = parseInt(vilainDiv.style.bottom) || 0;
            vilainDiv.style.bottom = (bottomVilain - 50) + 'px'; // Descend de 50px
            positionVilain = 0; // 
        }
    }, 20);
}

function createShootVilain() {
    for(let i = 0; i < arrayVilain.length; i++) {
        let shootVilain = document.createElement("span");
        shootVilain.classList = "shoot-vilain";
        
        arrayVilain[i].appendChild(shootVilain)
        shootVilainFunction(shootVilain);
    }
}

let killed = 0;
function moveShoot(shoot) {
    setInterval(function () {
        let currentBottom = parseInt(shoot.style.bottom);
        if (currentBottom < main.offsetHeight) {
            shoot.style.bottom = (currentBottom + 10) + 'px';

            for (let i = 0; i < arrayVilain.length; i++) {
                if (!arrayVilain[i].classList.contains("killed") && isCollision(shoot, arrayVilain[i])) {
                    // arrayVilain[i].style.visibility = "hidden";
                    arrayVilain[i].classList.add("killed");
                    killed ++;
                    myShipMoove.removeChild(shoot);
                    
                }
            }
        } 
    }, 20);
    if (killed === 10) {
        // arrayVilain= [];
        vilainImgDiv.removeClass("killed");
//         mooveVilain()
//  generateVilain();
//  createShootVilain()
    }
}
   
function isCollision(element1, element2) {
    const rect1 = element1.getBoundingClientRect();
    const rect2 = element2.getBoundingClientRect();

    return (
        rect1.left < rect2.right &&
        rect1.right > rect2.left &&
        rect1.top < rect2.bottom &&
        rect1.bottom > rect2.top
    );
}

vilainDiv.setAttribute('tabindex', 0);

mooveVilain()
 generateVilain();
 createShootVilain()

console.log(arrayVilain)
 


// let intervalId = setInterval(function() {
        //     let currentTop = parseInt(shootVilain.style.top);
        //     if (currentTop < main.offsetHeight) {
        //         shootVilain.style.top = (currentTop - 10) + 'px';
        //     } else {
        //         clearInterval(intervalId);
        //         // myShipMoove.removeChild(shootVilain);
        //     }
        // }, 20);

        // function moveShoot(shoot) {
//     setInterval(function() {
//         let currentBottom = parseInt(shoot.style.bottom);
//         if (currentBottom < main.offsetHeight) {
//             shoot.style.bottom = (currentBottom + 10) + 'px';
//         } else {
//             // clearInterval(intervalId);
//             myShipMoove.removeChild(shoot);
//         }
//     }, 20);
// }