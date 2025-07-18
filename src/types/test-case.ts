type TestCaseStatus = "passed" | "failed" | "pending" | "blocked"
type TestCaseAutomationStatus = "automated" | "manual" | "deprecated"
type TestStepStatus = TestCaseStatus | "skipped" | "not_executed"

export interface TestStep {
    action?: string;
    expected?: string;
    status?: TestStepStatus;
}

export interface TestCase {
    id: number;
    title: string;
    feature?: string;
    status: TestCaseStatus;
    automationStatus: TestCaseAutomationStatus;
    description?: string;
    tags?: string[];
    steps?: TestStep[]
}