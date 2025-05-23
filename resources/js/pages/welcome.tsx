import { FeatureCard } from '@/components/feature-card';
import { PricingCard } from '@/components/pricing-card';
import { TestimonialCard } from '@/components/testimonial-card';
import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';

const features = [
    {
        icon: 'LayoutDashboard',
        title: 'Intuitive Dashboard',
        description: 'Get a clear overview of your tasks, projects, and deadlines at a glance.',
    },
    {
        icon: 'CheckSquare',
        title: 'Task Management',
        description: 'Create, assign, and track tasks with priorities, due dates, and status updates.',
    },
    {
        icon: 'FolderKanban',
        title: 'Project Organization',
        description: 'Group related tasks into projects and track progress with visual indicators.',
    },
    {
        icon: 'Users',
        title: 'Team Collaboration',
        description: 'Invite team members, assign tasks, and communicate effectively.',
    },
    {
        icon: 'Bell',
        title: 'Notifications & Reminders',
        description: 'Never miss a deadline with timely notifications and reminders.',
    },
    {
        icon: 'BarChart',
        title: 'Progress Tracking',
        description: 'Monitor productivity and project completion with detailed analytics.',
    },
];

const testimonials = [
    {
        quote: 'TaskMaster has completely transformed how our team manages projects. The intuitive interface and powerful features have boosted our productivity by 30%.',
        author: 'Sarah Johnson',
        role: 'Product Manager',
        company: 'TechCorp',
    },
    {
        quote: "As a freelancer juggling multiple clients, TaskMaster keeps me organized and on track. I can't imagine working without it now.",
        author: 'Michael Chen',
        role: 'Freelance Designer',
        company: 'Self-employed',
    },
    {
        quote: "The project tracking features are exceptional. We've reduced missed deadlines by 45% since implementing TaskMaster across our organization.",
        author: 'Emily Rodriguez',
        role: 'Operations Director',
        company: 'Global Solutions',
    },
];

const pricingPlans = [
    {
        title: 'Free',
        price: '$0',
        description: 'Perfect for individuals getting started',
        features: ['Up to 10 tasks', 'Basic task management', '1 project', 'Personal dashboard'],
        buttonText: 'Get Started',
        buttonVariant: 'outline',
    },
    {
        title: 'Pro',
        price: '$12',
        description: 'Ideal for professionals and small teams',
        features: ['Unlimited tasks', 'Advanced task management', 'Up to 10 projects', 'Team collaboration', 'Priority support'],
        buttonText: 'Start Free Trial',
        buttonVariant: 'default',
        popular: true,
    },
    {
        title: 'Enterprise',
        price: '$49',
        description: 'For organizations with advanced needs',
        features: ['Unlimited everything', 'Advanced analytics', 'Custom integrations', 'Dedicated support', 'SSO & advanced security'],
        buttonText: 'Contact Sales',
        buttonVariant: 'outline',
    },
];

const productLinks = [
    { label: 'Features', href: '#' },
    { label: 'Pricing', href: '#' },
    { label: 'Integrations', href: '#' },
    { label: 'Changelog', href: '#' },
];

const resourceLinks = [
    { label: 'Documentation', href: '#' },
    { label: 'Guides', href: '#' },
    { label: 'Support', href: '#' },
    { label: 'API', href: '#' },
];

const companyLinks = [
    { label: 'About', href: '#' },
    { label: 'Blog', href: '#' },
    { label: 'Careers', href: '#' },
    { label: 'Contact', href: '#' },
];

const legalLinks = [
    { label: 'Terms', href: '#' },
    { label: 'Privacy', href: '#' },
    { label: 'Cookies', href: '#' },
    { label: 'Licenses', href: '#' },
];

