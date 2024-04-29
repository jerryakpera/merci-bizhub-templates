import { Link } from 'react-router-dom';

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

type Props = {
  link: string;
  title: string;
  court: string;
  description: string;
};

export const TemplateCard = ({ link, title, description }: Props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardFooter>
        <Link
          to={link}
          className='w-full'
        >
          <Button className='w-full'>Use Template</Button>
        </Link>
      </CardFooter>
    </Card>
  );
};
