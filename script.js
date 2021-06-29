let KEY_SPACE = false;//32
let KEY_UP = false;//38
let KEY_DOWN = false;//40


document.onkeydown = function(e)
{
    if(e.keyCode == 32) KEY_SPACE = true;
    if(e.keyCode == 38) KEY_UP = true;
    if(e.keyCode == 40) KEY_DOWN = true;
}

document.onkeyup = function(e)
{
    if(e.keyCode == 32) KEY_SPACE = false;
    if(e.keyCode == 38) KEY_UP = false;
    if(e.keyCode == 40) KEY_DOWN = false;
}