import { personalInfo } from "@/data/portfolio";

export default function DebugPage() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Debug Page</h1>
      <p>Name: {personalInfo.name}</p>
      <p>Title: {personalInfo.title}</p>
      <p>If you can see this, data import is working.</p>
    </div>
  );
}


















