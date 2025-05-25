// resources/js/pages/projects/index.tsx
import { Head, usePage } from '@inertiajs/react';
import axios from 'axios';
import { Plus } from 'lucide-react';
import { useState } from 'react';

import { ProjectList } from '@/components/project-list';
import { ProjectModal } from '@/components/project-modal';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { AxiosError } from 'axios';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Projects',
        href: '/projects',
    },
];

type Project = {
    id: string;
    name: string;
    description: string;
    progress: number;
    status: 'Planning' | 'In Progress' | 'On Hold' | 'Completed' | 'Cancelled';
    tasks: {
        completed: number;
        total: number;
    };
    members: {
        initials: string;
    }[];
    due_date: string; // <-- from backend it's a string, not a Date object
};

export default function Index() {
    // Define the expected shape of the page props
    type PageProps = {
        projects: Project[];
        [key: string]: unknown;
    };

    // Safely extract and verify projects is an array
    const { projects: rawProjects } = usePage<PageProps>().props;
    const initialProjects: Project[] = Array.isArray(rawProjects) ? rawProjects : [];

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [projectList, setProjectList] = useState<Project[]>(initialProjects);

    const handleSubmit = async (data: { name: string; description: string; status: Project['status']; due_date: Date }) => {
        try {
            const payload = {
                ...data,
                due_date: data.due_date.toISOString().split('T')[0],
            };

            let response;
            if (selectedProject) {
                // Add validation to ensure we have a valid ID
                if (!selectedProject.id) {
                    throw new Error('Project ID is required for updates');
                }
                console.log('Updating project with ID:', selectedProject.id);
                response = await axios.put(`/projects/${selectedProject.id}`, payload);
                console.log('Update response:', response.data);
            } else {
                console.log('Creating new project');
                response = await axios.post('/projects', payload);
                console.log('Create response:', response.data);
            }

            // Show success message
            alert(response.data.message || 'Operation completed successfully');

            // Refresh the project list after submission
            await refreshProjectList();
            
            // Reset state after submission
            setIsModalOpen(false);
            setSelectedProject(null);
        } catch (error) {
            console.error('Submit error:', error);
            const err = error as AxiosError<{ errors?: Record<string, string[]>; message?: string }>;

            if (err.response?.status === 422) {
                console.error('Validation errors:', err.response.data.errors);
                const errors = err.response.data.errors;
                if (errors) {
                    const errorMessages = Object.entries(errors)
                        .map(([field, messages]) => `${field}: ${messages.join(', ')}`)
                        .join('\n');
                    alert(`Validation errors:\n${errorMessages}`);
                } else {
                    alert('Validation error occurred');
                }
            } else {
                const message = err.response?.data?.message || err.message || 'An unexpected error occurred';
                alert(`Error: ${message}`);
            }
        }
    };

    const handleEdit = (project: Project) => {
        console.log('Editing project:', project); // Debug log
        if (!project || !project.id) {
            console.error('Invalid project data for editing:', project);
            alert('Error: Invalid project data');
            return;
        }
        setSelectedProject(project);
        setIsModalOpen(true);
    };

    const handleDelete = async (id: string) => {
        // Add validation to ensure we have a valid ID
        if (!id || id.trim() === '') {
            console.error('Invalid project ID for deletion:', id);
            alert('Error: Invalid project ID');
            return;
        }

        console.log('=== DELETE DEBUG INFO ===');
        console.log('Project ID received:', id);
        console.log('Project ID type:', typeof id);
        console.log('Project ID length:', id.length);
        console.log('Constructed URL:', `/projects/${id}`);
        console.log('========================');
        
        if (confirm('Are you sure you want to delete this project?')) {
            try {
                console.log('Making DELETE request to:', `/projects/${id}`);
                const response = await axios.delete(`/projects/${id}`);
                console.log('Delete response:', response.data);
                
                // Show success message
                alert(response.data.message || 'Project deleted successfully');
                
                // Refresh the project list to get updated data from server
                await refreshProjectList();
                
                console.log('Project deleted and list refreshed');
            } catch (error) {
                console.error('=== DELETE ERROR DEBUG ===');
                console.error('Full error object:', error);
                const err = error as AxiosError<{ message?: string }>;
                console.error('Error config:', err.config);
                console.error('Error response:', err.response);
                console.error('Request URL:', err.config?.url);
                console.error('Request method:', err.config?.method);
                console.error('=============================');
                
                const message = err.response?.data?.message || err.message || 'An unexpected error occurred';
                
                if (err.response?.status === 404) {
                    alert('Project not found. It may have already been deleted.');
                    // Refresh list in case it was deleted by someone else
                    await refreshProjectList();
                } else if (err.response?.status === 405) {
                    alert(`Delete operation not allowed. URL: ${err.config?.url}, Method: ${err.config?.method}`);
                } else {
                    alert(`Error deleting project: ${message}`);
                }
            }
        }
    };

    const refreshProjectList = async () => {
        try {
            console.log('Refreshing project list...');
            const response = await axios.get('/projects');
            console.log('Raw response from /projects:', response);
            
            // Handle both array response (from AJAX) and object response (from Inertia)
            let updated: Project[];
            if (Array.isArray(response.data)) {
                updated = response.data;
            } else if (response.data.projects && Array.isArray(response.data.projects)) {
                updated = response.data.projects;
            } else {
                console.warn('Unexpected response format:', response.data);
                updated = [];
            }
            
            console.log('Processed project list:', updated);
            console.log('Sample project structure:', updated[0]);
            setProjectList(updated);
        } catch (error) {
            console.error('Error refreshing project list:', error);
            const err = error as AxiosError<{ message?: string }>;
            const message = err.response?.data?.message || err.message || 'Failed to refresh project list';
            alert(`Error refreshing projects: ${message}`);
        }
    };

    // Add a function to test your routes
    const testRoutes = async () => {
        try {
            console.log('=== TESTING ROUTES ===');
            
            // Test if we can access the projects endpoint
            const getResponse = await axios.get('/projects');
            console.log('GET /projects works:', getResponse.status);
            
            // Test what happens if we try to access a specific project
            if (projectList.length > 0) {
                const testId = projectList[0].id;
                console.log('Testing with project ID:', testId);
                
                try {
                    const getOneResponse = await axios.get(`/projects/${testId}`);
                    console.log(`GET /projects/${testId} works:`, getOneResponse.status);
                } catch (err) {
                    console.log(`GET /projects/${testId} failed:`, (err as AxiosError).response?.status);
                }
                
                // Test OPTIONS request to see what methods are allowed
                try {
                    const optionsResponse = await axios.options(`/projects/${testId}`);
                    console.log(`OPTIONS /projects/${testId}:`, optionsResponse.headers);
                } catch (err) {
                    console.log('OPTIONS request failed:', err);
                }
            }
            
            console.log('===================');
        } catch (error) {
            console.error('Route testing failed:', error);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Projects" />
            <div className="space-y-6 p-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold text-white">Projects</h1>

                    <div className="flex gap-2">
                        <Button
                            variant="outline"
                            onClick={testRoutes}
                            className="text-sm"
                        >
                            Test Routes
                        </Button>
                        <Button
                            onClick={() => {
                                setSelectedProject(null);
                                setIsModalOpen(true);
                            }}
                        >
                            <Plus className="mr-2 h-4 w-4" />
                            New Project
                        </Button>
                    </div>
                </div>

                <ProjectModal
                    open={isModalOpen}
                    onClose={() => {
                        setIsModalOpen(false);
                        setSelectedProject(null);
                    }}
                    onSubmit={handleSubmit}
                    initialData={
                        selectedProject
                            ? {
                                  name: selectedProject.name,
                                  description: selectedProject.description,
                                  status: selectedProject.status,
                                  due_date: new Date(selectedProject.due_date),
                              }
                            : undefined
                    }
                />

                <div className="rounded-lg bg-neutral-100 p-6 dark:bg-zinc-900">
                    <ProjectList projects={projectList} onEdit={handleEdit} onDelete={handleDelete} />
                </div>
            </div>
        </AppLayout>
    );
}