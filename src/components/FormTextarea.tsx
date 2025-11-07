
type FormTextareaProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  rows?: number;
};

export default function FormTextarea({
  label,
  value,
  onChange,
  placeholder,
  required = false,
  rows = 6,
}: FormTextareaProps) {
  return (
    <div style={{ marginBottom: 16 }}>
      <label style={{ display: "block", marginBottom: 4, fontWeight: 500 }}>
        {label}
        {required && <span style={{ color: "red" }}> *</span>}
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        rows={rows}
        style={{
          width: "100%",
          padding: "8px 12px",
          border: "1px solid #e5e7eb",
          borderRadius: 6,
          fontSize: 14,
          boxSizing: "border-box",
          fontFamily: "inherit",
          resize: "vertical",
        }}
      />
    </div>
  );
}
