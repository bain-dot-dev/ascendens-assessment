import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from '@inertiajs/react';
import { CheckCircle } from 'lucide-react';

interface PricingCardProps {
    title: string;
    price: string;
    description: string;
    features: string[];
    buttonText: string;
    buttonVariant: 'default' | 'outline';
    popular?: boolean;
}

export function PricingCard({ title, price, description, features, buttonText, buttonVariant, popular = false }: PricingCardProps) {
    return (
        <Card
            className={`relative border-neutral-300 bg-zinc-200 dark:border-zinc-800 dark:bg-zinc-900 ${popular ? 'border-t-4 border-t-black dark:border-t-white' : ''}`}
        >
            {popular && (
                <div className="absolute top-0 right-0 translate-x-1/4 -translate-y-1/2 transform">
                    <span className="rounded-full bg-black px-3 py-1 text-xs font-medium text-white dark:bg-white dark:text-black">Most Popular</span>
                </div>
            )}
            <CardHeader>
                <CardTitle className="text-xl text-black dark:text-white">{title}</CardTitle>
                <div className="mt-2 flex items-baseline">
                    <span className="text-3xl font-bold text-black dark:text-white">{price}</span>
                    <span className="ml-1 text-zinc-700 dark:text-zinc-400">/month</span>
                </div>
                <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-400">{description}</p>
            </CardHeader>
            <CardContent className="space-y-6">
                <ul className="space-y-3">
                    {features.map((feature, i) => (
                        <li key={i} className="flex items-start">
                            <CheckCircle className="mr-2 h-5 w-5 shrink-0 text-green-500" />
                            <span className="text-sm text-zinc-600 dark:text-zinc-300">{feature}</span>
                        </li>
                    ))}
                </ul>
                <Button
                    asChild
                    className={`w-full ${
                        buttonVariant === 'default'
                            ? 'bg-black text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200'
                            : 'border-neutral-400 dark:border-zinc-700 bg-transparent text-black hover:bg-zinc-300 dark:hover:bg-zinc-800 dark:text-white'
                    }`}
                    variant={buttonVariant}
                >
                    <Link href="/register">{buttonText}</Link>
                </Button>
            </CardContent>
        </Card>
    );
}
