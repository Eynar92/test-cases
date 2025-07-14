type TestCaseStatus = "passed" | "failed" | "pending"
type TestStepStatus = TestCaseStatus | "skipped" | "not_executed"

interface TestStep {
    action: string;
    expected: string;
    status: TestStepStatus;
}

export interface TestCase {
    id: number;
    title: string;
    feature: string;
    status: TestCaseStatus;
    description?: string;
    tags: string[];
    steps?: TestStep[]
}