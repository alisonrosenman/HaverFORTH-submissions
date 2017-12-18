// See the following on using objects as key/value dictionaries
// https://stackoverflow.com/questions/1208222/how-to-do-associative-array-hashing-in-javascript
//TASK 4:
var words = {
    //Here, I set myself up for using an eval. I suppose I should implement closures instead...
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



key:function(stack(){add(stack)}
key:function(stacky, terminal)(return function(add(stacky)))

... var stack = [];
  */

 //TASK 1:
function emptyStack(astack) {
    console.log(astack.length);
 //   while (astack.length > 0){
 //       astack.pop();
 //       console.log("poppop");
 //   }
    while (astack.stack_repr.length > 0){
        astack.stack_repr.pop();
    }
 renderStack(astack);
}

//TASK 3:
function addition(stack){
    var first = stack.pop();
    var second = stack.pop();
    stack.push(first+second);
}

function subtraction(stack){
    var first = stack.pop();
    var second = stack.pop();
    stack.push(first-second);
}

function multiplication(stack){
    var first = stack.pop();
    var second = stack.pop();
    stack.push(first*second);
}

function division(stack){
    var first = stack.pop();
    var second = stack.pop();
    stack.push(first/second);
    }

function duplicate(stack){
    var first = stack.pop();
    stack.push(first);
    stack.push(first);
}

function nip(stack){
    var first = stack.pop();
    var second = stack.pop();
    stack.push(second);
}

function swap(stack){
    var first = stack.pop();
    var second = stack.pop();
    stack.push(first);
    stack.push(second);
}

function over(stack){
    var first = stack.pop();
    var second = stack.pop();
    stack.push(first);
    stack.push(second);
    stack.push(first);
}

function greaterthan(stack){
    var first = stack.pop();
    var second = stack.pop();
    if (first > second){ stack.push(0);}
    else {stack.push(-1);}
}

function equality(stack){
    var first = stack.pop();
    var second = stack.pop();
    if (first == second){ stack.push(-1);}
    else {stack.push(0);}
}

function lessthan(stack){
    var first = stack.pop();
    var second = stack.pop();
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
    })

 }
function process(stack, input, terminal) {
    var listOfThingsToDo= input.trim().split(/ +/); //Each word of an input becomes an element of array listOfThingsToDo
    //var listOfThingsToDo = listOfThingsToDoPlusSemiColon.slice(0, listOfThingsToDoPlusSemiColon.length-1)
    console.log("the list of things to do is: "+listOfThingsToDo);
    if(listOfThingsToDo.indexOf(":") == -1){ //If we aren't in function-definition mode:
    listOfThingsToDo.forEach(function(element){ //TASK 5:
        // The user typed a number
   // if (!(isNaN(Number(element)))) {
    if (!(isNaN(parseInt(element)))){
        print(terminal,"pushing " + Number(element));
        stack.push(Number(element));
         console.log("stack size should be: "+stack.length);
    
    // The user types .s
    } else if (element === ".s") {
       // print(terminal, " <" + stack.length + "> " + stack.join(" "));
            print(terminal, " <" + stack.stack_repr.length + "> "+stack.stack_repr.slice().join(" "))
        console.log("<"+stack.length+">");
    } 
    // The user types a "standard" FORTH operation: dup, nip, >, etc.
    else if (element in words){
       // if (stack.length > 1 || element == "dup"){
          if (stack.stack_repr.length > 1 || element == "dup"){
        console.log("start");
        var the_op = words[element];
        eval(the_op)(stack); //Generally, eval is "evil". However, since I am providing parameters for eval within my function (must be in my map) this doesn't pose a security risk (i think???). https://javascriptweblog.wordpress.com/2010/04/19/how-evil-is-eval/ backs me up. Also, frankly, it works!
    }
        else{
            print(terminal, "ERROR: need more numbers on stack to perform this operation!");
        }
        //fn.apply(null, stack);
        
        console.log("end");
        //eval(words[input])(stack);
        //stack = words[input](stack);
    }

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
            else if (thing in userDefined){
                processUserDefined(thing, stack, terminal);
            }

        })}
       
    }) //End of NON definition mode
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
    //renderStack(stack);
    stack.isChange();
}; //close of Process function

function runRepl(terminal, stack) {
    terminal.input("Type a forth command:", function(line) {
        print(terminal, "User typed in: " + line);
        process(stack, line, terminal);
        runRepl(terminal, stack);
    });
};

// var stack = []; 
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
  //  $(':button').click(function(){console.log("i tried");})//process(stack, this.name, terminal)})



    print(terminal, "Welcome to HaverForth! v0.1");
    print(terminal, "As you type, the stack (on the right) will be kept in sync");
    runRepl(terminal, stack); ///

   
});

//My Constructor:

//var Stack = class Stack {
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

//Subject:
//Observer:
//ConcreteSubject:
//ConcreteObserver
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
        this.notify();
        
    }
    isChange(){
        var rowCount = $('#thestack tr').length;
        if (rowCount != this.stack_repr.length || this.stack_repr.length == 1){ //there should be as many rows in the HTML <table> as there are items in this.stack_repr
            this.registerObserver(renderStack);
           // renderStack(this);
            //console.log("will need to call render stack");
        }
    }
    notify(){
        //On keyup, 
        callEachObs(this);
        }
    }


 var test = new ObservableStack();
 //window.addEventListener("keydown", )
//test.registerObserver(isChange);
//test.notify;


//console.log("observers are: " + test.observers);


