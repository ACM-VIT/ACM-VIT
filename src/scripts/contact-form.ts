const pendingForms = new WeakSet<HTMLFormElement>();

// Delegation also handles forms cloned from responsive templates after page load.
document.addEventListener("submit", async (event) => {
  const form = event.target;
  if (
    !(form instanceof HTMLFormElement) ||
    !form.matches("#contact-form-desktop, #contact-form-mobile")
  ) return;

  event.preventDefault();
  if (pendingForms.has(form) || !form.reportValidity()) return;

  const button = form.querySelector<HTMLButtonElement>('button[type="submit"]');
  const status = form.querySelector<HTMLElement>("[data-contact-status]");
  if (!button || !status) return;

  const originalText = button.textContent;
  pendingForms.add(form);
  button.disabled = true;
  button.textContent = "Submitting...";
  status.textContent = "";

  try {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Object.fromEntries(new FormData(form).entries())),
    });
    if (!response.ok) throw new Error("Submission failed");

    const result = await response.json();
    if (typeof result?.flag !== "string" || !result.flag) {
      throw new Error("Missing flag in response");
    }

    status.textContent = result.flag;
    form.reset();
  } catch {
    status.textContent = "Could not submit your message. Please try again.";
  } finally {
    pendingForms.delete(form);
    button.disabled = false;
    button.textContent = originalText;
  }
});
