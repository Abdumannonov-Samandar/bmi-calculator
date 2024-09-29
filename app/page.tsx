import BmiCalculator from '../components/BmiCalculator';

const HomePage = () => {
  return (
    <main className="flex items-center justify-center h-screen bg-gradient-to-br from-blue-100 to-purple-100">
      <BmiCalculator />
    </main>
  );
};

export default HomePage;