export default function LandingPage() {
    return (
        <div className="flex min-h-screen flex-col">
            {/* Hero Section */}
            <section className="flex w-full items-center justify-center bg-gradient-to-b from-white to-zinc-400 py-20 md:py-32 lg:py-40 dark:from-black dark:to-zinc-900">
                <div className="container px-4 md:px-6">
                    <div className="flex flex-col items-center space-y-10 text-center">
                        <div className="max-w-3xl space-y-4">
                            <h1 className="text-4xl font-bold tracking-tighter text-zinc-900 md:text-5xl lg:text-6xl dark:text-white">
                                Manage tasks efficiently with TaskMaster
                            </h1>
                            <p className="mx-auto max-w-[700px] text-xl text-zinc-500 dark:text-zinc-400">
                                The all-in-one task management solution for teams and individuals. Stay organized, meet deadlines, and boost
                                productivity.
                            </p>
                        </div>
                        <div className="flex flex-col gap-4 sm:flex-row">
                            <Button
                                asChild
                                size="lg"
                                className="bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
                            >
                                <Link href="/register">Get Started</Link>
                            </Button>
                            <Button
                                asChild
                                size="lg"
                                variant="outline"
                                className="border-neutral-200 bg-zinc-900 text-white hover:bg-zinc-800 hover:text-white dark:border-zinc-700 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
                            >
                                <Link href={route('login')}>
                                    Sign In
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>
                        </div>
                        <div className="relative mx-auto mt-10 w-full max-w-5xl">
                            <div className="aspect-[16/9] overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950 shadow-2xl">
                                <img
                                    src="/placeholder.svg?height=1080&width=1920"
                                    alt="TaskMaster Dashboard"
                                    className="h-full w-full object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="w-full bg-zinc-100 py-20 dark:bg-black">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="mb-12 flex flex-col items-center space-y-4 text-center">
                        <h2 className="text-3xl font-bold tracking-tighter text-black dark:text-white">
                            Powerful Features for Seamless Task Management
                        </h2>
                        <p className="max-w-[700px] text-zinc-500">Everything you need to manage your tasks and projects efficiently in one place.</p>
                    </div>
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {features.map((feature, index) => (
                            <FeatureCard key={index} icon={feature.icon} title={feature.title} description={feature.description} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="flex w-full items-center justify-center bg-zinc-200 py-20 dark:bg-zinc-950">
                <div className="container px-4 md:px-6">
                    <div className="mb-12 flex flex-col items-center space-y-4 text-center">
                        <h2 className="text-3xl font-bold tracking-tighter text-black dark:text-white">Trusted by Teams Worldwide</h2>
                        <p className="max-w-[700px] text-zinc-600 dark:text-zinc-400">
                            See what our users have to say about how TaskMaster has transformed their workflow.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                        {testimonials.map((testimonial, index) => (
                            <TestimonialCard
                                key={index}
                                quote={testimonial.quote}
                                author={testimonial.author}
                                role={testimonial.role}
                                company={testimonial.company}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <section className="flex w-full items-center justify-center bg-zinc-100 py-20 dark:bg-black">
                <div className="container px-4 md:px-6">
                    <div className="mb-12 flex flex-col items-center space-y-4 text-center">
                        <h2 className="text-3xl font-bold tracking-tighter text-black dark:text-white">Simple, Transparent Pricing</h2>
                        <p className="max-w-[700px] text-zinc-400">Choose the plan that's right for you or your team.</p>
                    </div>
                    <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-3">
                        {pricingPlans.map((plan, index) => (
                            <PricingCard
                                key={index}
                                title={plan.title}
                                price={plan.price}
                                description={plan.description}
                                features={plan.features}
                                buttonText={plan.buttonText}
                                buttonVariant={plan.buttonVariant as 'default' | 'outline'}
                                popular={plan.popular}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="flex w-full items-center justify-center bg-gradient-to-t from-white to-zinc-400 py-20 dark:from-black dark:to-zinc-900">
                <div className="container px-4 md:px-6">
                    <div className="mx-auto flex max-w-3xl flex-col items-center space-y-6 text-center">
                        <h2 className="text-3xl font-bold tracking-tighter text-black dark:text-white">Ready to boost your productivity?</h2>
                        <p className="text-zinc-600 dark:text-zinc-400">
                            Join thousands of users who have transformed their task management with TaskMaster.
                        </p>
                        <Button
                            asChild
                            size="lg"
                            className="bg-black text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
                        >
                            <Link href="/register">Get Started for Free</Link>
                        </Button>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="flex w-full items-center justify-center border-t border-zinc-200 bg-white py-12 dark:border-zinc-900 dark:bg-zinc-950">
                <div className="container px-4 md:px-6">
                    <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
                        <div className="space-y-4">
                            <h3 className="text-lg font-medium text-white">Product</h3>
                            <ul className="space-y-2">
                                {productLinks.map((link, index) => (
                                    <li key={index}>
                                        <Link href={link.href} className="text-zinc-600 hover:text-black dark:text-zinc-400 dark:hover:text-white">
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="space-y-4">
                            <h3 className="text-lg font-medium text-white">Resources</h3>
                            <ul className="space-y-2">
                                {resourceLinks.map((link, index) => (
                                    <li key={index}>
                                        <Link href={link.href} className="text-zinc-600 hover:text-black dark:text-zinc-400 dark:hover:text-white">
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="space-y-4">
                            <h3 className="text-lg font-medium text-white">Company</h3>
                            <ul className="space-y-2">
                                {companyLinks.map((link, index) => (
                                    <li key={index}>
                                        <Link href={link.href} className="text-zinc-600 hover:text-black dark:text-zinc-400 dark:hover:text-white">
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="space-y-4">
                            <h3 className="text-lg font-medium text-white">Legal</h3>
                            <ul className="space-y-2">
                                {legalLinks.map((link, index) => (
                                    <li key={index}>
                                        <Link href={link.href} className="text-zinc-600 hover:text-black dark:text-zinc-400 dark:hover:text-white">
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="mt-12 flex flex-col items-center justify-between border-t border-zinc-900 pt-8 md:flex-row">
                        <p className="text-sm text-zinc-600 dark:text-zinc-400">© 2025 TaskMaster. All rights reserved.</p>
                        <div className="mt-4 flex space-x-4 md:mt-0">
                            <Link href="#" className="text-zinc-600 hover:text-black dark:text-zinc-400 dark:hover:text-white">
                                <span className="sr-only">Twitter</span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="h-5 w-5"
                                >
                                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                                </svg>
                            </Link>
                            <Link href="#" className="dark:hover:text-whitee text-zinc-600 hover:text-black dark:text-zinc-400">
                                <span className="sr-only">GitHub</span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="h-5 w-5"
                                >
                                    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
                                    <path d="M9 18c-4.51 2-5-2-7-2"></path>
                                </svg>
                            </Link>
                            <Link href="#" className="text-zinc-600 hover:text-black dark:text-zinc-400 dark:hover:text-white">
                                <span className="sr-only">LinkedIn</span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="h-5 w-5"
                                >
                                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                                    <rect width="4" height="12" x="2" y="9"></rect>
                                    <circle cx="4" cy="4" r="2"></circle>
                                </svg>
                            </Link>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
