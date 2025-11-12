export type FileType = "pdf" | "doc" | "docx" | "jpg" | "png" | "zip" | "txt" | "xlsx";

export interface File {
  id: string;
  contractId: string;
  name: string;
  size: string;
  uploadedBy: string;
  uploadedAt: string;
  type: FileType;
}
