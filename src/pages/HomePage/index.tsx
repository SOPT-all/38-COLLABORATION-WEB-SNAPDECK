import bgGradient from "@/assets/images/bgGradient.webp";

const HomePage = () => {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <img
        src={bgGradient}
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 h-[82.9rem] w-[85.5rem] -translate-x-1/2 -translate-y-1/2"
      />
      <div className="relative z-10" />
    </main>
  );
};

export default HomePage;
