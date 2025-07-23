"use client";
import { Badge } from "@/components/ui/badge";
import { SyntaxHighlighter } from "@/components/features/test-cases/poc-gherkin/syntax-highlighter";

const mockTestCase = {
    id: 1,
    title: "Verify that a user can complete purchase",
    feature: "Checkout Process",
    status: "passed",
    automation_status: "automated",
    description: "Ensure users can successfully complete purchases with valid payment info.",
    tags: ["Critical", "E2E"],
    test_steps: [
        {
            id: 1,
            action: "Given am logged in as a registered user",
        },
        {
            id: 2,
            action: "And have items in my cart",
        },
        {
            id: 3,
            action: "When proceed to checkout",
        },
        {
            id: 4,
            action: "And enter valid payment information",
        },
        {
            id: 5,
            action: "Then should see order confirmation",
        }
    ]
};

export default function TestCaseDetail() {
    // Convertir steps a formato Gherkin
    const gherkinSteps = mockTestCase.test_steps.map(step => {
        const keyword = step.action.startsWith('And') ? 'And' :
            step.action.startsWith('Then') ? 'Then' :
                step.action.startsWith('When') ? 'When' : 'Given';
        return `  ${keyword} ${step.action.replace(/^(Given|When|Then|And)\s*/i, '')}`;
    }).join('\n');

    const gherkinFeature = `
Feature: ${mockTestCase.feature}
  ${mockTestCase.description}

Scenario: ${mockTestCase.title}
${gherkinSteps}
  `.trim();

    return (
        <section className="max-w-4xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-4">{mockTestCase.title}</h1>
            <div className="flex flex-wrap gap-2 mb-6">
                <Badge variant="outline">{mockTestCase.feature}</Badge>
                <Badge className="bg-green-600">
                    {mockTestCase.status.toUpperCase()}
                </Badge>
                {mockTestCase.tags.map(tag => (
                    <Badge key={tag} variant={tag === 'Critical' ? "destructive" : "secondary"}>{tag}</Badge>
                ))}
                <Badge variant="outline">
                    {mockTestCase.automation_status.toUpperCase()}
                </Badge>
            </div>

            <p className="text-lg mb-8">{mockTestCase.description}</p>

            <h2 className="text-xl font-semibold mb-4">Test Steps</h2>
            <div className="rounded-lg border overflow-hidden">
                <SyntaxHighlighter
                    code={gherkinFeature}
                    language="gherkin"
                    showLineNumbers={false}
                />
            </div>
        </section>
    );
}