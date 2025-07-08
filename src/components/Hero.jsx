export default function Hero() {
  return (
    <section
      className="bg-cover bg-center h-screen flex items-center justify-center text-white"
      style={{ backgroundImage: "url('/stock-1.jpg')" }}
    >
      <div className="text-center mb-[400px]">
        <h1 className="text-5xl font-bold">Athletic Binblau</h1>
        <p className="text-2xl">Im Talboden nur Athletic!</p>
      </div>
    </section>
  );
}
