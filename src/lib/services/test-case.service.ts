import { httpClient } from '../api/http-client';
import { TestCase, TestStep } from '../../types/test-case';
import { supabase } from '../supabase/client';

export const TestCasesService = {
    getAll: () => httpClient.get<TestCase[]>('test_cases'),
    getById: async (id: string): Promise<TestCase> => {
        const { data, error } = await supabase
            .from('test_cases')
            .select('*, test_steps(*)')
            .eq('id', id)
            .single()

        if (error || !data) throw new Error('Not found');
        return data
    },
    getByFeature: async (feature: string): Promise<TestCase[]> => {
        const { data, error } = await supabase
            .from('test_cases')
            .select('*')
            .eq('feature', feature)

        if (error || !data) throw new Error('Not found');
        return data
    },
    getWithSteps: async (id: string): Promise<TestCase> => {
        return httpClient.get<TestCase>("test_cases", id, {
            join: { table: "test_steps", on: "test_case_id" },
        });
    },
    create: async (testCase: Omit<TestCase, 'id' | 'steps'> & { steps?: Omit<TestStep, 'id'>[] }) => {
        const createdTestCase = await httpClient.post<TestCase>(
            'test_cases',
            { ...testCase, steps: undefined }
        );

        if (testCase.steps?.length) {
            await Promise.all(
                testCase.steps.map((step) =>
                    httpClient.post('test_steps', { ...step, test_case_id: createdTestCase.id })
                )
            );
        }

        return {
            ...createdTestCase,
            steps: testCase.steps || []
        }
    },
    update: (id: string, testCase: Partial<TestCase>) => httpClient.put<TestCase>('test_cases', id, testCase),
    delete: (id: string) => httpClient.delete('test_cases', id)
}