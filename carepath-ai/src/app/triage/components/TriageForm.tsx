'use client';

import { FormEvent } from 'react';

interface TriageFormProps {
	symptoms: string;
	age: string;
	goal: string;
	duration: string;
	loading: boolean;
	onSymptomsChange: (value: string) => void;
	onAgeChange: (value: string) => void;
	onGoalChange: (value: string) => void;
	onDurationChange: (value: string) => void;
	onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

export default function TriageForm({
	symptoms,
	age,
	goal,
	duration,
	loading,
	onSymptomsChange,
	onAgeChange,
	onGoalChange,
	onDurationChange,
	onSubmit,
}: TriageFormProps) {
	return (
		<div className='bg-white border border-gray-200 rounded-lg shadow-sm p-8 lg:p-12'>
			<h2 className='text-2xl font-bold text-black mb-8'>
				Get Your Care Pathway
			</h2>

			<form
				onSubmit={onSubmit}
				className='space-y-6'>
				<div>
					<label
						htmlFor='symptoms'
						className='block text-sm font-semibold text-gray-900 mb-2'>
						Symptoms *
					</label>
					<textarea
						id='symptoms'
						value={symptoms}
						onChange={(e) => onSymptomsChange(e.target.value)}
						required
						rows={4}
						className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-gray-900 placeholder-gray-400'
						placeholder='Describe your symptoms in detail...'
					/>
				</div>

				<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
					<div>
						<label
							htmlFor='age'
							className='block text-sm font-semibold text-gray-900 mb-2'>
							Age *
						</label>
						<input
							type='number'
							id='age'
							value={age}
							onChange={(e) => onAgeChange(e.target.value)}
							required
							min='1'
							max='120'
							className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-gray-900 placeholder-gray-400'
							placeholder='Enter your age'
						/>
					</div>

					<div>
						<label
							htmlFor='duration'
							className='block text-sm font-semibold text-gray-900 mb-2'>
							Duration *
						</label>
						<input
							type='text'
							id='duration'
							value={duration}
							onChange={(e) => onDurationChange(e.target.value)}
							required
							className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-gray-900 placeholder-gray-400'
							placeholder='e.g., 2 days, 1 week'
						/>
					</div>
				</div>

				<div>
					<label
						htmlFor='goal'
						className='block text-sm font-semibold text-gray-900 mb-2'>
						What would you like to understand? *
					</label>
					<input
						type='text'
						id='goal'
						value={goal}
						onChange={(e) => onGoalChange(e.target.value)}
						required
						className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-gray-900 placeholder-gray-400'
						placeholder='e.g., Understand if I need to see a doctor'
					/>
				</div>

				<div className='pt-2'>
					<button
						type='submit'
						disabled={loading}
						className='w-full bg-cyan-700 hover:bg-cyan-800 disabled:bg-cyan-300 text-white font-semibold py-4 px-6 rounded-lg transition-colors duration-200 text-lg'>
						{loading ? 'Generating Your Care Pathway...' : 'Get Care Pathway'}
					</button>
				</div>
			</form>
		</div>
	);
}
