// hooks/useAuthGuard.ts
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { jwtDecode } from 'jwt-decode';

type JwtPayload = {
  role: string;
  exp?: number;
  [key: string]: any;
};

export default function useAuthGuard(allowedRoles: string[] = []) {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('wt-accessToken');

    if (!token) {
      router.replace('/auth/login');
      return;
    }

    try {
      const decoded = jwtDecode<JwtPayload>(token);
      if (decoded.exp && Date.now() >= decoded.exp * 1000) {
        localStorage.removeItem('wt-accessToken');
        router.replace('/auth/login');
        return;
      }

      if (allowedRoles.length > 0 && !allowedRoles.includes(decoded.role)) {
        router.replace('/403');
        return;
      }
    } catch (error) {
      console.error('Token không hợp lệ:', error);
      localStorage.removeItem('wt-accessToken');
      router.replace('/auth/login');
    }
  }, []);
}
