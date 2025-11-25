'use client';

interface ErrorDisplayProps {
	error: string;
}

export default function ErrorDisplay({ error }: ErrorDisplayProps) {
	return (
		<div className='mt-6 bg-red-50 border border-red-200 rounded-lg p-4'>
			<p className='text-red-800 text-sm'>{error}</p>
		</div>
	);
}
