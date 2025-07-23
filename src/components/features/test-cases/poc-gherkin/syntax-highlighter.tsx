// components/syntax-highlighter.tsx
"use client";

import { Prism as BaseSyntaxHighlighter } from 'react-syntax-highlighter';
import { ghcolors } from 'react-syntax-highlighter/dist/cjs/styles/prism';

export function SyntaxHighlighter({
    code,
    language = 'text',
    showLineNumbers = false
}: {
    code: string;
    language?: string;
    showLineNumbers?: boolean;
}) {
    return (
        <BaseSyntaxHighlighter
            language={language}
            style={ghcolors}
            showLineNumbers={showLineNumbers}
            customStyle={{
                background: 'hsl(var(--muted))',
                padding: '1.5rem',
                fontSize: '0.95rem',
                margin: 0,
                border: 'none'
            }}
        >
            {code}
        </BaseSyntaxHighlighter>
    );
}