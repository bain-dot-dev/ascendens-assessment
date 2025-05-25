import { ProjectMembersManager } from "@/components/project-members-manager"
import AppLayout from "@/layouts/app-layout";
import { type BreadcrumbItem } from '@/types';
import { Head } from "@inertiajs/react";


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Project Members',
        href: '/projects/[id]/members',
    },
];

interface ProjectMembersPageProps {
  params: {
    id: string
  }
}

export default function Index({ params }: ProjectMembersPageProps) {
  return (
     <AppLayout breadcrumbs={breadcrumbs}>
        <Head title="Project Members" />
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Project Members</h1>
          <p className="text-zinc-400">Manage team members and their roles for this project</p>
        </div>
      </div>

      <ProjectMembersManager projectId={params.id} />
    </div>
    </AppLayout>
  )
}
