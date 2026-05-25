<<<<<<< HEAD
let chatCount = 1;

// SEND MESSAGE

async function sendMessage(){

    let input =
    document.getElementById("user-input");

    let message =
    input.value;

    if(message.trim() === ""){
        return;
    }

    let chatContainer =
    document.getElementById("chat-container");

    // USER MESSAGE

    let userDiv =
    document.createElement("div");

    userDiv.className =
    "user-message";

    userDiv.innerText =
    message;

    chatContainer.appendChild(userDiv);

    input.value = "";

    // BOT MESSAGE

    let botDiv =
    document.createElement("div");

    botDiv.className =
    "bot-message";

    botDiv.innerHTML =
    "Typing...";

    chatContainer.appendChild(botDiv);

    autoScroll();

    // FETCH API

    let response =
    await fetch("/chat",{

        method:"POST",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify({
            message:message
        })

    });

    let data =
    await response.json();

    typeEffect(botDiv,data.reply);

    playSound();

    saveHistory(message);

}

// TYPE EFFECT

function typeEffect(element,text){

    element.innerHTML = "";

    let i = 0;

    function typing(){

        if(i < text.length){

            element.innerHTML +=
            text.charAt(i);

            i++;

            autoScroll();

            setTimeout(typing,10);

        }

    }

    typing();

}

// AUTO SCROLL

function autoScroll(){

    let chatContainer =
    document.getElementById("chat-container");

    chatContainer.scrollTop =
    chatContainer.scrollHeight;

}

// ENTER KEY

document.getElementById("user-input")
.addEventListener("keypress",function(event){

    if(event.key === "Enter"){
        sendMessage();
    }

});

// VOICE INPUT

function startVoice(){

    const recognition =
    new webkitSpeechRecognition();

    recognition.lang = "en-US";

    recognition.onresult =
    function(event){

        document.getElementById("user-input").value =
        event.results[0][0].transcript;

    };

    recognition.start();

}

// DARK MODE

function toggleMode(){

    document.body.classList.toggle("light-mode");

}

// NEW CHAT

document.querySelector(".new-chat-btn")
.addEventListener("click",function(){

    document.getElementById("chat-container")
    .innerHTML = `
    <div class="bot-message">
    🤖 Hello! How can I assist you today?
    </div>
    `;

});

// SAVE HISTORY

function saveHistory(message){

    let history =
    document.getElementById("chat-history");

    let item =
    document.createElement("div");

    item.className =
    "history-item";

    item.innerText =
    "Chat " + chatCount;

    chatCount++;

    history.appendChild(item);

}

// FILE UPLOAD

document.getElementById("file-upload")
.addEventListener("change",function(event){

    let file =
    event.target.files[0];

    if(!file){
        return;
    }

    let chatContainer =
    document.getElementById("chat-container");

    // IMAGE

    if(file.type.startsWith("image/")){

        let img =
        document.createElement("img");

        img.className =
        "preview-image";

        img.src =
        URL.createObjectURL(file);

        chatContainer.appendChild(img);

    }

    // PDF

    else if(file.type === "application/pdf"){

        let pdf =
        document.createElement("div");

        pdf.className =
        "bot-message";

        pdf.innerHTML =
        "📄 PDF Uploaded: " + file.name;

        chatContainer.appendChild(pdf);

    }

    // OTHER FILES

    else{

        let fileDiv =
        document.createElement("div");

        fileDiv.className =
        "bot-message";

        fileDiv.innerHTML =
        "📁 File Uploaded: " + file.name;

        chatContainer.appendChild(fileDiv);

    }

    autoScroll();

});

// SOUND

function playSound(){

    let audio =
    new Audio(
    "https://www.soundjay.com/buttons/sounds/button-3.mp3"
    );

    audio.play();

}

// LOAD HISTORY

async function loadHistory(){

    let response =
    await fetch("/history");

    let data =
    await response.json();

    console.log(data);

}

loadHistory();
=======
const input =
document.getElementById("user-input");

const chatArea =
document.getElementById("chat-area");

const plusBtn =
document.getElementById("plus-btn");

const popupMenu =
document.getElementById("popup-menu");

const micBtn =
document.getElementById("mic-btn");

const themeToggle =
document.getElementById("theme-toggle");

const newChatBtn =
document.getElementById("new-chat-btn");

const chatList =
document.getElementById("chat-list");

// SEND MESSAGE

