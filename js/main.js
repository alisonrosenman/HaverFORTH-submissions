
//TASK 4:
var words = {
    //Here, I set myself up for using an eval. See discussion in comments by eval use and in my final project reflections (email)
    "+":"addition", 
    "-":"subtraction",
    "*":"multiplication",
    "/":"division",
    "dup":"duplicate",
    "nip":"nip",
    "swap":"swap",
    "over":"over",
    ">":"greaterthan",
    "=":"equality",
    "<":"lessthan,"
};

//Used with TASK 6:
var userDefined = {};

//TASK 8: DISCUSSION FOR LAB 7
/** 
 * Your thoughtful comment here:
    Redoing this lab in JavaScript gave me a new perspective on many of the concepts we've been talking about in class this whole semester. 
    This lab ws a lot easier for me because I have used JavaScript before, so when it came to working with concepts like mapping and passing (by reference in JS), 
    it was much more second-nature  than I realized. So, this makes me look back on my C++/HERA labs and feel like I knew more than I thought I did! Also,
    I now have more insight into the benefits and drawbacks of each language.

    Lack of types in javascript became an issue primarily when working with the user-defined functions. While debugging, I found myself often
    console.log-ing some variable using the typeof keyword to get its type. This helped me fix errors with how I stored and accessed my 
    user-defined functions, since it is important to know that they came in as a long list, were separated into arrays, then stored as individiual
    strings again!

    The lack of types did not surprise or hurt me significantly. In general, I find JavaScript to be INCREDIBLY easier than C++, and maybe that's because every object doesn't have to have a type. 
    Instead, I found the "typing" JavaScript DOES have (I don't think this counts as actual typing ) where one has to declare variables with "var" and functions with "function" was just organizationally 
    helpful, and makes javaScript code easier to read, write, and debug.

    It was interesting to think of mapping in JavaScript. Although I have used forEach many times before, I didn't really put it together that that could
    be seen as a sort of "mapping" in this lab (and the related python for ------ in -----). This is one thing that makes C++ / CS245 seem easier,
    looking back. I also found dynamic typing to be helpful—not having type-checking at compile-time made completing this lab happen a lot faster
    for me, as I could work on other elements then go back to places where I was stuck without receiving all of the red ink I would have
    been given in Eclipse/C++. I'm looking forward to creating my own prototypes and objects as part of the final lab, though I've done this before.
  */

 //TASK 1:
function emptyStack(astack) {
    console.log(astack.stack_repr.length);
    while (astack.stack_repr.length > 0){
        astack.pop();
    }
}

//TASK 3:
//!
//For these functions, I use stack.stack_repr.pop() to get variables to +*-/ because I don't want to renderStack just yet.
//BUt once I'm able to calculate the thing I want on the stack, I use a stack.push() which will then render the completed stack.
function addition(stack){
    var first = stack.stack_repr.pop();
    var second = stack.stack_repr.pop();
    stack.push(first+second);
}

function subtraction(stack){
    var first = stack.stack_repr.pop();
    var second = stack.stack_repr.pop();
    stack.push(first-second);
}

function multiplication(stack){
    var first = stack.stack_repr.pop();
    var second = stack.stack_repr.pop();
    stack.push(first*second);
}

function division(stack){
    var first = stack.stack_repr.pop();
    var second = stack.stack_repr.pop();
    stack.push(first/second);
    }

function duplicate(stack){
    var first = stack.stack_repr.pop();
    stack.push(first);
    stack.push(first);
}

function nip(stack){
    var first = stack.stack_repr.pop();
    var second = stack.stack_repr.pop();
    stack.push(first);
}

function swap(stack){
    var first = stack.stack_repr.pop();
    var second = stack.stack_repr.pop();
    stack.push(first);
    stack.push(second);
}

function over(stack){
    var first = stack.stack_repr.pop();
    var second = stack.stack_repr.pop();
    stack.push(first);
    stack.push(second);
    stack.push(first);
}

function greaterthan(stack){
    var first = stack.stack_repr.pop();
    var second = stack.stack_repr.pop();
    if (first > second){ stack.push(0);}
    else {stack.push(-1);}
}

function equality(stack){
    var first = stack.stack_repr.pop();
    var second = stack.stack_repr.pop();
    if (first == second){ stack.push(-1);}
    else {stack.push(0);}
}

