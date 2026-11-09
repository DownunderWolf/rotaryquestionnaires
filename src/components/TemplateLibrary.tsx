import { useEffect, useState } from "react";

interface Template {
  id: number;
  template_name: string;
  description: string;
  created_date: string;
  modified_date: string;
  status: string;
}

interface TemplateLibraryProps {
  onBack: () => void;
}

export default function TemplateLibrary({
  onBack,
}: TemplateLibraryProps) {
  const [templates, setTemplates] = useState<
    Template[]
  >([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    loadTemplates();
  }, []);

  async function loadTemplates() {
    try {
      setLoading(true);
      setError("");

      const response =
        await fetch("/api/templates");

      const data =
        await response.json();

      if (!data.success) {
        throw new Error(
          data.error ||
            "Failed to load templates"
        );
      }

      setTemplates(
        data.templates || []
      );
    } catch (err) {
      console.error(err);

      setError(
        "Unable to load templates."
      );
    } finally {
      setLoading(false);
    }
  }

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
          fontFamily:
            "Montserrat, sans-serif",
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
        {loading && (
          <p>Loading templates...</p>
        )}

        {error && (
          <div
            style={{
              padding: "16px",
              backgroundColor:
                "#FFEBEE",
              color: "#C62828",
              borderRadius: "8px",
            }}
          >
            {error}
          </div>
        )}

        {!loading &&
          !error &&
          templates.length === 0 && (
            <p>
              No templates found.
            </p>
          )}

        {!loading &&
          templates.map(
            (template) => (
              <div
                key={template.id}
                style={{
                  border:
                    "1px solid #D9D9D6",
                  borderRadius:
                    "12px",
                  padding: "20px",
                  marginBottom:
                    "20px",
                }}
              >
                <h3
                  style={{
                    marginTop: 0,
                    color: "#005DAA",
                  }}
                >
                  {
                    template.template_name
                  }
                </h3>

                <p>
                  {
                    template.description
                  }
                </p>

                <p
                  style={{
                    color:
                      "#666666",
                    fontSize:
                      "14px",
                    marginBottom:
                      "16px",
                  }}
                >
                  Created:{" "}
                  {
                    template.created_date
                  }
                </p>

                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    flexWrap:
                      "wrap",
                  }}
                >
                  <button
                    style={
                      primaryButton
                    }
                    onClick={() =>
                      alert(
                        `Load Template ${template.id} coming next`
                      )
                    }
                  >
                    Open
                  </button>

                  <button
                    style={
                      secondaryButton
                    }
                  >
                    Duplicate
                  </button>

                  <button
                    style={
                      secondaryButton
                    }
                  >
                    Edit
                  </button>

                  <button
                    style={
                      deleteButton
                    }
                  >
                    Delete
                  </button>
                </div>
              </div>
            )
          )}

        <div
          style={{
            marginTop: "30px",
          }}
        >
          <button
            onClick={onBack}
            style={
              secondaryButton
            }
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