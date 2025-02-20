
/*
Variable naming convention: <object>_<action>_<objectname>; Example -> Button_click_b1;
*/

//Variables (BE CAREFUL THESE MIGHT BE USED IN OTHER JS FILES TOO)
var inp_as=document.getElementById('a_size'), array_size=inp_as.value;
var inp_gen=document.getElementById("a_generate");
var inp_aspeed=document.getElementById("a_speed");
//var array_speed=document.getElementById('a_speed').value;

var butts_algos=document.querySelectorAll(".algos button");
let toggleBtn = document.getElementById('toggle-btn')
let customBox = document.querySelector('.custom')

var div_sizes=[];
var divs=[];
var margin_size;
var cont=document.getElementById("array_container");
cont.style="flex-direction:row";

// custom input elements
let c_size = document.getElementById('custom-size')
let c_arr = document.getElementById('custom-array')
let c_btn = document.getElementById('custom-button')

// error elements
let errorBox = document.getElementById('error-box')

// how to button
let howTo = document.getElementById('howto')
let blackBg = document.getElementById('black-bg')
let howBox = document.getElementById('how-box')

//Array generation and updation.

inp_gen.addEventListener("click",generate_array);
inp_as.addEventListener("input",update_array_size);

// array generation from ranged input
function generate_array()
{
    cont.innerHTML="";
    array_size = inp_as.value;

    for(var i=0;i<array_size;i++)
    {
        div_sizes[i]=Math.floor(Math.random() * 0.5*(inp_as.max - inp_as.min) ) + 10;
        divs[i]=document.createElement("div");
        if(array_size<=40)
        {
            divs[i].innerHTML = `<p class="elem" id="elem">${div_sizes[i]}</p>`;
            // divs[i].firstChild.style.fontSize=`${((100-array_size)*3)/2}%`;
           
        }
        divs[i].classList.add('bar-container')

        cont.appendChild(divs[i]);
        margin_size=0.1;
        divs[i].style=" margin:0% " + margin_size + "%; background-color:rgba(0,0,0,.7); width:" + (100/array_size-(2*margin_size)) + "%; height:" + (div_sizes[i]) + "%;";
    }
}

//array generation through custom input
function genCustomArr(){
    let newArr = c_arr.value.split(' ').join('').split(",");
    if(newArr.length != parseInt(c_size.value)){
        console.log("the size of the array is not same as the elements entered");
        // in this if section , a pop-up can be added to the ui to intimate the user, about the error
        // i didn't do it cuz i am lazy
        return
    }
    cont.innerHTML = '';
    for(var i=0;i<array_size;i++)
    {
      
        div_sizes[i]= parseInt(newArr[i]);
        divs[i]=document.createElement("div");
        if(array_size<=40)
        {
            divs[i].innerHTML = `<p class="elem">${div_sizes[i]}</p>`
        }
        divs[i].classList.add('bar-container')

        cont.appendChild(divs[i]);
        margin_size=0.1;
        divs[i].style=" margin:0% " + margin_size + "%; background-color:rgba(0,0,0,.7); width:" + (100/array_size-(2*margin_size)) + "%; height:" + (div_sizes[i]) + "%;";
    }

}

function update_array_size()
{
    array_size=inp_as.value;
    generate_array();
}

window.onload=update_array_size();

//Running the appropriate algorithm.
for(var i=0;i<butts_algos.length;i++)
{
    butts_algos[i].addEventListener("click",runalgo);
}

function disable_buttons()
{
    for(var i=0;i<butts_algos.length;i++)
    {
        butts_algos[i].classList=[];
        butts_algos[i].classList.add("butt_locked");

        butts_algos[i].disabled=true;
        inp_as.disabled=true;
        inp_gen.disabled=true;
        inp_aspeed.disabled=true;
    }
}

function runalgo()
{
    disable_buttons();

    this.classList.add("butt_selected");
    switch(this.innerHTML)
    {
        case "Bubble":Bubble();
                        break;
        case "Selection":Selection_sort();
                        break;
        case "Insertion":Insertion();
                        break;
        case "Merge":Merge();
                        break;
        case "Quick":Quick();
                        break;
        case "Heap":Heap();
                        break;
    }
}

// custom button
c_btn.addEventListener('click',function(){
    let newArr = c_arr.value.split(' ').join('').split(",");
    if(c_arr.value === '' && c_size.value === ''){
        errorBox.classList.toggle('slide1')
        blackBg.classList.toggle('display')
        errorBox.innerHTML=`<p id="error_text">Enter array size and array elements</p>`;
    }
    else if(c_arr.value === ''){
        errorBox.classList.toggle('slide1')
        blackBg.classList.toggle('display')
        errorBox.innerHTML=`<p id="error_text">Enter array elements</p>`;
    }
    else if( c_size.value === ''){
        errorBox.classList.toggle('slide1')
        blackBg.classList.toggle('display')
        errorBox.innerHTML=`<p id="error_text">Enter array size</p>`;
    }
    else if(c_arr.value !== '' && c_size.value !== ''){
        
         if(newArr.length > parseInt(c_size.value)){
            errorBox.classList.toggle('slide1')
            blackBg.classList.toggle('display')
            // you can choose to remove the elements below or not, your choice
            // c_arr.value = '';
            // c_size.value = '';
            errorBox.innerHTML=`<p id="error_text">Array size and number of elements entered are not matching. Few elements might be missing or there might be duplicate commas </p>`;
            return;
        }
        else if(newArr.length < parseInt(c_size.value)){
            errorBox.classList.toggle('slide1')
            blackBg.classList.toggle('display')
            // you can choose to remove the elements below or not, your choice
            // c_arr.value = '';
            // c_size.value = '';
            errorBox.innerHTML=`<p id="error_text">Array size and number of elements entered are not matching.Add few elements </p>`;
            return;
        }
        else if(newArr.length<10)
        {
            errorBox.classList.toggle('slide1')
            blackBg.classList.toggle('display')
            // you can choose to remove the elements below or not, your choice
            // c_arr.value = '';
            // c_size.value = '';
            errorBox.innerHTML=`<p id="error_text">Enter minimum of 10 Elements</p>`;
            return;
        }
        for(let i=0;i<newArr.length;i++)
        {
            if(newArr[i]>100)
            {
                errorBox.classList.toggle('slide1')
                blackBg.classList.toggle('display')
                // you can choose to remove the elements below or not, your choice
                // c_arr.value = '';
                // c_size.value = '';
                errorBox.innerHTML=`<p id="error_text">Enter elements lesser than 100</p>`;
                return;
                
            }
            if(newArr[i]<20)
            {
                errorBox.classList.toggle('slide1')
                blackBg.classList.toggle('display')
                // you can choose to remove the elements below or not, your choice
                // c_arr.value = '';
                // c_size.value = '';
                errorBox.innerHTML=`<p id="error_text">Enter elements greater than 20</p>`;
                return;
                }
        }
        array_size = parseInt(c_size.value);
        genCustomArr();
        c_arr.value = '';
        c_size.value = '';
    }
})

// toggle event for custom box button
toggleBtn.addEventListener('click',function(){
    customBox.classList.toggle('show')
})

// how-button event listener
howTo.addEventListener('click',function(){
    blackBg.classList.toggle('display')
    howBox.classList.toggle('slide')
})

blackBg.addEventListener('click',function(){
    blackBg.classList.remove('display')
    howBox.classList.remove('slide')
    if(errorBox.classList.contains('slide1')) errorBox.classList.remove('slide1')
})
