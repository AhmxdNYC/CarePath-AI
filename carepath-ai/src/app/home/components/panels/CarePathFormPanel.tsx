'use client';

import { FormEvent, useRef, useState } from 'react';
import TriageForm from '@/app/triage/components/TriageForm';
import CarePathwayResults from '@/app/triage/components/CarePathwayResults';
import ErrorDisplay from '@/app/triage/components/ErrorDisplay';
import { submitTriageForm } from '@/app/triage/utils/api';
import { TriageResponse } from '@/app/triage/utils/types';

export default function CarePathFormPanel() {
	const [symptoms, setSymptoms] = useState('');
	const [age, setAge] = useState('');
	const [goal, setGoal] = useState('');
	const [duration, setDuration] = useState('');
	const [loading, setLoading] = useState(false);
	const [result, setResult] = useState<TriageResponse | null>(null);
	const [error, setError] = useState<string | null>(null);
	const resultRef = useRef<HTMLDivElement | null>(null);

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setLoading(true);
		setError(null);

		try {
			const data = await submitTriageForm({
				symptoms,
				age: parseInt(age, 10),
				goal,
				duration,
			});
			setResult(data);
		} catch (err) {
			setResult(null);
			setError(err instanceof Error ? err.message : 'Something went wrong');
		} finally {
			setLoading(false);
		}
	};

	const handleDownload = () => {
		if (!resultRef.current) return;

		const printWindow = window.open('', '_blank', 'width=900,height=700');
		if (!printWindow) return;

		const content = resultRef.current.innerHTML;
		printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>CarePath Results</title>
          <style>
            body {
              font-family: 'Inter', Arial, sans-serif;
              padding: 32px;
              color: #0f172a;
              background: #f8fafc;
            }
            h2, h3, h4 {
              color: #0f172a;
            }
            p, li, span, div {
              font-size: 14px;
              line-height: 1.5;
              color: #1e293b;
            }
            .section {
              margin-bottom: 24px;
              padding-bottom: 16px;
              border-bottom: 1px solid #e2e8f0;
            }
          </style>
        </head>
        <body>
          ${content}
        </body>
      </html>
    `);
		printWindow.document.close();
		printWindow.focus();
		setTimeout(() => {
			printWindow.print();
			printWindow.close();
		}, 300);
	};

	const handleReset = () => {
		setSymptoms('');
		setAge('');
		setGoal('');
		setDuration('');
		setResult(null);
		setError(null);
		window.scrollTo({ top: 0, behavior: 'smooth' });
	};

	return (
		<div className='space-y-6'>
			<div className='rounded-3xl border border-gray-200 bg-white p-6 shadow-sm'>
				<TriageForm
					symptoms={symptoms}
					age={age}
					goal={goal}
					duration={duration}
					loading={loading}
					onSymptomsChange={setSymptoms}
					onAgeChange={setAge}
					onGoalChange={setGoal}
					onDurationChange={setDuration}
					onSubmit={handleSubmit}
				/>

				{error && <ErrorDisplay error={error} />}

				{result && (
					<div className='mt-6 space-y-4'>
						<div ref={resultRef}>
							<CarePathwayResults result={result} />
						</div>
						<div className='flex flex-col gap-3 sm:flex-row sm:items-center'>
							<button
								type='button'
								onClick={handleDownload}
								className='inline-flex items-center justify-center rounded-lg bg-cyan-700 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-cyan-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600'>
								Download as PDF
							</button>
							<button
								type='button'
								onClick={handleReset}
								className='inline-flex items-center justify-center rounded-lg border border-cyan-200 px-6 py-3 text-sm font-semibold text-cyan-700 transition-colors hover:bg-cyan-50'>
								New Assessment
							</button>
						</div>
						<p className='text-xs text-slate-500'>
							The PDF includes only your generated plan for a clean, shareable
							copy. Remember to save it in a secure location.
						</p>
					</div>
				)}
			</div>
		</div>
	);
}
