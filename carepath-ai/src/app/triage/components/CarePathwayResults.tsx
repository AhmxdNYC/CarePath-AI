'use client';

import { TriageResponse } from '../utils/types';

interface CarePathwayResultsProps {
	result: TriageResponse;
}

export default function CarePathwayResults({
	result,
}: CarePathwayResultsProps) {
	return (
		<div className='mt-8 bg-white border border-gray-200 rounded-lg shadow-sm p-8 lg:p-12 print:border-0 print:shadow-none print:rounded-none print:p-0 print:mt-0'>
			<h2 className='text-2xl font-bold text-black mb-6 print:text-xl print:mb-4'>Your Care Pathway</h2>
			<div className='space-y-6 print:space-y-4'>
				{result.summary && (
					<div className='pb-6 border-b border-gray-200 print:pb-3 print:border-gray-300'>
						<h3 className='text-lg font-semibold text-black mb-3 print:text-base print:mb-2'>Summary</h3>
						<p className='text-gray-700 leading-relaxed print:text-sm print:leading-snug'>{result.summary}</p>
					</div>
				)}
				{result.possible_causes && (
					<div className='pb-6 border-b border-gray-200 print:pb-3 print:border-gray-300'>
						<h3 className='text-lg font-semibold text-black mb-3 print:text-base print:mb-2'>
							Possible Causes
						</h3>
						<p className='text-gray-700 leading-relaxed print:text-sm print:leading-snug'>
							{result.possible_causes}
						</p>
					</div>
				)}
				{result.recommended_steps && (
					<div className='pb-6 border-b border-gray-200 print:pb-3 print:border-gray-300'>
						<h3 className='text-lg font-semibold text-black mb-3 print:text-base print:mb-2'>
							Recommended Steps
						</h3>
						<p className='text-gray-700 leading-relaxed print:text-sm print:leading-snug'>
							{result.recommended_steps}
						</p>
					</div>
				)}
				{result.suggested_labs && (
					<div className='pb-6 border-b border-gray-200 print:pb-3 print:border-gray-300'>
						<h3 className='text-lg font-semibold text-black mb-3 print:text-base print:mb-2'>
							Suggested Labs
						</h3>
						<p className='text-gray-700 leading-relaxed print:text-sm print:leading-snug'>
							{result.suggested_labs}
						</p>
					</div>
				)}
				{result.red_flags && (
					<div className='pb-6 border-b border-gray-200 print:pb-3 print:border-gray-300'>
						<h3 className='text-lg font-semibold text-red-600 mb-3 print:text-base print:mb-2'>
							⚠️ Red Flags
						</h3>
						<p className='text-red-700 leading-relaxed print:text-sm print:leading-snug'>{result.red_flags}</p>
					</div>
				)}
				{result.education && (
					<div className='print:pb-0'>
						<h3 className='text-lg font-semibold text-black mb-3 print:text-base print:mb-2'>
							Patient Education
						</h3>
						<p className='text-gray-700 leading-relaxed print:text-sm print:leading-snug'>{result.education}</p>
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
