import HeroSection from './home/components/HeroSection';
import CarePathFormPanel from './home/components/panels/CarePathFormPanel';

export default function Home() {
	return (
		<main className='min-h-screen bg-white text-gray-900'>
			<HeroSection />
			<section className='max-w-6xl mx-auto px-4 py-10'>
				<CarePathFormPanel />
			</section>
		</main>
	);
}
