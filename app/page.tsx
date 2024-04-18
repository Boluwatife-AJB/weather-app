import WeatherWidget from '@/components/WeatherWidget';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="mx-auto">
      {/* <h1 className="text-4xl text-center">Weather App</h1> */}
      <WeatherWidget />

      {/* <footer className="mt-8 text-center flex px-12 items-center py-4 justify-between fixed bottom-0 w-full bg-white/80">
        <p className="text-gray-500">
          &copy; {new Date().getFullYear()} Weather App. All rights reserved.
        </p>
        <p className="text-gray-500">
          Coded by{' '}
          <Link
            href={'https://github.com/Boluwatife-AJB'}
            className="text-blue-800"
          >
            Boluwatife Ajose
          </Link>
        </p>
      </footer> */}
    </main>
  );
}
