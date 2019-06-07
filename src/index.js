let Keyboard = window.SimpleKeyboard.default;

let keyboard = new Keyboard({
    onChange: input => onChange(input),
    onKeyPress: button => onKeyPress(button),
    layout: {
        default: [
            "\u0105 \u010D \u0119 \u0117 \u012F \u0161 \u0173 \u016B \u017E {bksp} ",
            "q w e r t y u i o p 7 8 9",
            "\ a s d f g h j k l 4 5 6",
            "z x c v b n m . , 0 1 2 3"
        ]
    },
    display: {
        "{enter}": "submit",
        "{bksp}": "backspace",
        "{lock}": "lock",
        "{shift}": "shift",
        "{tab}": "tab",
        "{space}": " "
    },
    layoutName: "default",
    theme: "hg-theme-default emoji-theme"
});


let $closeButton = $('div[data-skbtnuid="default-r0b10"]');
$('div[data-skbtnuid="default-r0b10"] span').text('X');

$closeButton.css({
    'background-color':'red',
    'color':'white',
    'font-weight':'900'});

$closeButton.click(function () {
    //$('input.quicksearch').val(' ');



    $('.simple-keyboard').hide();
});



/**
 * Update simple-keyboard when input is changed directly
 */
document.querySelector(".quicksearch").addEventListener("change", event => {
    keyboard.setInput(event.target.value);

});

console.log(keyboard);

function onChange(input) {

   // $(".quicksearch").focus();

    document.querySelector(".quicksearch").value = input;

    var e = $.Event( "keyup", { keyCode: 13 } );
    $('.quicksearch').trigger(e);

    console.log("The Unicode value is: " + input);
    console.log("Input changed", input);
}

function onKeyPress(button) {
    console.log("Button pressed", button);


    /**
     * If you want to handle the shift and caps lock buttons
     */
    if (button === "{shift}" || button === "{lock}") handleShift();
}

function handleShift() {
    let currentLayout = keyboard.options.layoutName;
    let shiftToggle = currentLayout === "default" ? "shift" : "default";

    keyboard.setOptions({
        layoutName: shiftToggle
    });
}