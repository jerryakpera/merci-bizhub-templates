import { templates } from '@/data/templates';
import { TemplateCard } from '@/components/layout';

export const TemplatesList = () => {
  return (
    <div
      id='templatesList'
      className='grid gap-x-2 gap-y-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4'
    >
      {templates.map((template) => (
        <TemplateCard
          key={template.id}
          {...template}
        />
      ))}
    </div>
  );
};
