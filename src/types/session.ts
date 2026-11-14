export interface Session {
  id: string;
  name: string;
  currentQuestion: number;
  status: "waiting" | "live" | "closed";
}