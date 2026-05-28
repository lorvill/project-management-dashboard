export interface DashboardSummary {
    activeProjects: number
    completedTasks: number
    totalTasks: number
    runningTimers: number
}

export interface DashboardProject {
    id: number
    name: string
    company: string
    progress: number
    status: string
}

export interface DashboardTask {
    id: number
    title: string
    done: boolean
}

export interface DashboardData {
    summary: DashboardSummary
    projects: DashboardProject[]
    tasks: DashboardTask[]
}

const sleep = (ms: number) => {
    return new Promise(resolve => setTimeout(resolve, ms))
}

export const getDashboard = async (): Promise<DashboardData> => {
    await sleep(2000)

    return {
        summary: {
            activeProjects: 2,
            completedTasks: 3,
            totalTasks: 7,
            runningTimers: 1,
        },

        projects: [
            {
                id: 1,
                name: 'Google',
                company: 'Google Inc.',
                progress: 50,
                status: 'In Progress',
            },
            {
                id: 2,
                name: 'Slack',
                company: 'Slack Corporation',
                progress: 100,
                status: 'Completed',
            },
        ],

        tasks: [
            {
                id: 1,
                title: 'Create wireframe',
                done: false,
            },
            {
                id: 2,
                title: 'Dashboard design',
                done: false,
            },
            {
                id: 3,
                title: 'Google logo design',
                done: true,
            },
        ],
    }
}