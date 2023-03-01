let inpWeight = document.getElementById('weight_input');
let inpHeight = document.getElementById('height_input');
let unitsWeight = document.getElementById('weight_units');
let unitsHeight = document.getElementById('height_units');
let pic = document.getElementById('picture');
let btn = document.getElementById('btn');
let out = document.getElementById('output');
let out1 = document.getElementById('out1');
let out2 = document.getElementById('out2');
let main = document.querySelector('.main');
let res = document.querySelector('.result');
let oldWunits = 0;
let oldHunits = 0;
 

const ranges= [16, 18.5, 25, 30, 35, 40]
const weight_class= [   'Severely underweight',
                        "Underweight",
                        'Normal weight',
                        'Little overweight',
                        'Obessity class I',
                        'Obessity class II',
                        'Obessity class III'             
                ]

const descriptions= [   'Underweight could cause of irreversible changes in the organism and serious diseases. You need to have a consultation with a specialist in order to normalize your body weight and prvent probable health problems',
                        "Underweight could cause of diseases and health problems. You need to have a consultation with a specialist in order to normalize your body weight",
                        'You have a normal body weight. Keep this condition and good luck!',
                        'Little overweight could be healthy, but you\'d  better to control your weight dynamics. The best way is to have a consultation with a specialist in order to normalize your body weight and prevent its rising',
                        'Obessity could cause of irreversible changes in the organism and serious diseases. You need to have a consultation with a specialist in order to normalize your body weight and prvent probable health problems',
                        'Obessity could cause of irreversible changes in the organism and serious diseases. You need to have a consultation with a specialist in order to normalize your body weight and prvent probable health problems',
                        'Obessity could cause of irreversible changes in the organism and serious diseases. You need to have a consultation with a specialist in order to normalize your body weight and prvent probable health problems'                
                ]

function kgToLbs(kg){
    return 2.205*kg
}

function LbsToKg(lbs){
    return lbs*0.453592
}

function InchToCm(inch){
    return inch*2.54
}

function CmToInch(cm){
    return cm/2.54
}

function InchToFt(inch){
    // console.log(inch)
    return Math.floor(inch / 12)+'\' '+ Math.round( inch - Math.floor(inch/12)*12 )+'"'
}

function FtToInch(ft){
    let fullft = ''
    for (var i = 0; i < ft.length; i++) {
       fullft += '1234567890'.includes(ft[i]) ? ft[i] : ' '
    }
    fullft = fullft.split(' ').filter((a)=> a != '')
    return fullft.length === 0 ? 0 : 
            fullft.length === 1 ? +fullft[0] :  
            +fullft[fullft.length-2]*12 + Number(fullft[fullft.length-1])
}

function getRanges(bmi) {
    let num = 0;
    for (let i = 0; i < ranges.length; i++) {
        if (bmi >= ranges[i]) num= i+1
            else break;
    }
    return num+1;

}

function getBMI(weight, height, w_units, h_units) {
    weight = unitsWeight.selectedIndex === 0 ?  weight : LbsToKg(weight)
    height = unitsHeight.selectedIndex === 0 ?  height : InchToCm(FtToInch(height))

    /// in cm and kg:
    return Math.round( (weight / ( (height / 100)**2 ) )*10) /10;
}

function getPicAndText() {
    let BMI = getBMI(inpWeight.value, inpHeight.value, unitsWeight.selectedIndex, unitsHeight.selectedIndex)
    let range = getRanges(BMI)
    out2.innerText = 'Your BMI is ' + BMI +'\n'+weight_class[range-1]; 


    range < 3 ? out2.style.color = 'dodgerblue' :
    range < 4 ? out2.style.color = 'green' :
    range < 5 ? out2.style.color = 'olive' :
    range < 6 ? out2.style.color = 'orange' : out2.style.color = 'red';

    pic.src = './w'+range+'.jpg';
    out1.innerText = descriptions[range-1];

    document.body.style.backgroundColor = out2.style.color;
}

function sizeview(wrapped) {
    if (wrapped) {
        if (pic.classList.contains('invisible'))    pic.classList.remove('invisible');
        if (res.classList.contains('invisible'))    {res.classList.remove('invisible');  res.classList.add('visible');}
        main.classList.add('expand');
        getPicAndText();

        
    }
    else 
    {
        if (!pic.classList.contains('invisible'))   pic.classList.add('invisible');
        if (res.classList.contains('invisible'))    {res.classList.remove('visible');  res.classList.add('invisible');}
        if (main.classList.contains('expand'))     main.classList.remove('expand');
        out1.innerText = '';
        
        document.body.style.backgroundColor = btn.disabled ? 'grey' : 'dodgerblue' 
    }

}

function checkValues() {
    let weight = unitsWeight.selectedIndex === 0 ?  inpWeight.value : LbsToKg(inpWeight.value)
    let height = unitsHeight.selectedIndex === 0 ?  inpHeight.value : InchToCm(FtToInch(inpHeight.value))

    let heightOk = (height > 130) && (height < 220)
    let weightOk = (weight > 30) && (weight < 220)

    inpWeight.style.color = weightOk ? 'black' : 'red';
    inpHeight.style.color = heightOk ? 'black' : 'red';

    btn.disabled = !(weightOk && heightOk)
    return weightOk && heightOk
}

function testNum() {
/// to do: test numbers ranges
    if (checkValues())
    sizeview(true);
}

function checkInp() { 
    checkValues();
    sizeview(false);
}


function keydown(key) {

    if (key.keyCode === 13) {
         checkInp()
         if (!btn.disabled) testNum() 
     }
    
}


function unitsWeightTest(){

    if (unitsWeight.selectedIndex !== oldWunits)
    {
        let oldValue = +inpWeight.value
        // console.log(oldValue,' ', unitsWeight.selectedIndex )
        inpWeight.value = 
            unitsWeight.selectedIndex === 0 ?  
            Math.round(LbsToKg(oldValue)) :
            Math.round(kgToLbs(oldValue))
    }

    oldWunits = unitsWeight.selectedIndex
}

function unitsHeightTest(){
    if (unitsHeight.selectedIndex !== oldHunits)
    {
        let oldValue = inpHeight.value
        inpHeight.type = unitsHeight.selectedIndex === 0 ? 'number' : 'text'
        
        inpHeight.value = 
            unitsHeight.selectedIndex === 1 ?  
            InchToFt(CmToInch(+oldValue)) :
            Math.round(InchToCm(FtToInch(oldValue)))  
    }

    oldHunits = unitsHeight.selectedIndex
}

function init() {
    inpHeight.value = '180';
    inpWeight.value = '70';
    unitsHeightTest()   
    unitsWeightTest()
    // unitsWeight.selected;
}

//----------------------------------------------------------------



inpWeight.addEventListener('input', checkInp);
inpWeight.addEventListener('click', checkInp);
inpWeight.addEventListener('keydown', (keyCode) => keydown(keyCode));
inpHeight.addEventListener('input', checkInp);
inpHeight.addEventListener('click', checkInp);
inpHeight.addEventListener('keydown', (keyCode) => keydown(keyCode));
btn.addEventListener('click', testNum);
unitsWeight.addEventListener('click',  unitsWeightTest)
unitsWeight.addEventListener('select',  unitsWeightTest)
unitsHeight.addEventListener('click',  unitsHeightTest)
unitsHeight.addEventListener('select',  unitsHeightTest)

init();