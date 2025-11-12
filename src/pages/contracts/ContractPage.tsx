import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { colors, typography, spacing, shadows, borderRadius, components } from "../../lib/designTokens";
import OverviewTab from "./tabs/OverviewTab";
import MilestonesTab from "./tabs/MilestonesTab";
import ChatTab from "./tabs/ChatTab";
import FilesTab from "./tabs/FilesTab";
import ActivityTab from "./tabs/ActivityTab";

export default function ContractPage() {
  const { id } = useParams();
  const nav = useNavigate();
  const [tab, setTab] = useState<"overview" | "milestones" | "communication" | "files">("overview");

  // Mock contract data
  const contract = {
    id: id || "1",
    title: "E-commerce Platform Development",
    client: "Sarah Johnson",
    freelancer: "John Doe",
    total: 5000,
    status: "active" as "active" | "completed" | "pending",
    startDate: "2025-11-01",
    endDate: "2025-12-30",
    description: "Full-stack development of an e-commerce platform with payment integration and inventory management."
  };

  const getStatusStyle = (status: string) => {
    const statusMap: Record<string, { bg: string; text: string }> = {
      active: colors.state.active,
      completed: colors.state.approved,
      pending: colors.state.pending,
    };
    return statusMap[status] || colors.state.draft;
  };

  const statusStyle = getStatusStyle(contract.status);

  return (
    <div style={{
      minHeight: '100vh',
      background: colors.base.background,
      paddingBottom: '80px',
    }}>
      <div style={{
        padding: `${spacing.xl} ${spacing.lg}`,
      }}>
        <button
          onClick={() => nav('/contracts')}
          style={{
            ...components.button.secondary,
            marginBottom: spacing.lg,
            cursor: 'pointer',
          }}
        >
          ← Back to Contracts
        </button>

        <div style={{
          ...components.card,
          marginBottom: spacing.lg,
        }}>
          <h2 style={{
            fontSize: typography.fontSize.h1,
            fontWeight: typography.fontWeight.semibold,
            marginBottom: spacing.md,
            marginTop: 0,
            color: colors.text.primary,
          }}>
            {contract.title}
          </h2>

          <div style={{ display: "flex", gap: spacing.sm, marginBottom: spacing.lg, flexWrap: "wrap" }}>
            <span style={{
              fontSize: typography.fontSize.caption,
              fontWeight: typography.fontWeight.medium,
              color: statusStyle.text,
              background: statusStyle.bg,
              padding: `${spacing.xs} ${spacing.md}`,
              borderRadius: borderRadius.full,
            }}>
              {contract.status.toUpperCase()}
            </span>
            <span style={{
              fontSize: typography.fontSize.caption,
              fontWeight: typography.fontWeight.semibold,
              color: colors.primary.main,
              background: colors.primary.light,
              padding: `${spacing.xs} ${spacing.md}`,
              borderRadius: borderRadius.full,
              display: 'flex',
              alignItems: 'center',
              gap: spacing.xs,
            }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="1" x2="12" y2="23"></line>
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
              </svg>
              ${contract.total.toLocaleString()}
            </span>
          </div>

          <div style={{
            fontSize: typography.fontSize.body,
            color: colors.text.secondary,
            lineHeight: typography.lineHeight.normal
          }}>
            <div style={{ marginBottom: spacing.sm, display: 'flex', alignItems: 'center', gap: spacing.xs }}>
              <svg width="16" height="16" viewBox="0 0 28 28" fill="none">
                <circle cx="14" cy="10" r="4" fill={colors.primary.light} />
                <circle cx="14" cy="10" r="4" stroke={colors.text.primary} strokeWidth="1.5" />
                <path d="M6 24v-2a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v2" fill={colors.primary.light} opacity="0.5" />
                <path d="M6 24v-2a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v2" stroke={colors.text.primary} strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              <span style={{ fontWeight: typography.fontWeight.medium, color: colors.text.primary }}>
                Client:
              </span>{' '}
              {contract.client}
            </div>
            <div style={{ marginBottom: spacing.sm, display: 'flex', alignItems: 'center', gap: spacing.xs }}>
              <svg width="16" height="16" viewBox="0 0 28 28" fill="none">
                <rect x="6" y="9" width="16" height="12" rx="1.5" fill={colors.primary.light} />
                <rect x="6" y="9" width="16" height="12" rx="1.5" stroke={colors.text.primary} strokeWidth="1.5" />
                <path d="M12 21V7a1.5 1.5 0 0 0-1.5-1.5h-3a1.5 1.5 0 0 0-1.5 1.5v14" stroke={colors.text.primary} strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              <span style={{ fontWeight: typography.fontWeight.medium, color: colors.text.primary }}>
                Freelancer:
              </span>{' '}
              {contract.freelancer}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: spacing.xs }}>
              <svg width="16" height="16" viewBox="0 0 28 28" fill="none">
                <rect x="5" y="6" width="18" height="18" rx="2" fill={colors.primary.light} opacity="0.3" />
                <rect x="5" y="6" width="18" height="18" rx="2" stroke={colors.text.primary} strokeWidth="1.5" />
                <line x1="17" y1="3" x2="17" y2="9" stroke={colors.text.primary} strokeWidth="1.5" strokeLinecap="round" />
                <line x1="11" y1="3" x2="11" y2="9" stroke={colors.text.primary} strokeWidth="1.5" strokeLinecap="round" />
                <line x1="5" y1="12" x2="23" y2="12" stroke={colors.text.primary} strokeWidth="1.5" />
              </svg>
              <span style={{ fontWeight: typography.fontWeight.medium, color: colors.text.primary }}>
                Duration:
              </span>{' '}
              {contract.startDate} → {contract.endDate}
            </div>
          </div>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr 1fr",
          gap: spacing.xs,
          marginBottom: spacing.lg,
        }}>
          <button
            onClick={() => setTab("overview")}
            style={{
              padding: `${spacing.md} ${spacing.xs}`,
              background: tab === "overview" ? colors.primary.main : colors.base.surface,
              color: tab === "overview" ? colors.text.inverse : colors.text.secondary,
              border: tab === "overview" ? "none" : `1px solid ${colors.base.border}`,
              borderRadius: borderRadius.sm,
              fontWeight: typography.fontWeight.semibold,
              fontSize: typography.fontSize.caption,
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: spacing.xs,
              minHeight: '60px',
            }}
          >
            <svg width="20" height="20" viewBox="0 0 28 28" fill="none">
              <path d="M21.21 15.89A10 10 0 1 1 8 2.83" fill={tab === "overview" ? "rgba(255,255,255,0.2)" : colors.primary.light} />
              <path d="M21.21 15.89A10 10 0 1 1 8 2.83" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M22 12A10 10 0 0 0 12 2v10z" fill={tab === "overview" ? "rgba(255,255,255,0.3)" : colors.primary.light} />
              <path d="M22 12A10 10 0 0 0 12 2v10z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>Overview</span>
          </button>
          <button
            onClick={() => setTab("milestones")}
            style={{
              padding: `${spacing.md} ${spacing.xs}`,
              background: tab === "milestones" ? colors.primary.main : colors.base.surface,
              color: tab === "milestones" ? colors.text.inverse : colors.text.secondary,
              border: tab === "milestones" ? "none" : `1px solid ${colors.base.border}`,
              borderRadius: borderRadius.sm,
              fontWeight: typography.fontWeight.semibold,
              fontSize: typography.fontSize.caption,
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: spacing.xs,
              minHeight: '60px',
            }}
          >
            <svg width="20" height="20" viewBox="0 0 28 28" fill="none">
              <circle cx="14" cy="14" r="10" fill={tab === "milestones" ? "rgba(255,255,255,0.2)" : colors.primary.light} />
              <circle cx="14" cy="14" r="10" stroke="currentColor" strokeWidth="1.5" />
              <polyline points="14 8 14 14 18 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>Milestones</span>
          </button>
          <button
            onClick={() => setTab("communication")}
            style={{
              padding: `${spacing.md} ${spacing.xs}`,
              background: tab === "communication" ? colors.primary.main : colors.base.surface,
              color: tab === "communication" ? colors.text.inverse : colors.text.secondary,
              border: tab === "communication" ? "none" : `1px solid ${colors.base.border}`,
              borderRadius: borderRadius.sm,
              fontWeight: typography.fontWeight.semibold,
              fontSize: typography.fontSize.caption,
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: spacing.xs,
              minHeight: '60px',
            }}
          >
            <svg width="20" height="20" viewBox="0 0 28 28" fill="none">
              <path d="M23 17a2 2 0 0 1-2 2H9l-4 4V7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" fill={tab === "communication" ? "rgba(255,255,255,0.2)" : colors.primary.light} />
              <path d="M23 17a2 2 0 0 1-2 2H9l-4 4V7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>Communication</span>
          </button>
          <button
            onClick={() => setTab("files")}
            style={{
              padding: `${spacing.md} ${spacing.xs}`,
              background: tab === "files" ? colors.primary.main : colors.base.surface,
              color: tab === "files" ? colors.text.inverse : colors.text.secondary,
              border: tab === "files" ? "none" : `1px solid ${colors.base.border}`,
              borderRadius: borderRadius.sm,
              fontWeight: typography.fontWeight.semibold,
              fontSize: typography.fontSize.caption,
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: spacing.xs,
              minHeight: '60px',
            }}
          >
            <svg width="20" height="20" viewBox="0 0 28 28" fill="none">
              <path d="M15 4H8a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V11z" fill={tab === "files" ? "rgba(255,255,255,0.2)" : colors.primary.light} />
              <path d="M15 4H8a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V11z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <polyline points="15 4 15 11 22 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>Files</span>
          </button>
        </div>

        {tab === "overview" && <OverviewTab contract={contract} />}
        {tab === "milestones" && <MilestonesTab />}
        {tab === "communication" && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.lg }}>
            <ChatTab />
            <ActivityTab />
          </div>
        )}
        {tab === "files" && <FilesTab />}
      </div>
    </div>
  );
}
