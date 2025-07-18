import { TestCase } from "@/types/test-case";

export const mockTestCases: TestCase[] = [
    {
        id: 1,
        title: "Candidate Application Submission",
        feature: "Application Workflow",
        status: "passed",
        automationStatus: "manual",
        description: "Verify candidates can successfully submit job applications.",
        tags: ["Critical", "Submission"],
        steps: [
            {
                action: "Fill required fields (name, email, resume)",
                expected: "Form accepts valid input",
                status: "passed"
            },
            {
                action: "Upload PDF resume (2MB)",
                expected: "File uploads successfully",
                status: "passed"
            },
            {
                action: "Click 'Submit Application'",
                expected: "Displays confirmation message",
                status: "passed"
            },
            {
                action: "Check applicant dashboard",
                expected: "Application appears in 'Submitted' status",
                status: "passed"
            }
        ]
    },
    {
        id: 2,
        title: "Recruiter Candidate Review",
        feature: "Recruiter Tools",
        status: "failed",
        automationStatus: "automated",
        description: "Validate recruiter workflow for reviewing candidates.",
        tags: ["Recruiter", "Review"],
        steps: [
            {
                action: "Login as recruiter",
                expected: "Access to candidate dashboard",
                status: "passed"
            },
            {
                action: "Filter candidates by 'Software Engineer' role",
                expected: "List filters to matching candidates",
                status: "passed"
            },
            {
                action: "Click candidate profile",
                expected: "Full application details load",
                status: "failed"
            },
            {
                action: "Add rating to candidate",
                expected: "Rating saves to candidate profile",
                status: "skipped"
            }
        ]
    },
    {
        id: 3,
        title: "Interview Scheduling",
        feature: "Scheduling",
        status: "pending",
        automationStatus: "manual",
        description: "Test calendar integration for interview scheduling.",
        tags: ["Calendar", "Integration"],
        steps: [
            {
                action: "Select candidate for interview",
                expected: "Scheduling modal appears",
                status: "not_executed"
            },
            {
                action: "Connect Google Calendar account",
                expected: "Calendar availability loads",
                status: "not_executed"
            },
            {
                action: "Send interview invitation",
                expected: "Candidate receives calendar invite",
                status: "not_executed"
            }
        ]
    },
    {
        id: 4,
        title: "Candidate Status Update",
        feature: "Workflow Automation",
        status: "passed",
        automationStatus: "manual",
        description: "Verify automated status updates trigger notifications.",
        tags: ["Notifications", "Automation"],
        steps: [
            {
                action: "Recruiter changes status to 'Interview'",
                expected: "Candidate receives email notification",
                status: "passed"
            },
            {
                action: "System logs status change",
                expected: "Timestamp and user recorded in audit log",
                status: "passed"
            },
            {
                action: "Check mobile push notification",
                expected: "Candidate receives mobile alert",
                status: "passed"
            }
        ]
    },
    {
        id: 5,
        title: "Reporting Dashboard",
        feature: "Analytics",
        status: "failed",
        automationStatus: "deprecated",
        description: "Validate recruitment metrics reporting.",
        tags: ["Data", "Reporting"],
        steps: [
            {
                action: "Generate 'Time-to-Hire' report",
                expected: "Chart displays accurate metrics",
                status: "passed"
            },
            {
                action: "Filter by department",
                expected: "Report updates with filtered data",
                status: "failed"
            },
            {
                action: "Export to CSV",
                expected: "Download contains all visible data",
                status: "skipped"
            }
        ]
    }
];