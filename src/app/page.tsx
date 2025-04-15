import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function Home() {
    return (
        <div className="flex gap-4">
            <Button>aimar</Button>
            <Button variant={'secondary'}>Primary</Button>
            <Button variant={'destructive'}>Primary</Button>
            <Button variant={'ghost'}>Primary</Button>
            <Button variant={'link'}>Primary</Button>
            <Button variant={'outline'}>Primary</Button>
            <Button variant={'muted'}>Primary</Button>
            <Button variant={'teritary'}>Primary</Button>
            <Input />
        </div>
    );
}
