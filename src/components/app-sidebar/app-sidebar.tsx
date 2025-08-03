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
    SidebarTrigger,
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
        <Sidebar collapsible="icon">
            <SidebarHeader className="flex-row items-center justify-between gap-0 overflow-hidden">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                    <h1 className="text-2xl font-black">
                        <span className="size-8">SES</span>Busters</h1>
                </div>
                <SidebarTrigger />
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup className="w-full">
                    <SidebarGroupLabel>Application</SidebarGroupLabel>
                    <SidebarGroupContent className="w-full">
                        <SidebarMenu className="ml-4 w-auto">
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