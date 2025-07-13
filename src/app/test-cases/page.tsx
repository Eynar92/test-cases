import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card"
import { mockTestCases } from "@/data/mock-test-cases"

export default function TestCases() {

    const testCases = mockTestCases

    return (
        <main className="px-4 py-4 sm:px-8 lg:px-16">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {
                    testCases.map(test => (
                        <Card key={test.id} className="hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <div className="flex justify-between">
                                    <CardTitle>{test.title}</CardTitle>
                                    <Badge
                                        className={
                                            test.status === "passed"
                                                ? 'bg-green-600'
                                                : test.status === 'failed'
                                                    ? 'bg-red-600'
                                                    : 'bg-yellow-600'
                                        }
                                    >
                                        {test.status.toUpperCase()}
                                    </Badge>
                                </div>
                                <CardDescription className="line-clamp-2">
                                    <p>{test.description}</p>
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-wrap gap-2">
                                    <Badge>{test.feature}</Badge>
                                    {
                                        test.tags.map(tag => (
                                            <Badge
                                                key={tag}
                                                variant="outline"
                                            >
                                                {tag}
                                            </Badge>
                                        ))
                                    }
                                </div>
                            </CardContent>
                            <CardFooter className="flex justify-end">
                                <Button
                                    variant="link"
                                >
                                    View Details
                                </Button>
                            </CardFooter>
                        </Card>
                    ))
                }
            </div>
        </main>
    )
}
