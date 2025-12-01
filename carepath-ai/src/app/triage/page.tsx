'use client';

import TriageForm from './components/TriageForm';
import CarePathwayResults from './components/CarePathwayResults';
import ErrorDisplay from './components/ErrorDisplay';
import { useTriageForm } from '@/hooks/useTriageForm';

export default function TriagePage() {
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
	} = useTriageForm();

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
