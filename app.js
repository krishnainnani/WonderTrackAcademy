const joinDialog = document.querySelector("#join-dialog");
const joinForm = document.querySelector("#join-form");
const joinFeedback = document.querySelector("#join-feedback");
const openJoinButtons = document.querySelectorAll("[data-open-join]");
const closeJoinButton = document.querySelector("[data-close-join]");

const toggleDialog = (isOpen) => {
  if (!joinDialog) return;
  if (isOpen) {
    joinDialog.showModal();
  } else {
    joinDialog.close();
  }
};

openJoinButtons.forEach((button) => {
  button.addEventListener("click", () => toggleDialog(true));
});

if (closeJoinButton) {
  closeJoinButton.addEventListener("click", () => toggleDialog(false));
}

if (joinDialog) {
  joinDialog.addEventListener("click", (event) => {
    const dialogBounds = joinDialog.getBoundingClientRect();
    const clickedInDialog =
      event.clientX >= dialogBounds.left &&
      event.clientX <= dialogBounds.right &&
      event.clientY >= dialogBounds.top &&
      event.clientY <= dialogBounds.bottom;

    if (!clickedInDialog) {
      toggleDialog(false);
    }
  });
}

if (joinForm) {
  joinForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    joinFeedback.textContent = "Sending your details...";
    joinFeedback.dataset.state = "pending";

    const formData = new FormData(joinForm);
    const payload = Object.fromEntries(formData.entries());
    payload.programInterest = formData.getAll("programInterest");

    try {
      const response = await fetch("/api/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        let message = "Unable to submit the form.";
        try {
          const data = await response.json();
          message = data.message || message;
        } catch (parseError) {
          // Ignore JSON parsing errors for empty/invalid responses.
        }
        throw new Error(message);
      }

      joinFeedback.textContent = "Thanks! We will reach out with the next steps.";
      joinFeedback.dataset.state = "success";
      joinForm.reset();
    } catch (error) {
      joinFeedback.textContent = error.message;
      joinFeedback.dataset.state = "error";
    }
  });
}
