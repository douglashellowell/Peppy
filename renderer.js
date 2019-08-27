// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

// Changes requiring update checker
setInterval(function(){ 
  currentAtag = fs.readFileSync('./Tags/playerATag.txt');
  currentBtag = fs.readFileSync('./Tags/playerBTag.txt');
  currentroundID = fs.readFileSync('./Stage/roundID.txt');
  currentbracket = fs.readFileSync('./Stage/bracketside.txt');
 
  statetagA = document.getElementById("playerATag").value;
  statetagB = document.getElementById("playerBTag").value;
  statebracket = document.getElementById("bracketSide").value;
  stateround = document.getElementById("roundID").value;
  if (currentAtag.toString() === statetagA.toString() && currentBtag.toString() === statetagB.toString() && currentroundID.toString() === stateround.toString() && currentbracket.toString() === statebracket.toString()){
    document.getElementById("botbar1").style.setProperty('opacity', '.3')
    document.getElementById("botbar2").style.setProperty('opacity', '.3')
    document.getElementById("botbar3").style.setProperty('opacity', '.3')
    document.getElementById("botbar4").style.setProperty('opacity', '.3')
    document.getElementById("botbar5").style.setProperty('opacity', '.3')
  } else {
    document.getElementById("botbar1").style.setProperty('opacity', '1')
    document.getElementById("botbar2").style.setProperty('opacity', '1')
    document.getElementById("botbar3").style.setProperty('opacity', '1')
    document.getElementById("botbar4").style.setProperty('opacity', '1')
    document.getElementById("botbar5").style.setProperty('opacity', '1')
  }
  }, 100);

// close and min events
const remote = require('electron').remote;
document.getElementById("close-btn").addEventListener("click", function (e) {
  var window = remote.getCurrentWindow();
  window.close();
}); 
document.getElementById("min-btn").addEventListener("click", function (e) {
  var window = remote.getCurrentWindow();
  window.minimize(); 
});

//Score A initialise
var scoreAOriginal = 0;
var dx = scoreAOriginal;

//text file initialise
fs.writeFile('./Scores/playerAscore.txt', '0', function (err) {
    if (err) throw err;
    console.log('Initialised score A!');
  }); 
fs.writeFile('./Scores/playerBscore.txt', '0', function (err) {
    if (err) throw err;
    console.log('Initialised score B!');
  }); 

//Score A button functions
function incA(num){
  dx = dx + num;
  newValA = dx.toString();
  fs.writeFile('./Scores/playerAscore.txt', newValA, function (err) {
    if (err) throw err;
    console.log('updated (inc A)!');
  }); 
}

function decA(num){
    if (dx >= 1){
     dx = dx - num;
     newValA = dx.toString();
     fs.writeFile('./Scores/playerAscore.txt', newValA, function (err) {
        if (err) throw err;
        console.log('updated (dec A)!');
      }); 
    }


}

//Score B initialise
var scoreBOriginal = 0;
var dy = scoreBOriginal;

//Score B button functions
function incB(num){
    dy = dy + num;
    newValB = dy.toString();
    fs.writeFile('./Scores/playerBscore.txt', newValB, function (err) {
        if (err) throw err;
        console.log('updated (inc B)!');
      }); 
}

function decB(num){
    dy = dy - num;
    newValB = dy.toString();
    fs.writeFile('./Scores/playerBscore.txt', newValB, function (err) {
        if (err) throw err;
        console.log('updated (dec B)!');
      }); 
}

// Refresher and value assignment to div classes in index.html
setInterval(function(){ 
    document.getElementById("scoreA").innerHTML = dx; 
    document.getElementById("scoreB").innerHTML = dy;
    }, 100);

// Tag & Stage txt file initialise
fs.writeFile('./Tags/playerATag.txt', '', function (err) {
    if (err) throw err;
    console.log('Initialised TagA!');
  }); 
fs.writeFile('./Tags/playerBTag.txt', '', function (err) {
    if (err) throw err;
    console.log('Initialised TagB!');
  }); 

fs.writeFile('./Stage/bracketside.txt', "", function (err) {
    if (err) throw err;
    console.log('Initialised Stage');
}); 
fs.writeFile('./Stage/roundID.txt', "", function (err) {
    if (err) throw err;
    console.log('Initialised RoundID');
});

// Tag & Round updater
function updateTags() {
    tagA = document.getElementById("playerATag").value;
    tagB = document.getElementById("playerBTag").value;
    fs.writeFile('./Tags/playerATag.txt', tagA, function (err) {
        if (err) throw err;
        console.log('updated (Tag A)!');
    }); 
    fs.writeFile('./Tags/playerBTag.txt', tagB, function (err) {
        if (err) throw err;
        console.log('updated (Tag B)!');
    });

    bracket = document.getElementById("bracketSide").value;
    round = document.getElementById("roundID").value;
    fs.writeFile('./Stage/bracketside.txt', bracket, function (err) {
        if (err) throw err;
        console.log('updated (bracket side)!');
    }); 
    fs.writeFile('./Stage/roundID.txt', round, function (err) {
        if (err) throw err;
        console.log('updated round ID!');
    });

    
}

