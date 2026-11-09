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
  onOpenTemplate: (
    templateData: any
  ) => void;
}

export default function TemplateLibrary({
  onBack,
  onOpenTemplate,
}: TemplateLibraryProps) {
  const [templates, setTemplates] =
    useState<Template[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [
    openingTemplateId,
    setOpeningTemplateId,
  ] = useState<number | null>(
    null
  );

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

  async function handleOpenTemplate(
    templateId: number
  ) {
    try {
      setOpeningTemplateId(
        templateId
      );

      const response =
        await fetch(
          `/api/template/${templateId}`
        );

      const data =
        await response.json();

      if (!data.success) {
        throw new Error(
          data.error ||
            "Unable to load template"
        );
      }

      onOpenTemplate(data);
    } catch (err) {
      console.error(err);

      alert(
        "Unable to open template."
      );
    } finally {
      setOpeningTemplateId(
        null
      );
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
          margin:
            "0 auto 20px auto",
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
          backgroundColor:
            "#FFFFFF",
          borderRadius: "12px",
          padding: "24px",
 