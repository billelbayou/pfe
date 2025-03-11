export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 rounded-full border-4 border-t-transparent border-indigo-500 animate-spin"></div>
      </div>
      <p className="mt-4 text-lg font-semibold tracking-wide text-gray-300">
        Loading, please wait...
      </p>
    </div>
  );
}
