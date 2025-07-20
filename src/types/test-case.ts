type TestCaseStatus = "passed" | "failed" | "pending" | "blocked"
type TestCaseAutomationStatus = "automated" | "manual" | "deprecated"
type TestStepStatus = TestCaseStatus | "skipped" | "not_executed"

export interface TestStep {
    id?: number;
    action?: string;
    expected?: string;
    status?: TestStepStatus;
    step_order?: number;
    test_case_id?: number;
}

export interface TestCase {
    id: number;
    title: string;
    feature?: string;
    status: TestCaseStatus;
    automation_status: TestCaseAutomationStatus;
    description?: string;
    tags?: string[];
    test_steps?: TestStep[]
}