async function sendMessage(){

    const message =
    input.value.trim();

    if(message === ""){
        return;
    }

    addMessage(message, "user");

    input.value = "";

    const typingDiv =
    document.createElement("div");

    typingDiv.className =
    "message bot";

    typingDiv.innerHTML = `

        <div class="typing">
            <span></span>
            <span></span>
            <span></span>
        </div>

    `;

    chatArea.appendChild(typingDiv);

    scrollBottom();

    try{

        const response =
        await fetch("/chat",{

            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify({
                message:message
            })

        });

        const data =
        await response.json();

        typingDiv.remove();

        typeReply(data.reply);

    }

    catch(error){

        typingDiv.remove();

        addMessage(
            "Error getting AI response",
            "bot"
        );

    }

}

// TYPING EFFECT

function typeReply(text){

    const botDiv =
    document.createElement("div");

    botDiv.className =
    "message bot";

    chatArea.appendChild(botDiv);

    let words =
    text.split(" ");

    let current = "";

    let index = 0;

    const interval =
    setInterval(() => {

        current += words[index] + " ";

        botDiv.innerHTML =
        formatMessage(current);

        scrollBottom();

        index++;

        if(index >= words.length){

            clearInterval(interval);

        }

    }, 60);

}

// ADD MESSAGE

function addMessage(text, type){

    const div =
    document.createElement("div");

    div.className =
    "message " + type;

    div.innerHTML =
    formatMessage(text);

    chatArea.appendChild(div);

    scrollBottom();

}

// FORMAT MESSAGE

function formatMessage(text){

    text = text.replace(
        /```([\s\S]*?)```/g,
        `<pre><code>$1</code></pre>`
    );

    text = text.replace(
        /\*\*(.*?)\*\*/g,
        "<b>$1</b>"
    );

    text = text.replace(
        /\n/g,
        "<br>"
    );

    return text;

}

// ENTER SEND

input.addEventListener(
    "keypress",
    function(event){

        if(event.key === "Enter"){
            sendMessage();
        }

    }
);

// PLUS MENU

plusBtn.addEventListener(
    "click",
    function(){

        popupMenu.classList.toggle(
            "show"
        );

    }
);

// CLOSE MENU

document.addEventListener(
    "click",
    function(event){

        if(
            !plusBtn.contains(event.target)
            &&
            !popupMenu.contains(event.target)
        ){

            popupMenu.classList.remove(
                "show"
            );

        }

    }
);

// FILE UPLOAD

const menuItems =
document.querySelectorAll(".menu-item");

menuItems.forEach(item => {

    item.addEventListener(
        "click",
        function(){

            const text =
            item.innerText;

            if(
                text.includes("Add photos")
            ){

                const fileInput =
                document.createElement("input");

                fileInput.type =
                "file";

                fileInput.accept =
                "image/*";

                fileInput.multiple =
                true;

                fileInput.onchange =
                function(){

                    const files =
                    fileInput.files;

                    for(let file of files){

                        const reader =
                        new FileReader();

                        reader.onload =
                        function(e){

                            const img =
                            document.createElement("img");

                            img.src =
                            e.target.result;

                            img.className =
                            "preview-image";

                            chatArea.appendChild(img);

                            scrollBottom();

                        };

                        reader.readAsDataURL(file);

                    }

                };

                fileInput.click();

            }

            popupMenu.classList.remove(
                "show"
            );

        }
    );

});

// MIC INPUT

if(
    'webkitSpeechRecognition'
    in window
){

    const recognition =
    new webkitSpeechRecognition();

    recognition.lang =
    "en-US";

    micBtn.addEventListener(
        "click",
        function(){

            recognition.start();

        }
    );

    recognition.onresult =
    function(event){

        input.value =
        event.results[0][0].transcript;

    };

}

// THEME

themeToggle.addEventListener(
    "click",
    () => {

        document.body.classList.toggle(
            "dark-mode"
        );

    }
);

// NEW CHAT

let chatCount = 1;

newChatBtn.addEventListener(
    "click",
    function(){

        chatCount++;

        const chatItem =
        document.createElement("div");

        chatItem.className =
        "chat-item";

        chatItem.innerHTML =
        `Chat ${chatCount}`;

        chatList.prepend(chatItem);

        chatArea.innerHTML = `
            <div class="message bot">
                👋 New chat started
            </div>
        `;

    }
);

// SCROLL

function scrollBottom(){

    chatArea.scrollTop =
    chatArea.scrollHeight;

}
>>>>>>> ef888437d866408d9ced89a1d8510e21480ad77f
