import { cn } from '@/lib/utils';

interface DashedSeparatorProps {
    className?: string;
    color?: string;
    height?: string;
    dashedSize?: string;
    gapSize?: string;
    direction?: 'horizontal' | 'vertical';
}

export const DashedSeparator = ({
    className,
    color = '#d4d4d8',
    // height = '2px',
    // dashedSize = '2px',
    // gapSize = '6px',
    direction = 'horizontal',
}: DashedSeparatorProps) => {
    const isHorizontal = direction === 'horizontal';

    return (
        <div
            className={cn(
                isHorizontal
                    ? 'w-full flex items-center'
                    : 'h-full flex flex-col items-center',
                className,
            )}
        >
            <div
                style={{
                    width: isHorizontal ? '100%' : '1px',
                    height: isHorizontal ? '1px' : '100%',
                    borderTop: isHorizontal ? `1px dashed ${color}` : 'none',
                    borderLeft: !isHorizontal ? `1px dashed ${color}` : 'none',
                }}
            />
        </div>
    );
};
