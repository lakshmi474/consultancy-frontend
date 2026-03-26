async function test() {
  try {
    const res = await fetch('https://consultancy-project-backend-b890.onrender.com/api/users/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'test@example.com', password: 'password' })
    });
    const data = await res.json();
    console.log("Status:", res.status);
    console.log("Data:", data);
  } catch (e) {
    console.error("Fetch failed:", e.message);
  }
}
test();
