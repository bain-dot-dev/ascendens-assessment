import { DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { UserInfo } from '@/components/user-info';
import { useMobileNavigation } from '@/hooks/use-mobile-navigation';
import { type User } from '@/types';
import { Link, router } from '@inertiajs/react';
import { LogOut, Settings } from 'lucide-react';

interface UserMenuContentProps {
    user: User;
}

export function UserMenuContent({ user }: UserMenuContentProps) {
    const cleanup = useMobileNavigation();

    // const handleLogout = () => {
    //     cleanup();
    //     router.flushAll();
    // };

    // const handleLogout = async (e: React.MouseEvent) => {
    //     e.preventDefault();
    //     cleanup();

    //     await router.post(
    //         route('logout'),
    //         {},
    //         {
    //             onSuccess: async () => {
    //                 const res = await axios.get('/csrf-token');
    //                 const token = res.data.token;

    //                 axios.defaults.headers.common['X-CSRF-TOKEN'] = token;
    //                 document.querySelector('meta[name="csrf-token"]')?.setAttribute('content', token);
    //             },
    //         },
    //     );
    // };

    const handleLogout = async (e: React.MouseEvent) => {
        e.preventDefault();

        cleanup();

        await router.post(
            route('logout'),
            {},
            {
                onSuccess: async () => {
                    window.location.reload();
                },
            },
        );
    };

    return (
        <>
            <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                    <UserInfo user={user} showEmail={true} />
                </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
                <DropdownMenuItem asChild>
                    <Link className="block w-full" href={route('profile.edit')} as="button" prefetch onClick={cleanup}>
                        <Settings className="mr-2" />
                        Settings
                    </Link>
                </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
                {/* <Link className="block w-full" method="post" href={route('logout')} as="button" onClick={handleLogout}>
                    <LogOut className="mr-2" />
                    Log out
                </Link> */}
                <button onClick={handleLogout} className="block w-full">
                    <LogOut className="mr-2" />
                    Log out
                </button>
            </DropdownMenuItem>
        </>
    );
}
