import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAppContext } from '@/context/AppContext';
import { usePathname } from 'next/navigation';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAppContext();
  const router = useRouter();
  const pathname = usePathname(); 

  useEffect(() => {
    if (!isAuthenticated && pathname !== '/login') {
      router.push('/login');
    }
  }, [isAuthenticated, pathname, router]);

  return isAuthenticated || pathname === '/login' ? <>{children}</> : null;
};

export default ProtectedRoute;
