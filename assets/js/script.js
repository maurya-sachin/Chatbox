const botReplies = [
  "Hi, this is the bot. How can I assist you?",
  "I'm here to help. What's your question?",
  "What can I do for you today?",
  "How can I provide you with information?",
  "Is there anything specific you'd like to know?",
  "Feel free to ask any questions you have.",
];

let botMessageSentRecently = false; // Flag to track if a bot message was recently sent


// Function to add a random bot message to the chatbox
function addRandomBotMessage() {
  const randomIndex = Math.floor(Math.random() * botReplies.length);
  addBotMessage(botReplies[randomIndex]);
  botMessageSentRecently = true; // Set the flag to true
  setTimeout(() => {
    botMessageSentRecently = false; // Reset the flag after a delay
  }, 1000); // Adjust the delay as needed
}

// Function to add multiple bot messages to the chatbox
function addMultipleBotMessages(count) {
  for (let i = 0; i < count; i++) {
    setTimeout(addRandomBotMessage, i * 1000); // Delay each bot message by 1 second
  }
}

addMultipleBotMessages(3);

function sendMessage() {
    const inputBox = document.getElementById('visitorChatInput');
    const messageText = inputBox.value.trim();
    if (messageText) {
      addVisitorMessage(messageText);
      if (!botMessageSentRecently) {
        // Send a bot message only if a bot message was not recently sent
        addRandomBotMessage();
      }
      inputBox.value = '';
    }
  }

  // Function to add a visitor message to the chatbox
  function addVisitorMessage(message) {
    const chatbox = document.querySelector('.chat-container');
    const messageBox = document.createElement('div');
    messageBox.className = 'message-box visitor-message d-flex justify-content-end';
    messageBox.innerHTML = `<p>${message}</p>`;
    chatbox.appendChild(messageBox);
  }

  // Function to add a bot message to the chatbox
  function addBotMessage(message) {
    const chatbox = document.querySelector('.chat-container');
    const messageBox = document.createElement('div');
    messageBox.className = 'bot-reply d-flex align-items-center pt-1';
    messageBox.innerHTML = `<div class="message-box bot-message">
                            <p>${message}</p>
                            </div>
                            <div class="responseRating d-flex align-items-center ">
                              <i class="ri-thumb-up-line "></i>
                              <span class="dividerLine">|</span>
                              <i class="ri-thumb-down-line "></i>
                            </div>
                            <p class="help m-0">Was this helpful?</p>`;
    chatbox.appendChild(messageBox);
  }

  // Function to handle sending a message when Enter key is pressed
  function handleKeyDown(event) {
    if (event.key === 'Enter') {
      sendMessage();
    }
  }

  // Add an event listener for the Send button
  const sendButton = document.getElementById('sendButton');
  sendButton.addEventListener('click', sendMessage);

  // Add an event listener for the Enter key in the input box
  const inputBox = document.getElementById('visitorChatInput');
  inputBox.addEventListener('keydown', handleKeyDown);