function lessthan(stack){
    var first = stack.stack_repr.pop();
    var second = stack.stack_repr.pop();
    if (first < second){ stack.push(0);}
    else {stack.push(-1);}
}

/**
 * Print a string out to the terminal, and update its scroll to the
 * bottom of the screen. You should call this so the screen is
 * properly scrolled.
 * @param {Terminal} terminal - The `terminal` object to write to
 * @param {string}   msg      - The message to print to the terminal
 */
function print(terminal, msg) {
    terminal.print(msg);
    $("#terminal").scrollTop($('#terminal')[0].scrollHeight + 40);
}


/** 
 * Sync up the HTML with the stack in memory
 * @param {Array[Number]} The stack to render
 */
function renderStack(stack) {
    //console.log("The stack is: " + stack.stack_repr);
  //  console.log(stack.slice());
    $("#thestack").empty();
    //stack.slice().reverse().forEach(function(element) {
     stack.stack_repr.slice().reverse().forEach(function(element) {
        $("#thestack").append("<tr><td>" + element + "</td></tr>");
    });
};

/** 
 * Process a user input, update the stack accordingly, write a
 * response out to some terminal.
 * @param {Array[Number]} stack - The stack to work on
 * @param {string} input - The string the user typed
 * @param {Terminal} terminal - The terminal object
 */


 //d3 Here... I decided to use d3 for the final part of this lab because it allows me to easily create SVG elements with many characteristics. Hooking it all up to the forth interpreter is the more interesting part.
 //d3 Also makes use of anonymous functions in many many cases which is something I realized only after taking CS245! I initially imagined using some with d3's ordinal scale when I make cirles/rectangles (for fill colors) but ultimately reasoned against it due to the fact that the shape events are within a mapping function and so iteration over the scale woudln't happen. Anyways...
    var svgContainer = d3.select("body").append("svg")
        .attr("width", 250)
        .attr("height", 200);

 //The point of this is to solve the problem of giving a user-defined word which contains a user-defined word which contains a user-defined word which contains a user-defined word etc., etc.,
 function processUserDefined(string, stack, terminal){ //Used with TASK 6
    var value = userDefined[string];
    var sublist = value.trim().split(/ +/);
    sublist.forEach(function(thing){
     if (!(isNaN(parseInt(thing)))){
                print(terminal, "pushing "+ Number(thing));
                stack.push(Number(thing));
            } else if( thing === ".s"){
               // print(terminal, " <"+ stack.length + "> " +stack.slice().join(" "))
               print(terminal, " <"+ stack.stack_repr.length + "> "+stack.stack_repr.slice().join(" "))
            }
            else if (thing in words){
                var the_op = words[thing];
                eval(the_op)(stack); //Generally, eval is "evil". However, since I am providing parameters for eval within my function (must be in my map) this doesn't pose a security risk (i think???). https://javascriptweblog.wordpress.com/2010/04/19/how-evil-is-eval/ backs me up. Also, frankly, it works!
            }
            else if (thing in userDefined){
                processUserDefined(thing);
            }
            else if (thing == "circle"){
                var TheRadius = stack.stack_repr.pop();
                var yCoordinate = stack.stack_repr.pop();
                var xCoordinate= stack.stack_repr.pop();
                var colors = ["green", "purple", "red", "pink", "blue", "yellow"];
                var randomIndex = Math.floor((Math.random() * colors.length) + 1);

                color = d3.scaleOrdinal(d3.schemeCategory20);

                var circle = svgContainer.append("circle")
                    .attr("cx", 20+xCoordinate)
                    .attr("cy", 40+yCoordinate)
                    .attr("r", TheRadius)
                    .style("fill", colors[randomIndex]);
                    //.style("fill", function(d, i){return color(i);});
             }
            else if (thing == "rectangle"){
                var height = stack.stack_repr.pop();
                var width = stack.stack_repr.pop();
                var yCoordinate = stack.stack_repr.pop();
                var xCoordinate = stack.stack_repr.pop();
                var colors = ["green", "purple", "red", "pink", "blue", "yellow"];
                var randomIndex = Math.floor((Math.random() * colors.length) + 1);

                var rectangle = svgContainer.append("rect")
                    .attr("x", xCoordinate)
                    .attr("y", yCoordinate)
                    .attr("width", width)
                    .attr("height", height)
                    .style("fill", colors[randomIndex]);
             }
    })
 }
           
