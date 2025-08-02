import { supabase } from "../supabase/client";

export interface HttpClient {
    get<T>(
        endpoint: string,
        id?: string,
        options?: {
            join?: { table: string; on: string };
            filters?: Record<string, any>;
        }): Promise<T>;
    post<T>(endpoint: string, body: unknown): Promise<T>;
    put<T>(endpoint: string, id: string, body: unknown): Promise<T>;
    delete(endpoint: string, id: number): Promise<void>;
}

export class SupabaseHttpClient implements HttpClient {
    async get<T>(
        endpoint: string,
        id?: string,
        options?: {
            join?: { table: string; on: string };
            filters: Record<string, any>;
        }
    ): Promise<T> {
        let query = supabase
            .from(endpoint)
            .select<string, any>(options?.join ? `*, ${options.join.table}(*)` : "*");

        if (id) {
            query = query.eq("id", id);
        }

        if (options?.filters) {
            Object.entries(options.filters).forEach(([key, value]) => {
                query = query.eq(key, value)
            });
        }

        const { data, error } = await query;
        if (error) throw error;

        return (id ? data[0] : data) as T;
    }

    async post<T>(endpoint: string, body: unknown): Promise<T> {
        const { data, error } = await supabase.from(endpoint).insert(body).select().single();
        if (error) throw error;
        return data as T;
    }

    async put<T>(endpoint: string, id: string, body: unknown): Promise<T> {
        const { data, error } = await supabase
            .from(endpoint)
            .update(body)
            .eq('id', id)
            .select()
            .single();
        if (error) throw error;
        return data as T;
    }

    async delete(endpoint: string, id: number): Promise<void> {
        const { error } = await supabase
            .from(endpoint)
            .delete()
            .eq('id', id)
        if (error) throw error;
    }
}

export const httpClient: HttpClient = new SupabaseHttpClient();