import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link href="/" className="flex justify-center">
          <div className="flex items-center space-x-2">
            <img 
              src="/logo.png" 
              alt="Postly AI" 
              className="h-10 w-10 rounded-lg object-contain"
            />
            <span className="text-2xl font-bold text-gray-900 dark:text-white">
              Postly AI
            </span>
          </div>
        </Link>
      </div>
      
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        {children}
      </div>
    </div>
  );
}
