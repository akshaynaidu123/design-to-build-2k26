// utils/api.ts

const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbxmmvfii02mY1c8rPpR4aykE3bI-s6AjiUWpvnjm0h67q0wxkPgusiR4EkrxnLUvqa5Pw/exec";

/* -----------------------------
   SUBMIT REGISTRATION (POST)
-------------------------------- */
export const submitRegistration = async (formData: any) => {
  try {
    await fetch(SCRIPT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    return { success: true };
  } catch (error) {
    console.error("Submission Error:", error);
    return { success: false };
  }
};

/* -----------------------------
   GET ALL REGISTRATIONS (ADMIN)
-------------------------------- */
export const getRegistrations = async () => {
  try {
    const res = await fetch(SCRIPT_URL);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Fetch Error:", error);
    return [];
  }
};

/* -----------------------------
   DELETE REGISTRATION (ADMIN)
-------------------------------- */
export const deleteRegistration = async (rowNumber: number) => {
  try {
    await fetch(`${SCRIPT_URL}?delete=${rowNumber}`);
    return true;
  } catch (error) {
    console.error("Delete Error:", error);
    return false;
  }
};