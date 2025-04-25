import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

interface MemberAvatarProps {
    name: string;
    className?: string;
    fallbackClassName?: string;
}

export const MemberAvatar = ({
    fallbackClassName,
    name,
    className,
}: MemberAvatarProps) => {
    return (
        <Avatar
            className={cn(
                'size-5 transition border border-muted-foreground rounded-full',
                className,
            )}
        >
            <AvatarFallback
                className={cn(
                    'bg-muted font-medium to-primary flex items-center',
                    fallbackClassName,
                )}
            >
                {name.charAt(0).toUpperCase()}
            </AvatarFallback>
        </Avatar>
    );
};
