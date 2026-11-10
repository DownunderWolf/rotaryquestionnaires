export default function JoinSession() {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#005DAA",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "24px",
      }}
    >
      <div
        style={{
          backgroundColor: "#FFFFFF",
          padding: "32px",
          borderRadius: "12px",
          textAlign: "center",
          maxWidth: "500px",
          width: "100%",
        }}
      >
        <h1>Workshop Response Hub</h1>

        <p>
          Connected to Session
        </p>

        <h2>8EDTRI</h2>

        <h3>
  What is your favourite Rotary project?
</h3>

<div
  style={{
    textAlign: "left",
    marginTop: "20px",
  }}
>
  <label>
    <input
      type="radio"
      name="question1"
    />
    Youth Programs
  </label>

  <br />
  <br />

  <label>
    <input
      type="radio"
      name="question1"
    />
    Community Service
  </label>

  <br />
  <br />

  <label>
    <input
      type="radio"
      name="question1"
    />
    Fundraising
  </label>

  <br />
  <br />

  <label>
    <input
      type="radio"
      name="question1"
    />
    International Projects
  </label>
</div>

<button
  onClick={async () => {
    const response =
      await fetch(
        "/api/response/save",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            sessionId: 1,
            questionId: 1,
            responseText:
              "Youth Programs",
          }),
        }
      );

    const result =
      await response.json();

    console.log(result);

    alert(
      "Response received. Please keep this page open. The facilitator will release the next question shortly."
    );
  }}
  style={{
    marginTop: "20px",
  }}
>
  Submit Answer
</button>
      </div>
    </div>
  );
}