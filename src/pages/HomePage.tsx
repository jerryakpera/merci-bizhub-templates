import { TemplateCard } from '@/components/layout';

const templates = [
  {
    id: 1,
    court: 'All',
    title: 'Wrong Transfer - Affidavit',
    link: '/basic-wrong-transfer-affidavit',
    description:
      'Affidavit for wrong transfer of funds. Can be used for both Court 4 and Court 5.',
  },
  {
    id: 2,
    court: 'All',
    title: 'Wrong Transfer - Court Order',
    link: '/basic-wrong-transfer-court-order',
    description:
      'Court Order for wrong transfer of funds. Can be used for both Court 4 and Court 5.',
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
