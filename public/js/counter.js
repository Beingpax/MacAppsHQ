// Counter.dev analytics
const counter = async () => {
  const hostname = window.location.hostname;
  const pathname = window.location.pathname;
  const referrer = document.referrer;
  const title = document.title;
  const screenRes = `${window.screen.width}x${window.screen.height}`;
  const utcOffset = "6"; // Your UTC offset
  const counterId = "4639239d-b0a6-454b-aeb6-fe6d9010c192";

  try {
    const response = await fetch("/api/counter", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: counterId,
        hostname: hostname,
        pathname: pathname,
        referrer: referrer,
        title: title,
        screenRes: screenRes,
        utcoffset: utcOffset,
      }),
    });

    if (!response.ok) {
      throw new Error(`Analytics request failed: ${response.status}`);
    }
  } catch (error) {
    console.error("Counter tracking failed:", error);
  }
};

// Run counter
counter();

// Also track page changes for SPA navigation
document.addEventListener('astro:page-load', counter); 