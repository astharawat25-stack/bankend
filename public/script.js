
const form = document.getElementById("questionForm");
const questionInput = document.getElementById("question");
const askButton = document.getElementById("askButton");
const answerCard = document.getElementById("answerCard");
const answer = document.getElementById("answer");
const errorMessage = document.getElementById("errorMessage");

form.addEventListener("submit", async function (event) {
  event.preventDefault();

  const question = questionInput.value.trim();

  if (!question) {
    errorMessage.textContent = "Please enter a question.";
    return;
  }

  errorMessage.textContent = "";
  answerCard.hidden = false;
  answer.textContent = "Gemini is thinking...";

  askButton.disabled = true;
  askButton.textContent = "Please wait...";

  try {
    const response = await fetch("/api/ask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ question })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Something went wrong.");
    }

    answer.textContent = data.answer || "No answer received.";

  } catch (error) {
    console.error("Gemini error:", error.message);

    errorMessage.textContent =
      error.message || "Unable to connect to the server.";

    answer.textContent = "";

  } finally {
    askButton.disabled = false;
    askButton.textContent = "Ask Gemini";
  }
});






     

