
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormInput from "../../components/FormInput";
import FormTextarea from "../../components/FormTextarea";
import { apiCreateJob } from "../../lib/mockApi";

export default function PostJob() {
  const nav = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [budgetMin, setBudgetMin] = useState("");
  const [budgetMax, setBudgetMax] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const minNum = parseFloat(budgetMin);
    const maxNum = parseFloat(budgetMax);

    if (minNum > maxNum) {
      alert("Minimum budget cannot be greater than maximum budget");
      return;
    }

    setLoading(true);

    try {
      const newJob = await apiCreateJob({
        title,
        description,
        budgetMin: minNum,
        budgetMax: maxNum,
      });

      alert(`Job "${title}" posted successfully!`);
      nav(`/jobs/${newJob.id}`);
    } catch (error) {
      alert("Failed to post job. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="wrap">
      <h2>Post a New Job</h2>

      <form onSubmit={handleSubmit}>
        <div className="card">
          <FormInput
            label="Job Title"
            value={title}
            onChange={setTitle}
            placeholder="e.g., Full-Stack Developer Needed"
            required
          />

          <FormTextarea
            label="Job Description"
            value={description}
            onChange={setDescription}
            placeholder="Describe your project requirements, timeline, and any specific skills needed..."
            required
            rows={10}
          />

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <FormInput
              label="Minimum Budget ($)"
              type="number"
              value={budgetMin}
              onChange={setBudgetMin}
              placeholder="1000"
              required
              min={0}
            />

            <FormInput
              label="Maximum Budget ($)"
              type="number"
              value={budgetMax}
              onChange={setBudgetMax}
              placeholder="2000"
              required
              min={0}
            />
          </div>

          <div style={{ marginTop: 24, display: "flex", gap: 8 }}>
            <button
              type="submit"
              disabled={loading}
              style={{
                padding: "10px 24px",
                background: "#3b82f6",
                color: "white",
                border: "none",
                borderRadius: 6,
                cursor: loading ? "not-allowed" : "pointer",
                fontSize: 14,
                fontWeight: 500,
              }}
            >
              {loading ? "Posting..." : "Post Job"}
            </button>

            <button
              type="button"
              onClick={() => nav(-1)}
              style={{
                padding: "10px 24px",
                background: "#f3f4f6",
                border: "1px solid #e5e7eb",
                borderRadius: 6,
                cursor: "pointer",
                fontSize: 14,
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
