'use client';

export default function HeroSection() {
	return (
		<section className='bg-white'>
			<div className='relative max-w-6xl mx-auto px-4 pt-14 pb-10 gap-10 grid grid-cols-1 lg:grid-cols-2'>
				<div className='space-y-6'>
					<p className='uppercase tracking-[0.2em] text-sm text-gray-400'>
						CarePath
					</p>
					<h1 className='text-4xl sm:text-5xl font-semibold leading-tight text-gray-900'>
						it&apos;s not a shortcut.
						<br />
						it&apos;s healthcare.
					</h1>
					<ul className='space-y-3 text-gray-700'>
						<li>🤖 AI-guided prompts powered by our triage engine</li>
						<li>⚡ Quick results you can share with your own clinician</li>
						<li>🌡️ Common-symptom playbooks that feel familiar</li>
						<li>🌐 100% online—no waiting rooms, no phone calls</li>
					</ul>
					<p className='text-sm text-gray-600'>
						We capture inputs, summarize patterns, and tee up key questions for
						the next conversation with your doctor—all in under two minutes.
					</p>
				</div>
				<div className='relative overflow-hidden rounded-[32px] bg-gradient-to-tr from-cyan-200 via-sky-200 to-blue-500 text-slate-900'>
					<div className='absolute inset-0 bg-white/55' />
					<div className='relative h-full w-full px-10 py-12 flex flex-col justify-between'>
						<div>
							<p className='text-sm uppercase tracking-[0.2em] text-slate-500'>
								common symptom snapshots
							</p>
							<h2 className='mt-2 text-3xl font-semibold leading-tight'>
								We turn fuzzy descriptions into structured guidance.
							</h2>
							<p className='mt-4 text-sm text-slate-700 max-w-md'>
								CarePath-AI helps you capture patterns before you escalate to a
								clinician:
							</p>
							<ul className='mt-6 space-y-2 text-sm text-slate-800'>
								<li>• Headache that won&apos;t quit + light sensitivity</li>
								<li>• Stomach cramps paired with mild fever</li>
								<li>• Sore throat, cough, and fatigue after travel</li>
								<li>• Anxiety spikes with chest tightness (non-emergent)</li>
							</ul>
						</div>
						<p className='text-xs text-slate-600 pt-4'>
							Reminder: CarePath-AI is for educational guidance only. It does
							not diagnose, treat, or prescribe. If you&apos;re experiencing
							severe or worsening symptoms—or anything that feels urgent—contact
							emergency services or your doctor immediately.
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}
