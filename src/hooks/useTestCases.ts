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

    const fetchTestCasesByFeature = async (feature: string) => {
        setLoading(true);
        try {
            const data = await TestCasesService.getByFeature(feature);
            setTestCases(data);
        } catch (err) {
            setError('Failed to fetch test cases');
        } finally {
            setLoading(false);
        }
    }

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

    const updateTestCase = async (testCaseData: TestCase) => {
        setLoading(true);
        try {
            const updatedTestCase = await TestCasesService.update(
                testCaseData.id.toString(),
                testCaseData
            );

            setTestCases(prev => prev.map(tc =>
                tc.id === testCaseData.id ? updatedTestCase : tc
            ));
            setTestCase(updatedTestCase);

            return updatedTestCase;
        } catch (err) {
            console.error('Failed to update test case', err);
            setError('Failed to update test case');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const deleteTestCase = async (id: number) => {
        setLoading(true);
        try {
            const data = await TestCasesService.delete(id);
            console.log({ data })
        } catch (err) {
            setError('Failed to delete test case')
        } finally {
            setLoading(false)
        }
    }

    return {
        testCase,
        testCases,
        loading,
        error,
        fetchTestCase,
        fetchTestCases,
        fetchTestCasesByFeature,
        createTestCase,
        updateTestCase,
        deleteTestCase,
    };
}