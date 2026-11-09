interface TemplateLibraryProps {
  onBack: () => void;
}

export default function TemplateLibrary({
  onBack,
}: TemplateLibraryProps) {
  return (
    <div
      style={{
        width: "100%",
        maxWidth: "1000px",
        margin: "0 auto",
        padding: "24px",
        boxSizing: "border-box",
      }}
    >
      <img
        src="/images/RotaryClubLogo.svg"
        alt="Rotary Club Logo"
        style={{
          width: "180px",
          display: "block",
          margin: "0 auto 20px auto",
        }}
      />

      <h1
        style={{
          color: "#FFFFFF",
          textAlign: "center",
          fontFamily: "Montserrat, sans-serif",
        }}
      >
        Template Library
      </h1>

      <div
        style={{
          backgroundColor: "#FFFFFF",
          borderRadius: "12px",
          padding: "24px",
          marginTop: "24px",
        }}
      >
        <p
          style={{
            color: "#666666",
          }}
        >
          Saved workshop templates will appear here.
        </p>

        <div
          style={{
            border: "1px solid #D9D9D6",
            borderRadius: "12px",
            padding: "20px",
            marginTop: "20px",
          }}
        >
          <h3
            style={{
              marginTop: 0,
              color: "#005DAA",
            }}
          >
            Membership Workshop
          </h3>

          <p>Sample template placeholder</p>

          <div
            style={{
              display: "flex",
              gap: "10px",
              flexWrap: "wrap",
            }}
          >
            <button style={primaryButton}>
              Open
            </button>

            <button style={secondaryButton}>
              Duplicate
            </button>

            <button style={secondaryButton}>
              Edit
            </button>

            <button style={deleteButton}>
              Delete
            </button>
          </div>
        </div>

        <div
          style={{
            marginTop: "30px",
          }}
        >
          <button
            onClick={onBack}
            style={secondaryButton}
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}

const primaryButton = {
  padding: "12px 18px",
  backgroundColor: "#F7A81B",
  color: "#005DAA",
  border: "none",
  borderRadius: "8px",
  fontWeight: "bold" as const,
  cursor: "pointer",
};

const secondaryButton = {
  padding: "12px 18px",
  backgroundColor: "#FFFFFF",
  color: "#005DAA",
  border: "1px solid #005DAA",
  borderRadius: "8px",
  cursor: "pointer",
};

const deleteButton = {
  padding: "12px 18px",
  backgroundColor: "#D32F2F",
  color: "#FFFFFF",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
};