function process(stack, input, terminal) {
    var listOfThingsToDo= input.trim().split(/ +/); //Each word of an input becomes an element of array listOfThingsToDo
    if(listOfThingsToDo.indexOf(":") == -1){ //If we aren't in function-definition mode:
    listOfThingsToDo.forEach(function(element){ //TASK 5:

        // The user typed a number
    if (!(isNaN(parseInt(element)))){
        print(terminal,"pushing " + Number(element));
        stack.push(Number(element));
         console.log("stack size should be: "+stack.length);
    }

    // The user types .s
     else if (element === ".s") {
       // print(terminal, " <" + stack.length + "> " + stack.join(" "));
            print(terminal, " <" + stack.stack_repr.length + "> "+stack.stack_repr.slice().join(" "))
      //  console.log("<"+stack.length+">");
    } 

    // The user types a "standard" FORTH operation: dup, nip, >, etc.
    else if (element in words){
        if (stack.stack_repr.length > 1 || element == "dup"){
            var the_op = words[element];
            eval(the_op)(stack); //Generally, eval is "evil". However, since I am providing parameters for eval within my function (must be in my map) this doesn't pose a risk,  since I never eval something not in this map. https://javascriptweblog.wordpress.com/2010/04/19/how-evil-is-eval/ backs me up. Also, frankly, it works!
        }
        else{
            print(terminal, "ERROR: need more numbers on stack to perform this operation!");
        }
    }

    //The user types in a user-defined function
    else if (element in userDefined){ //TASK 6
        var value = userDefined[element];
        var sublist = value.trim().split(/ +/);
        sublist.forEach(function(thing){
            if (!(isNaN(parseInt(thing)))){
                print(terminal, "pushing "+ Number(thing));
                stack.push(Number(thing));
            } else if( thing === ".s"){
                //print(terminal, " <"+ stack.length + "> " +stack.join(" "))
                print(terminal, " <" + stack.stack_repr.length + "> "+stack.stack_repr.slice().join(" "))
            }
            else if (thing in words){
                if (stack.stack_repr.length > 1 || thing == "dup"){
                var the_op = words[thing];
                eval(the_op)(stack); //Generally, eval is "evil". However, since I am providing parameters for eval within my function (must be in my map) this doesn't pose a security risk (i think???). https://javascriptweblog.wordpress.com/2010/04/19/how-evil-is-eval/ backs me up. Also, frankly, it works!
               } else{
                    print(terminal, "ERROR: need more numbers on stack to perform this operation");
                }
            }
        else if (thing == "circle"){
            var TheRadius = stack.stack_repr.pop();
            var yCoordinate = stack.stack_repr.pop();
            var xCoordinate= stack.stack_repr.pop();
            var colors = ["green", "purple", "red", "pink", "blue", "yellow"];
            var randomIndex = Math.floor((Math.random() * colors.length) + 1);

            color = d3.scaleOrdinal(d3.schemeCategory20);

            var circle = svgContainer.append("circle")
                .attr("cx", 20+xCoordinate)
                .attr("cy", 40+yCoordinate)
                .attr("r", TheRadius)
                .style("fill", colors[randomIndex]);
               // .style("fill", function(d, i){return color(i);});
        }
        else if (thing == "rectangle"){
            var height = stack.stack_repr.pop();
            var width = stack.stack_repr.pop();
            var yCoordinate = stack.stack_repr.pop();
            var xCoordinate = stack.stack_repr.pop();
            var colors = ["green", "purple", "red", "pink", "blue", "yellow"];
            var randomIndex = Math.floor((Math.random() * colors.length) + 1);

            var rectangle = svgContainer.append("rect")
                .attr("x", xCoordinate)
                .attr("y", yCoordinate)
                .attr("width", width)
                .attr("height", height)
                .style("fill", colors[randomIndex]);
        }

            //After a first go (above) I realize I should have a separate function which goes through userDefined functions which might contain userDefined functions which might contain userDefined functions etc. 
            else if (thing in userDefined){
                processUserDefined(thing, stack, terminal);
            }
        })} // end of if in user defined

    //I looked at //www.dashingd3js.com/using-the-svg-coordinate-space to understand the way d3 arranges SVG axes. 
    else if (element == "circle"){
        var TheRadius = stack.stack_repr.pop();
        var yCoordinate = stack.stack_repr.pop();
        var xCoordinate= stack.stack_repr.pop();
        var colors = ["green", "purple", "red", "pink", "blue", "yellow"];
        var randomIndex = Math.floor((Math.random() * colors.length) + 1);

        color = d3.scaleOrdinal(d3.schemeCategory20);

        var circle = svgContainer.append("circle")
            .attr("cx", 20+xCoordinate)
            .attr("cy", 40+yCoordinate)
            .attr("r", TheRadius)
            .style("fill", colors[randomIndex]);
            //.style("fill", function(d, i){return color(i);});
    }
    else if (element == "rectangle"){
        var height = stack.stack_repr.pop();
        var width = stack.stack_repr.pop();
        var yCoordinate = stack.stack_repr.pop();
        var xCoordinate = stack.stack_repr.pop();
        var colors = ["green", "purple", "red", "pink", "blue", "yellow"];
        var randomIndex = Math.floor((Math.random() * colors.length) + 1);

        var rectangle = svgContainer.append("rect")
            .attr("x", xCoordinate)
            .attr("y", yCoordinate)
            .attr("width", width)
            .attr("height", height)
            .style("fill", colors[randomIndex]);
    }


       
    }) //End of NON definition mode (3)
}
    else if (!(listOfThingsToDo.indexOf(":") == -1)){
        // then, until you hit semicolon, put in function body
        var indexOfColon = listOfThingsToDo.indexOf(":");
        var indexOfSemi = listOfThingsToDo.indexOf(";");
        var indexOfAfterName = listOfThingsToDo.indexOf(":")+2;
        var functionName =listOfThingsToDo[indexOfColon+1]; //ASSUMING SPACE BETWEEN EACH WORD, INCLUDING COLON/
        console.log("UD function name is: "+ functionName);
        var functionBody = listOfThingsToDo.slice(indexOfAfterName, indexOfSemi).join(" ");
        // element += functionBody.length;
        
        userDefined[functionName] = functionBody;
        console.log("here it is in the map: "+userDefined);
         var $something= $('<input/>').attr({ type: 'button', name:functionName, value:functionName});//, on:("click", function(){process(stack, this.value, terminal); console.log("clicked"))}});
         $something.on("click", function(){process(stack, this.value, terminal)});
         $("#UserDefinedButtons").append($something);

        }

    else {
        print(terminal, ":-( Unrecognized input");
        }
}; //close of Process function


