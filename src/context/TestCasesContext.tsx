"use client"

import { createContext, useContext, useState } from "react"
import { mockTestCases } from "@/data/mock-test-cases"
import { TestCase } from "@/types/test-case"

type TestCaseContextType = {
    testCases: TestCase[];
    setTestCases: (testCases: TestCase[]) => void
}

const TestCasesContext = createContext<TestCaseContextType>({
    testCases: [],
    setTestCases: () => []
})

export function TestCasesProvider({ children }: { children: React.ReactNode }) {
    const [testCases, setTestCases] = useState<TestCase[]>(mockTestCases);

    return (
        <TestCasesContext.Provider value={{ testCases, setTestCases }}>
            {children}
        </TestCasesContext.Provider>
    )
}

export function useTestCases() {
    return useContext(TestCasesContext)
}