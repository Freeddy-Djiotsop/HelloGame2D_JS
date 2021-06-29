let canvas = document.getElementById('canvas');
let context = canvas.getContext('2d');

let backgroundImg = new Image

let KEY_SPACE = false;//32
let KEY_UP = false;//38
let KEY_DOWN = false;//40
let KEY_RIGHT = false;//38
let KEY_LEFT = false;//40

let rocket =
{
    x: 100,
    y: 200,
    width: 80,
    height: 40,
    killed: 0,
    src: 'img/rocket.png'
};

let ufos = [];
let ufas = [];
let shotballs = [];

let ufa =
{
    x: 1300,
    y: 200,
    width: 80,
    height: 40,
    src: 'img/ufa.png',
    img: new Image()
};

document.onkeydown = function(e)
{
    if(e.keyCode == 32) KEY_SPACE = true;
    if(e.keyCode == 37) KEY_LEFT = true;
    if(e.keyCode == 38) KEY_UP = true;
    if(e.keyCode == 39) KEY_RIGHT = true;
    if(e.keyCode == 40) KEY_DOWN = true;
}

document.onkeyup = function(e)
{
    if(e.keyCode == 32) KEY_SPACE = false;
    if(e.keyCode == 37) KEY_LEFT = false;
    if(e.keyCode == 38) KEY_UP = false;
    if(e.keyCode == 39) KEY_RIGHT = false;
    if(e.keyCode == 40) KEY_DOWN = false;    
}

function update()
{
    if(rocket.src == 'img/boom.png') return;

    if(KEY_UP && rocket.y>=3) rocket.y -= 4;
    if(KEY_DOWN && rocket.y<=canvas.height-43) rocket.y += 4;

    if(KEY_RIGHT && rocket.x<canvas.width-53) rocket.x += 10;
    if(KEY_LEFT && rocket.x>0) rocket.x -= 10;

    ufos.forEach((el)=>el.x -= 5);
    
    shotballs.forEach((el)=>
    {
        el.x += 10
        if(el.x>canvas.width) shotballs = shotballs.filter(e => e!=el);
    });
}

function createUfo()
{
    let ufo =
    {
        x: 1300,
        y: Math.random() * 350,
        width: 70,
        height: 30,
        hit: false,
        src: 'img/ufo.png',
        img: new Image()
    };
    ufo.img.src = ufo.src;
    ufos.push(ufo);
}

function createUfa()
{
    ufa.img.src = ufa.src;
    ufas.push(ufa);
}

function draw()
{
    context.drawImage(backgroundImg, 0, 0);
    context.drawImage(rocket.img, rocket.x, rocket.y, rocket.width, rocket.height);
    // context.drawImage(ufo.img, ufo.x, ufo.y, ufo.width, ufo.height);

    ufos.forEach((el)=>
    {
        context.drawImage(el.img, el.x, el.y, el.width, el.height);
    });

    shotballs.forEach((el)=>
    {
        context.drawImage(el.img, el.x, el.y, el.width, el.height);
    });
    

    requestAnimationFrame(draw);//damit unendlich aufgeruft
}

function loadImages()
{
    // backgroundImg.src = 'img/background.jpg';
    backgroundImg.src = 'img/background1.png';
    
    rocket.img = new Image();
    rocket.img.src = rocket.src;

    ufa.img = new Image();
    ufa.img.src = ufa.src;
}

function checkForCollision()
{
    ufos.forEach((el)=>
    {
        if(rocket.x+rocket.width-10 > el.x && rocket.y+rocket.height-10 > el.y && rocket.x-10 < el.x && rocket.y-10 < el.y
            || rocket.x==el.x && rocket.y==el.y)
        {
            rocket.killed += 1;
            rocket.src = 'img/boom.png';
            rocket.img.src = rocket.src;
            ufos = ufos.filter(u => u!=el);//aktuell elment löschen
            if(rocket.killed!=3)
                setTimeout(()=>
                {
                    rocket.x = 100;
                    rocket.y = 200;
                    rocket.src = 'img/rocket.png';
                    rocket.img.src = rocket.src;
                }, 5000);
            else
            setTimeout(()=>
                {
                    rocket.x = -100;
                });
                
        }

        shotballs.forEach((e)=>
        {
            if(e.x + e.width > el.x && e.y + e.height > el.y && e.x < el.x && e.y < el.y+el.height)
            {
                el.hit = true;
                el.img.src = 'img/boom.png';
                shotballs = shotballs.filter(x => x!=e);
                setTimeout(()=>ufos = ufos.filter(x => x!=el),1000/4);
            }
        });
    });

    
}

function pleaseCheckforShoot()
{
    // if(rocket.src == "img/boom.png") KEY_SPACE=false;
    if(!KEY_SPACE || rocket.src == "img/boom.png")
        return;
    let shotball = 
    {
        x: rocket.x+85,
        y: rocket.y+20,
        width: 20,
        height: 4,
        src: 'img/shot.png',
        img: new Image()
    };
    shotball.img.src = shotball.src;
    shotballs.push(shotball);
    // shotballs.forEach((el)=>context.drawImage(el.img, el.x, el.y, el.width, el.height));    
}

function startGame()
{
    loadImages();
    setInterval(update, 1000/25);
    setInterval(createUfo,5000);//evry 5 sec
    //setInterval(createUfa,60000);//evry 1 min
    setInterval(checkForCollision, 1000/25);
    setInterval(pleaseCheckforShoot,1000/15);
    draw();
}