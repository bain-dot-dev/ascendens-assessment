import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function RecentActivity() {
    const activities = [
        {
            id: 1,
            user: { name: 'Alex', initials: 'AS' },
            action: 'completed',
            task: 'Website redesign',
            time: '2 hours ago',
        },
        {
            id: 2,
            user: { name: 'Taylor', initials: 'TJ' },
            action: 'commented on',
            task: 'Mobile app development',
            time: '5 hours ago',
        },
        {
            id: 3,
            user: { name: 'Jordan', initials: 'JL' },
            action: 'created',
            task: 'API integration',
            time: 'Yesterday',
        },
    ];

    return (
        <Card className="bg-neutral-100/40 dark:border-zinc-800 dark:bg-zinc-900">
            <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-zinc-950 dark:text-zinc-100">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {activities.map((activity) => (
                        <div key={activity.id} className="flex items-start space-x-3">
                            <Avatar className="h-8 w-8">
                                <AvatarImage src={`/placeholder.svg?height=32&width=32`} />
                                <AvatarFallback className="bg-neutral-300 dark:bg-zinc-800 dark:text-zinc-400">
                                    {activity.user.initials}
                                </AvatarFallback>
                            </Avatar>
                            <div className="space-y-1">
                                <p className="text-sm text-zinc-700 dark:text-zinc-100">
                                    <span className="font-medium">{activity.user.name}</span> <span className="text-zinc-500">{activity.action}</span>{' '}
                                    <span className="font-medium">{activity.task}</span>
                                </p>
                                <p className="text-xs text-zinc-500">{activity.time}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
