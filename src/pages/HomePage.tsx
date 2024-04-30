import { TemplateCard } from '@/components/layout';

const templates = [
  {
    id: 1,
    court: 'All',
    title: 'Wrong Transfer',
    link: '/wrong-transfer',
    description:
      'Generates affidavit and/or court order for reversal of a wrong transfer.',
  },
  {
    id: 2,
    court: 'All',
    title: 'Affidavit',
    link: '/affidavit',
    description: 'Generates court affidavit for different scenarios.',
  },
];

export const HomePage = () => {
  return (
    <div className='mt-3'>
      <div className='grid gap-x-2 gap-y-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4'>
        {templates.map((template) => (
          <TemplateCard
            key={template.id}
            {...template}
          />
        ))}
      </div>
    </div>
  );
};
