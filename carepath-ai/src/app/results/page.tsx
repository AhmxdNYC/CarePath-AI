'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import CarePathwayResults from '@/app/triage/components/CarePathwayResults';
import { TriageResponse } from '@/app/triage/utils/types';
import { usePrint } from '@/hooks/usePrint';

const STORAGE_KEY = 'carepath_result';

export default function ResultsPage() {
	const router = useRouter();
	const [result, setResult] = useState<TriageResponse | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const { print } = usePrint({
		pageTitle: 'CarePath Results',
		restoreTitle: 'CarePath-AI',
	});

	useEffect(() => {
		try {
			const stored = localStorage.getItem(STORAGE_KEY);
			if (stored) {
				const parsed = JSON.parse(stored) as TriageResponse;
				setResult(parsed);
			} else {
				router.push('/');
			}
		} catch (error) {
			console.error('Error reading from localStorage:', error);
			router.push('/');
		} finally {
			setIsLoading(false);
		}
	}, [router]);

	const handlePrint = () => {
		print();
	};

	const handleBack = () => {
		localStorage.removeItem(STORAGE_KEY);
		router.push('/');
	};

	if (isLoading || !result) {
		return (
			<div className='min-h-screen bg-white flex items-center justify-center'>
				<p className='text-gray-600'>Loading...</p>
			</div>
		);
	}

	return (
		<>
			<style
				jsx
				global>{`
				@media print {
					@page {
						margin: 0.4in;
					}
					body {
						-webkit-print-color-adjust: exact;
						print-color-adjust: exact;
					}
					* {
						page-break-inside: avoid;
					}
				}
			`}</style>
			<div className='min-h-screen bg-white'>
				{/* Print-only header */}
				<div className='hidden print:block mb-4 print:mb-3'>
					<h1 className='text-2xl font-bold text-black print:text-xl'>
						CarePath Results
					</h1>
					<p className='text-sm text-gray-600 print:text-xs'>
						Generated on {new Date().toLocaleDateString()}
					</p>
				</div>

				{/* Screen-only controls */}
				<div className='max-w-4xl mx-auto px-4 py-8 print:hidden'>
					<div className='flex items-center justify-between mb-6'>
						<button
							onClick={handleBack}
							className='text-gray-600 hover:text-gray-900 transition-colors'>
							← Back to Home
						</button>
						<button
							onClick={handlePrint}
							className='inline-flex items-center rounded-lg bg-cyan-700 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-cyan-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600'>
							Print / Save as PDF
						</button>
					</div>
				</div>

				{/* Results content */}
				<div className='max-w-4xl mx-auto px-4 pb-12 print:px-0 print:pb-0 print:max-w-full'>
					<div className='bg-white print:bg-transparent'>
						<CarePathwayResults result={result} />
					</div>
				</div>
			</div>
		</>
	);
}
