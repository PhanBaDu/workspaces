import { CircleDotDashed, LucideIcon } from 'lucide-react';

export interface Items {
    title: string;
    url: string;
    icon: LucideIcon;
}

export interface SidebarItem {
    label: string;
    items: Items[];
}

// Menu items.
export const items: SidebarItem[] = [
    {
        label: 'Coming soon...',
        items: [
            {
                title: 'Coming soon...',
                url: '#',
                icon: CircleDotDashed,
            },
            {
                title: 'Coming soon...',
                url: '#',
                icon: CircleDotDashed,
            },
            {
                title: 'Coming soon...',
                url: '#',
                icon: CircleDotDashed,
            },
            {
                title: 'Coming soon...',
                url: '#',
                icon: CircleDotDashed,
            },
            {
                title: 'Coming soon...',
                url: '#',
                icon: CircleDotDashed,
            },
        ],
    },
    {
        label: 'Coming soon...',
        items: [
            {
                title: 'Coming soon...',
                url: '#',
                icon: CircleDotDashed,
            },
            {
                title: 'Coming soon...',
                url: '#',
                icon: CircleDotDashed,
            },
        ],
    },
    {
        label: 'Coming soon...',
        items: [
            {
                title: 'Coming soon...',
                url: '#',
                icon: CircleDotDashed,
            },
            {
                title: 'Coming soon...',
                url: '#',
                icon: CircleDotDashed,
            },
        ],
    },
    {
        label: 'Coming soon...',
        items: [
            {
                title: 'Coming soon...',
                url: '#',
                icon: CircleDotDashed,
            },
            {
                title: 'Coming soon...',
                url: '#',
                icon: CircleDotDashed,
            },
        ],
    },
    {
        label: 'Coming soon...',
        items: [
            {
                title: 'Coming soon...',
                url: '#',
                icon: CircleDotDashed,
            },
        ],
    },
    {
        label: 'Coming soon...',
        items: [
            {
                title: 'Coming soon...',
                url: '#',
                icon: CircleDotDashed,
            },
        ],
    },
    {
        label: 'Coming soon...',
        items: [
            {
                title: 'Coming soon...',
                url: '#',
                icon: CircleDotDashed,
            },
        ],
    },
];
