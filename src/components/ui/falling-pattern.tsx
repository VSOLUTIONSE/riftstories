import type React from 'react';
import { cn } from '@/lib/utils';

type FallingPatternProps = React.ComponentProps<'div'> & {
	color?: string;
	backgroundColor?: string;
	duration?: number;
	blurIntensity?: string;
	density?: number;
};

export function FallingPattern({
	color = 'var(--primary)',
	backgroundColor = 'var(--background)',
	duration = 150,
	blurIntensity = '1em',
	density = 1,
	className,
}: FallingPatternProps) {
	const generateBackgroundImage = () => {
		const patterns = [
			`radial-gradient(4px 100px at 0px 235px, ${color}, transparent)`,
			`radial-gradient(4px 100px at 300px 235px, ${color}, transparent)`,
			`radial-gradient(1.5px 1.5px at 150px 117.5px, ${color} 100%, transparent 150%)`,
			`radial-gradient(4px 100px at 0px 252px, ${color}, transparent)`,
			`radial-gradient(4px 100px at 300px 252px, ${color}, transparent)`,
			`radial-gradient(1.5px 1.5px at 150px 126px, ${color} 100%, transparent 150%)`,
			`radial-gradient(4px 100px at 0px 150px, ${color}, transparent)`,
			`radial-gradient(4px 100px at 300px 150px, ${color}, transparent)`,
			`radial-gradient(1.5px 1.5px at 150px 75px, ${color} 100%, transparent 150%)`,
			`radial-gradient(4px 100px at 0px 253px, ${color}, transparent)`,
			`radial-gradient(4px 100px at 300px 253px, ${color}, transparent)`,
			`radial-gradient(1.5px 1.5px at 150px 126.5px, ${color} 100%, transparent 150%)`,
			`radial-gradient(4px 100px at 0px 204px, ${color}, transparent)`,
			`radial-gradient(4px 100px at 300px 204px, ${color}, transparent)`,
			`radial-gradient(1.5px 1.5px at 150px 102px, ${color} 100%, transparent 150%)`,
			`radial-gradient(4px 100px at 0px 134px, ${color}, transparent)`,
			`radial-gradient(4px 100px at 300px 134px, ${color}, transparent)`,
			`radial-gradient(1.5px 1.5px at 150px 67px, ${color} 100%, transparent 150%)`,
			`radial-gradient(4px 100px at 0px 179px, ${color}, transparent)`,
			`radial-gradient(4px 100px at 300px 179px, ${color}, transparent)`,
			`radial-gradient(1.5px 1.5px at 150px 89.5px, ${color} 100%, transparent 150%)`,
			`radial-gradient(4px 100px at 0px 299px, ${color}, transparent)`,
			`radial-gradient(4px 100px at 300px 299px, ${color}, transparent)`,
			`radial-gradient(1.5px 1.5px at 150px 149.5px, ${color} 100%, transparent 150%)`,
			`radial-gradient(4px 100px at 0px 215px, ${color}, transparent)`,
			`radial-gradient(4px 100px at 300px 215px, ${color}, transparent)`,
			`radial-gradient(1.5px 1.5px at 150px 107.5px, ${color} 100%, transparent 150%)`,
			`radial-gradient(4px 100px at 0px 281px, ${color}, transparent)`,
			`radial-gradient(4px 100px at 300px 281px, ${color}, transparent)`,
			`radial-gradient(1.5px 1.5px at 150px 140.5px, ${color} 100%, transparent 150%)`,
			`radial-gradient(4px 100px at 0px 158px, ${color}, transparent)`,
			`radial-gradient(4px 100px at 300px 158px, ${color}, transparent)`,
			`radial-gradient(1.5px 1.5px at 150px 79px, ${color} 100%, transparent 150%)`,
			`radial-gradient(4px 100px at 0px 210px, ${color}, transparent)`,
			`radial-gradient(4px 100px at 300px 210px, ${color}, transparent)`,
			`radial-gradient(1.5px 1.5px at 150px 105px, ${color} 100%, transparent 150%)`,
		];
		return patterns.join(', ');
	};

	const backgroundSizes = [
		'300px 235px', '300px 235px', '300px 235px',
		'300px 252px', '300px 252px', '300px 252px',
		'300px 150px', '300px 150px', '300px 150px',
		'300px 253px', '300px 253px', '300px 253px',
		'300px 204px', '300px 204px', '300px 204px',
		'300px 134px', '300px 134px', '300px 134px',
		'300px 179px', '300px 179px', '300px 179px',
		'300px 299px', '300px 299px', '300px 299px',
		'300px 215px', '300px 215px', '300px 215px',
		'300px 281px', '300px 281px', '300px 281px',
		'300px 158px', '300px 158px', '300px 158px',
		'300px 210px', '300px 210px',
	].join(', ');

	return (
		<div className={cn('relative h-full w-full', className)}>
			<div
				className="h-full w-full falling-pattern-anim"
				style={{
					backgroundColor,
					backgroundImage: generateBackgroundImage(),
					backgroundSize: backgroundSizes,
					animationDuration: `${duration}s`,
				}}
			/>
			<div
				className="absolute inset-0 z-[1] pointer-events-none"
				style={{
					backdropFilter: `blur(${blurIntensity})`,
					backgroundImage: `radial-gradient(circle at 50% 50%, transparent 0, transparent 2px, ${backgroundColor} 2px)`,
					backgroundSize: `${8 * density}px ${8 * density}px`,
				}}
			/>
		</div>
	);
}
