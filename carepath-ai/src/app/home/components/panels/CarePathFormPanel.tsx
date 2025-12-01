'use client';

import { useRouter } from 'next/navigation';
import TriageForm from '@/app/triage/components/TriageForm';
import CarePathwayResults from '@/app/triage/components/CarePathwayResults';
import ErrorDisplay from '@/app/triage/components/ErrorDisplay';
import { useTriageForm } from '@/hooks/useTriageForm';

const STORAGE_KEY = 'carepath_result';

export default function CarePathFormPanel() {
	const router = useRouter();
	const {
		symptoms,
		age,
		goal,
		duration,
		loading,
		result,
		error,
		setSymptoms,
		setAge,
		setGoal,
		setDuration,
		handleSubmit,
		reset,
	} = useTriageForm();

	const handleViewResults = () => {
		if (result) {
			try {
				localStorage.setItem(STORAGE_KEY, JSON.stringify(result));
				router.push('/results');
			} catch (err) {
				console.error('Error saving to localStorage:', err);
			}
		}
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
						<CarePathwayResults result={result} />
						<div className='flex flex-col gap-3 sm:flex-row sm:items-center'>
							<button
								type='button'
								onClick={handleViewResults}
								className='inline-flex items-center justify-center rounded-lg bg-cyan-700 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-cyan-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600'>
								View & Print Results
							</button>
							<button
								type='button'
								onClick={reset}
								className='inline-flex items-center justify-center rounded-lg border border-cyan-200 px-6 py-3 text-sm font-semibold text-cyan-700 transition-colors hover:bg-cyan-50'>
								New Assessment
							</button>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
