import { httpClient } from '../api/http-client';
import { TestCase, TestStep } from '../../types/test-case';
import { supabase } from '../supabase/client';

export const TestCasesService = {
    getAll: () => httpClient.get<TestCase[]>('test_cases'),
    getById: (id: string) => httpClient.get<TestCase>('test_cases', id, {
        join: { table: 'test_steps', on: 'test_case_id' }
    }),
    getByFeature: (feature: string) => httpClient.get<TestCase[]>('test_cases', undefined, {
        filters: { feature }
    }),
    getWithSteps: async (id: string): Promise<TestCase> => {
        return httpClient.get<TestCase>("test_cases", id, {
            join: { table: "test_steps", on: "test_case_id" },
        });
    },
    create: async (testCaseData: Omit<TestCase, 'id' | 'test_steps'> & { test_steps?: Omit<TestStep, 'id'>[] }) => {
        // 1. Crear el test case principal
        const createdTestCase = await httpClient.post<TestCase>(
            'test_cases',
            {
                title: testCaseData.title,
                feature: testCaseData.feature,
                status: testCaseData.status,
                automation_status: testCaseData.automation_status,
                description: testCaseData.description,
                tags: testCaseData.tags || []
            }
        );

        // 2. Crear los steps si existen
        if (testCaseData.test_steps?.length) {
            const stepsWithOrder = testCaseData.test_steps.map((step, index) => ({
                ...step,
                step_order: index + 1
            }));

            await Promise.all(
                stepsWithOrder.map(step =>
                    httpClient.post('test_steps', {
                        ...step,
                        test_case_id: createdTestCase.id
                    })
                )
            );
        }

        // 3. Obtener el test case completo con los steps
        return TestCasesService.getById(createdTestCase.id.toString());
    },

    update: async (id: string, testCaseData: Partial<TestCase> & { id: number; test_steps?: TestStep[] }) => {
        // 1. Actualizar el test case principal
        const updatedTestCase = await httpClient.put<TestCase>(
            'test_cases',
            id,
            {
                title: testCaseData.title,
                feature: testCaseData.feature,
                status: testCaseData.status,
                automation_status: testCaseData.automation_status,
                description: testCaseData.description,
                tags: testCaseData.tags
            }
        );

        // 2. Actualizar los steps si se proporcionaron
        if (testCaseData.test_steps) {
            await TestCasesService.updateSteps(testCaseData.id, testCaseData.test_steps);
        }

        // 3. Obtener el test case completo con los steps actualizados
        return TestCasesService.getById(id);
    },

    updateSteps: async (testCaseId: number, steps: TestStep[]) => {
        // 1. Obtener steps actuales
        const currentSteps = await httpClient.get<TestStep[]>('test_steps', undefined, {
            filters: { test_case_id: testCaseId }
        });

        // 2. Separar steps en operaciones
        const stepsToCreate = steps.filter(step => !step.id);
        const stepsToUpdate = steps.filter(step =>
            step.id && currentSteps.some(s => s.id === step.id)
        );
        const stepsToDelete = currentSteps.filter(currentStep =>
            !steps.some(step => step.id === currentStep.id)
        );

        // 3. Ejecutar operaciones
        await Promise.all([
            ...stepsToCreate.map((step, index) =>
                httpClient.post('test_steps', {
                    ...step,
                    test_case_id: testCaseId,
                    step_order: index + 1
                })
            ),
            ...stepsToUpdate.map(step =>
                httpClient.put('test_steps', step.id!.toString(), {
                    action: step.action,
                    expected: step.expected,
                    status: step.status,
                    step_order: step.step_order
                })
            ),
            ...stepsToDelete.map(step =>
                httpClient.delete('test_steps', step.id!)
            )
        ]);
    },

    delete: (id: number) => httpClient.delete('test_cases', id)
}