function runRepl(terminal, stack) {
    terminal.input("Type a forth command:", function(line) {
        print(terminal, "User typed in: " + line);
        process(stack, line, terminal);
        runRepl(terminal, stack);
    });
};

// Whenever the page is finished loading, call this function. 
// See: https://learn.jquery.com/using-jquery-core/document-ready/
$(document).ready(function() {

    var terminal = new Terminal();
    terminal.setHeight("400px");
    terminal.blinkingCursor(true);
    // Find the "terminal" object and change it to add the HTML that
    // represents the terminal to the end of it.
    $("#terminal").append(terminal.html);

    //var stack = [];
    //var stack = new Stack; //hereee we goooooooooooo
    var stack = new ObservableStack;

    //TASK 2:
    $("#reset").click(function(){
        emptyStack(stack);
        console.log("just emptied");
    });

    print(terminal, "Welcome to HaverForth! v0.1");
    print(terminal, "As you type, the stack (on the right) will be kept in sync");
    runRepl(terminal, stack); ///   
});


class Stack{
    constructor(){
        this.stack_repr =  [];
    }
   get represenation(){
        return this.stack_repr;
    }
    pop(){
        return this.stack_repr.pop();
    }
    push(x){
       return this.stack_repr.push(x)
       

    }
}
function callEachObs(stack){
    stack.observers.forEach(function(obs){
        obs(stack);
    })
}

class ObservableStack extends Stack{
    constructor(){
        super();
        this.info = "This is an ObservableStack";
        this.observers = []; //Eventually, we will have a list of observers which go here.
    }

    registerObserver(observer){  // register a function which calls renderStack for each change to the stack so that you don't have to continually call it.
        this.observers.push(observer); //Add the observer to the list of observers.
       // this.notify();
        
    }
    notify(){
        //Registers the observer upon notification, then executes them all.
        this.registerObserver(renderStack);
        callEachObs(this);
    }
    push(x){
        this.stack_repr.push(x);
        this.notify();
    }
    pop(){
        this.stack_repr.pop();
        this.notify();
    }
    }

 var test = new ObservableStack();
 //window.addEventListener("keydown", )
//test.registerObserver(isChange);
//test.notify;
//console.log("observers are: " + test.observers);
