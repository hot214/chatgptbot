import Image from 'next/image';
import styles from '@/styles/Layout.module.css';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface LayoutProps {
  children?: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const router = useRouter();
  const isActive = (href: string) => {
    return router.pathname === href ? styles.active : '';
  };

  return (
    <>
      <div className="mx-auto flex flex-col">
        <div className="flex items-center justify-center mt-4">
          <Image
            key="LOGO"
            src="/CWAiW_l.png"
            alt="AI"
            width="120"
            height="80"
            className={styles.logo}
            priority
          />
        </div>

        <div
          className="rounded-lg flex justify-center items-center mt-4"
          role="group"
        >
          <Link href="/">
            <button
              type="button"
              className={`
                ${isActive('/')} + \
                w-[180px] h-[50px] text-lg font-medium text-gray-900 bg-white hover:bg-gray-100 hover:text-gray-900 rounded-l-full shadow-lg
                `}
            >
              Chat
            </button>
          </Link>

          <Link href="/train">
            <button
              type="button"
              className={`
                ${isActive('/train')} + \
                w-[180px] h-[50px] text-lg font-medium text-gray-900 bg-white hover:bg-gray-100 hover:text-gray-900 rounded-r-full shadow-lg
                `}
            >
              Content
            </button>
          </Link>
        </div>

        {children}
      </div>
    </>
  );
}
