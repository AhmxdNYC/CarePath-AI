'use client';

import { TriageResponse } from '../utils/types';

interface CarePathwayResultsProps {
	result: TriageResponse;
}

export default function CarePathwayResults({
	result,
}: CarePathwayResultsProps) {
	return (
		<div className='mt-8 bg-white border border-gray-200 rounded-lg shadow-sm p-8 lg:p-12'>
			<h2 className='text-2xl font-bold text-black mb-6'>Your Care Pathway</h2>
			<div className='space-y-6'>
				{result.summary && (
					<div className='pb-6 border-b border-gray-200'>
						<h3 className='text-lg font-semibold text-black mb-3'>Summary</h3>
						<p className='text-gray-700 leading-relaxed'>{result.summary}</p>
					</div>
				)}
				{result.possible_causes && (
					<div className='pb-6 border-b border-gray-200'>
						<h3 className='text-lg font-semibold text-black mb-3'>
							Possible Causes
						</h3>
						<p className='text-gray-700 leading-relaxed'>
							{result.possible_causes}
						</p>
					</div>
				)}
				{result.recommended_steps && (
					<div className='pb-6 border-b border-gray-200'>
						<h3 className='text-lg font-semibold text-black mb-3'>
							Recommended Steps
						</h3>
						<p className='text-gray-700 leading-relaxed'>
							{result.recommended_steps}
						</p>
					</div>
				)}
				{result.suggested_labs && (
					<div className='pb-6 border-b border-gray-200'>
						<h3 className='text-lg font-semibold text-black mb-3'>
							Suggested Labs
						</h3>
						<p className='text-gray-700 leading-relaxed'>
							{result.suggested_labs}
						</p>
					</div>
				)}
				{result.red_flags && (
					<div className='pb-6 border-b border-gray-200'>
						<h3 className='text-lg font-semibold text-red-600 mb-3'>
							⚠️ Red Flags
						</h3>
						<p className='text-red-700 leading-relaxed'>{result.red_flags}</p>
					</div>
				)}
				{result.education && (
					<div>
						<h3 className='text-lg font-semibold text-black mb-3'>
							Patient Education
						</h3>
						<p className='text-gray-700 leading-relaxed'>{result.education}</p>
					</div>
				)}
				{result.content && !result.summary && (
					<div className='bg-gray-50 rounded-lg p-4'>
						<pre className='whitespace-pre-wrap text-sm text-gray-700'>
							{result.content}
						</pre>
					</div>
				)}
			</div>
		</div>
	);
}
