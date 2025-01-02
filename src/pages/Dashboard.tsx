import { TemplatesList } from '@/components/TemplatesList';

export const Dashboard = () => {
  return (
    <div className='p-4 pt-0'>
      <div className='space-y-4'>
        <div className='space-y-1'>
          <h1 className='text-lg font-black tracking-wide uppercase'>
            Generate Documents
          </h1>
          <section>
            <TemplatesList />
          </section>
        </div>
      </div>
    </div>
  );
};
