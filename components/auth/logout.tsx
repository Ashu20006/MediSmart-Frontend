"use client";

export async function logoutUser() {
  try {
    // Call backend logout API
    const res = await fetch("http://localhost:8080/api/auth/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      credentials: "include", // needed if backend sets cookies
    });

    if (res.ok) {
      // Clear frontend storage
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("userRole");

      // Delete token cookie (overwrite with expired date)
      document.cookie =
        "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT;";

      // Redirect to login page
      window.location.href = "/login";
    } else {
      alert("Logout failed");
    }
  } catch (err) {
    console.error("Logout error:", err);
    alert("Something went wrong");
  }
}
