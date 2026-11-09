export interface TemplateQuestion {
  text: string;
  type: string;
  options: string[];
}

export interface TemplateData {
  templateName: string;
  description: string;
  questions: TemplateQuestion[];
}

export async function saveTemplate(
  template: TemplateData
) {
  try {
    const response = await fetch("/api/templates", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(template),
    });

    if (!response.ok) {
      throw new Error("Failed to save template");
    }

    return await response.json();
  } catch (error) {
    console.error("Save Template Error:", error);
    throw error;
  }
}