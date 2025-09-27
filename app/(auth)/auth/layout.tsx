import Link from &quot;next/link&quot;;

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className=&quot;min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8&quot;>
      <div className=&quot;sm:mx-auto sm:w-full sm:max-w-md&quot;>
        <Link href=&quot;/&quot; className=&quot;flex justify-center&quot;>
          <div className=&quot;flex items-center space-x-2&quot;>
            <img 
              src=&quot;/logo.png&quot; 
              alt=&quot;Postly AI&quot; 
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