// Set icons to default
fs.copyFile('./placeholder.png', './inuseA.png', (err) => {
  if (err) throw err;
  console.log('A icon set to default!');
  document.getElementById('playerAicon').src = "./inuseA.png?random="+new Date().getTime();
});
fs.copyFile('./placeholder.png', './inuseB.png', (err) => {
  if (err) throw err;
  console.log('B icon set to default!');
  document.getElementById('playerBicon').src = "./inuseB.png?random="+new Date().getTime();
});
//document.getElementById('playerAicon').src='./placeholder.png';
//document.getElementById('playerBicon').src='./placeholder.png';

// Character Icon Changer

const colourOptions = ['neut', 'red', 'blue', 'green', 'black', 'white', 'yellow', 'cyan', 'purp', 'ora', 'pink']

function iconchangeA(char, colour) {
  fs.copyFile('./icons/' + char + '_' + colour + '.png', './inuseA.png', (err) => {
    if (err) throw err;
    console.log('A changed to ' + char + colour +'!');
    document.getElementById('playerAicon').src = "./inuseA.png?random="+new Date().getTime();
  });
  colourSwatchA = document.getElementById("playerASwatch");
    let child = colourSwatchA.lastElementChild;
    while (child) {
      colourSwatchA.removeChild(child);
      child = colourSwatchA.lastElementChild;
    }
 colourOptions.forEach(function(element) {
    if (fs.existsSync('./icons/' + char + '_' + element + '.png')) {
      let skinChoice = document.createElement('img');
      skinChoice.src = ('./icons/' + char + '_' + element + '.png')
      skinChoice.setAttribute("class", "icon")
      skinIcon = document.getElementById('playerASwatch')
      skinIcon.appendChild(skinChoice);
      clickmaker = document.getElementById('playerASwatch').lastChild;
      clickmaker.addEventListener('click', function() {
        fs.copyFile('./icons/' + char + '_' + element + '.png', './inuseA.png', (err) => {
          if (err) throw err;
          console.log('A changed to ' + char + element +'!');
          document.getElementById('playerAicon').src = "./inuseA.png?random="+new Date().getTime();
        });
      });
      clickmaker.addEventListener('contextmenu', function() {
        fs.copyFile('./icons/' + char + '_' + element + '.png', './inuseA.png', (err) => {
          if (err) throw err;
          console.log('A changed to ' + char + element +'!');
          document.getElementById('playerAicon').src = "./inuseA.png?random="+new Date().getTime();
        });
      });
    };
  })
 
}


function iconchangeB(char, colour) {
  fs.copyFile('./icons/' + char + '_' + colour + '.png', './inuseB.png', (err) => {
    if (err) throw err;
    console.log('B changed to ' + char + colour +'!');
    document.getElementById('playerBicon').src = "./inuseB.png?random="+new Date().getTime();
  });
  colourSwatchB = document.getElementById("playerBSwatch");
    let child = colourSwatchB.lastElementChild;
    while (child) {
      colourSwatchB.removeChild(child);
      child = colourSwatchB.lastElementChild;
    }
 colourOptions.forEach(function(element) {
    if (fs.existsSync('./icons/' + char + '_' + element + '.png')) {
      let skinChoice = document.createElement('img');
      skinChoice.src = ('./icons/' + char + '_' + element + '.png')
      skinChoice.setAttribute("class", "icon")
      skinIcon = document.getElementById('playerBSwatch')
      skinIcon.appendChild(skinChoice);
      clickmaker = document.getElementById('playerBSwatch').lastChild;
      clickmaker.addEventListener('click', function() {
        fs.copyFile('./icons/' + char + '_' + element + '.png', './inuseB.png', (err) => {
          if (err) throw err;
          console.log('B changed to ' + char + element +'!');
          document.getElementById('playerBicon').src = "./inuseB.png?random="+new Date().getTime();
        });
      });
      clickmaker.addEventListener('contextmenu', function() {
        fs.copyFile('./icons/' + char + '_' + element + '.png', './inuseB.png', (err) => {
          if (err) throw err;
          console.log('B changed to ' + char + element +'!');
          document.getElementById('playerBicon').src = "./inuseB.png?random="+new Date().getTime();
        });
      });
    };
  })
 
}

// Load attendees.txt
playerArray = [];
function loadAttendeesTxt() {
  var text = fs.readFileSync("./attendees.txt").toString();
  var playersByLine = text.split("\r\n")
  playerArray = playersByLine;
  var options = '';
  for(var i =0; i < playerArray.length; i++)
  options += '<option value="'+playerArray[i]+'" />';
  document.getElementById('playerList').innerHTML= options;
}
// load on reset
loadAttendeesTxt();

// reset page
function resetpage() {
  location = location;
}

