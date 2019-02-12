"use strict";

let curVal = 0;
let timeForOperator = false;
let expr = [];


function makeNumber(value){
    return function(){
        if(value == '.' && (+document.getElementById("resfield").value)% 1 !== 0){
            return;
        }
        timeForOperator = true;
        let res = document.getElementById("resfield").value;
        res += value;
        curVal = +res;
        document.getElementById("resfield").value = res;
      
    }
}
function setOperator(value){
    return function(){
        if(timeForOperator){
            if(value == '+/-'){
                curVal = -curVal;
                document.getElementById("resfield").value = curVal;
            }
            else{
            expr.push(curVal);
            expr.push(value);
            document.getElementById("resfield").value = "";
            document.getElementById("curExpr").value = expr.join(" ");
            timeForOperator = false;
        
            }
        }
    }
}
function calculateResult(){
    return function(){
        if(document.getElementById("resfield").value != ""){
        expr.push(curVal);
        if(expr.length == 1){
            document.getElementById("resfield").value = curVal;
            document.getElementById("scrib").innerHTML = document.getElementById("scrib").innerHTML+" "+curVal+";";
            expr = [];
            return;
        }
        if(typeof +expr[expr.length-1] == "number"){
            let res = curVal;
            for(let i = 0;i < expr.length;i++){
                switch (expr[i+1]){
                    case "x":
                        res*=expr[i];
                        break;
                    case "-":
                        res = expr[i]-res;
                        break;
                    case "+":
                        res+=expr[i];
                        break;
                }
            }
            curVal = res;
            let writeExpr = expr.join(" ");
            document.getElementById("scrib").innerHTML = document.getElementById("scrib").innerHTML+writeExpr+" = "+res+";";
            document.getElementById("resfield").value = res;
            document.getElementById("curExpr").value = "";
            expr = [];
            return;
        }
        
    }
    }
}
function addOnClick(){
    let buttons = document.getElementsByClassName("calVal");
    for(let i = 0; i < buttons.length;i++){
        buttons[i].onclick = makeNumber(buttons[i].value);
    }
    let operators = document.getElementsByClassName("operation");
    for(let i = 0; i < operators.length;i++){
        operators[i].onclick = setOperator(operators[i].value);
    }
    let resOp = document.getElementsByClassName("res");
    resOp[0].onclick = calculateResult();
}
function setSideHeight(){
    let middle = document.getElementsByClassName("theman");
    let sides = document.getElementsByClassName("side");
    console.log(document.getElementById("downer").offsetHeight);
    sides[0].style.height = middle[0].offsetHeight+"px";
    sides[1].style.height = middle[0].offsetHeight+"px";
    
}
function start(){
    addOnClick();
    setSideHeight();
}