import { useState } from "react";
import { TestCasesService } from "@/lib/services/test-case.service";
import { TestCase } from '../types/test-case';

export const useTestCases = () => {
    const [testCases, setTestCases] = useState<TestCase[]>([]);
    const [testCase, setTestCase] = useState<TestCase | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchTestCases = async () => {
        setLoading(true);
        try {
            const data = await TestCasesService.getAll();
            setTestCases(data);
        } catch (err) {
            setError('Failed to fetch test cases');
        } finally {
            setLoading(false);
        }
    };

    const fetchTestCase = async (id: string) => {
        setLoading(true);
        try {
            const data = await TestCasesService.getById(id);
            console.log({ data });
            setTestCase(data);
        } catch (err) {
            console.log('Error fetching Test Case', err);
            setError('Failed to fetch test cases');
            setTestCase(null)
        } finally {
            setLoading(false);
        }
    };

    const createTestCase = async (testCase: Omit<TestCase, 'id'>) => {
        try {
            const newCase = await TestCasesService.create(testCase);
            setTestCases([...testCases, newCase]);
        } catch (err) {
            console.log('Failed to create test case', err)
            setError('Failed to create test case');
        }
    }
    return { testCase, testCases, loading, error, fetchTestCase, fetchTestCases, createTestCase };
}