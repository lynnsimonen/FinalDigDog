$(document).ready(function() {
    //onclick to choose number of bones and set up gameboard
    $("button#play").on("click", createBoard);


    let numBones;
    let bonesArray = [];
    let foundBones;
    let findBones;
    let boxNumber;
    let bar = 0;

    $("div#boneNumber").text("THERE ARE " + findBones + " BONES BURIED IN THE YARD.").hide();

    function createBoard() {
        //Gather variable and create variables
        numBones = parseFloat($("input#numBones").val());
        foundBones = 0;
        findBones = numBones - foundBones;

        $("div#boneNumber").text("THERE ARE " + findBones + " BONES BURIED IN THE YARD.").show();

        //Create numbered gameboard
        boxNumber = 1;
        for (let i = 0; i < numBones; i++) {
            for (let j = 0; j < numBones; j++) {
                let newSpan = $("<span class='green'>" + boxNumber++ + "</span>")
                $("#board").append(newSpan);
            }
            $("#board").append("<br>")
        }

        //Create random array of length=numBones, min=1, max=pow(numBones, 2)
        //The array will be location (span index + 1) of buried bones
        bonesArray = [];
        do {
            let bones = Math.floor((Math.random() * (Math.pow(numBones, 2))) + 1);
            if (!(bonesArray.includes(bones))) { // is not in the array, then push into array
                bonesArray.push(bones);
            }
            // continue
        }
        while (bonesArray.length < numBones);
        //onClick for playDigDug is needs to be put after the span.green is created
        //otherwise, it cannot find the span.green to click on
        $("span.green").click(playDigDug);
    }

   //Create game play actions events
    function playDigDug() {

        //find clicked square number (index + 1)
        let Num = $(this).text(); //$(this).index()
        let SquareNum = parseInt(Num);


        //if SquareNum is in array (bone locations), then replace green square with bone square else brown square
        //Each span has a number if boneSquaresArray.includes(number), show bone, else brown.
        //make box unclickable  ... if no span.green, no clicking can happen... game over.
        if (bonesArray.includes(SquareNum))
        {
            //$(this).text().hide();
            //Decrease numBones counter -- if findBones found = total
            //Create happy or sad note if play is over or if found all bones
            //---
            --findBones;
            $("div#boneNumber").text("THERE ARE " + findBones + " BONES BURIED IN THE YARD.").show();
            //---
            if (findBones === 0) {
                $("div#board").text("YOUR DOGGIE FOUND ALL THE BONES!  HURRAY!!!");
            }
            else {
                $(this).removeClass("green");
                $(this).addClass("bone");
            }
        }
        //------------------------------------
        else {
            //progress bar calculation  let bar = $("div#myBar").
            //either value=(1/(pow(numBones, 2)) or value=(4/(pow(numBones, 2))
            //ADJUSTED RANDOM RANGE TO ALLOW SOME WINS AND SOME LOSSES
            bar += Math.floor(Math.random() * (4/Math.pow(numBones,2))) + (1.5/Math.pow(numBones,2))

            let progressBarWidth = parseFloat($("div#myProgress").width());
            let myBarWidth = bar * progressBarWidth;
            let barPercent = bar * 100;

            //progress bar div update
            $("div#danger").text("Danger-O-Meter: " + barPercent.toFixed(0) + "%");

            //Adjust Danger-o-Meter by random %,
            //green on right = safe, red on left = danger
            //let barWidth = $("div#myBar").width();
            $("div#myBar").width(myBarWidth);

            if (myBarWidth >= progressBarWidth) {
                //if progress bar = 100% then game over
                $("div#board").text("SHOO DOGGIE!!!  OUT OF MY YARD!!!");
            }
            else
            {
                $(this).removeClass("green");
                $(this).addClass("brown");
            }
        }
    }
});

