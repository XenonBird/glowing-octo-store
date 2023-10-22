import Header from '@/components/header';
import TabBar from '@/components/tab-bar';

export default function TabLayout({ children }) {
  return (
    <div className="fixed h-full w-full flex flex-col justify-between">
      <Header />
      {children}
      <TabBar />
    </div>
  );
}
