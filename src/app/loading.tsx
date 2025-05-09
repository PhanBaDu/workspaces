import { Loader } from 'lucide-react';

export default function Loading() {
    return (
        <div className="fixed inset-0 bg-muted/80 flex items-center justify-center">
            <Loader className="size-6 animate-spin text-muted-foreground" />
        </div>
    );
}
