import { TemplateCard } from '@/components/layout';

const templates = [
  {
    id: 1,
    court: 'Court 4',
    title: 'Wrong Transfer - Affidavit',
    link: '/basic-wrong-transfer-affidavit',
    description:
      'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aut possimus ad distinctio, nobis veritatis vitae.',
  },
];

export const HomePage = () => {
  return (
    <div className='mt-3'>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
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
