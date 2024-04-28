import React from 'react';
import { Link } from 'react-router-dom';

import {
  Card,
  CardContent,
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

export const TemplateCard = ({ link, title, description, court }: Props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      {/* <CardContent className='grid gap-4'>
        <p className='text-sm text-muted-foreground'>
          <strong>Court: </strong>
          {court}
        </p>
      </CardContent> */}
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
