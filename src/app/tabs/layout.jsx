import Header from '@/app/components/header';
import TabBar from '@/app/components/tab-bar';

export default function TabLayout({ children }) {
  return (
    <div className="fixed h-full w-full flex flex-col justify-between">
      <Header />
      {children}
      <TabBar />
    </div>
  );
}
