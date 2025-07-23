import { Calendar, Home, Inbox, Search, Settings } from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"

const items = [
    {
        title: "All",
        url: "/test-cases",
    },
    {
        title: "Jobs",
        url: "/test-cases/features/jobs",
    },
    {
        title: "Requisitions",
        url: "/test-cases/features/requisitions",
    },
    {
        title: "Candidates",
        url: "/test-cases/features/candidates",
    },
    {
        title: "Workflows",
        url: "/test-cases/features/workflows",
    },
    {
        title: "Skills",
        url: "/test-cases/features/skills",
    },
    {
        title: "Kit Templates",
        url: "/test-cases/features/kit-templates",
    },
    {
        title: "Industry",
        url: "/test-cases/features/industry",
    },
]

export function AppSidebar() {
    return (
        <Sidebar>
            <SidebarHeader>
                <h1 className="text-2xl font-black">TestCases</h1>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Application</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu className="ml-4">
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <a href={item.url}>
                                            <span>{item.title}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}