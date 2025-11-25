'use client';

import { useState, FormEvent } from 'react';
import TriageForm from './components/TriageForm';
import CarePathwayResults from './components/CarePathwayResults';
import ErrorDisplay from './components/ErrorDisplay';
import { submitTriageForm } from './utils/api';
import { TriageResponse } from './utils/types';

export default function TriagePage() {
	const [symptoms, setSymptoms] = useState('');
	const [age, setAge] = useState('');
	const [goal, setGoal] = useState('');
	const [duration, setDuration] = useState('');
	const [loading, setLoading] = useState(false);
	const [result, setResult] = useState<TriageResponse | null>(null);
	const [error, setError] = useState<string | null>(null);

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setLoading(true);
		setError(null);
		setResult(null);

		try {
			const data = await submitTriageForm({
				symptoms,
				age: parseInt(age),
				goal,
				duration,
			});
			setResult(data);
		} catch (err) {
			setError(err instanceof Error ? err.message : 'An error occurred');
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className='min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8'>
			<div className='max-w-3xl mx-auto'>
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

				{result && <CarePathwayResults result={result} />}
			</div>
		</div>
	);
}
