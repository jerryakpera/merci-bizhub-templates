import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react/dist/iconify.js';

import {
  Card,
  CardTitle,
  CardFooter,
  CardHeader,
  CardDescription,
} from '@/components/ui/card';

import { DashboardGroupItem } from '@/data/dashboard-groups';

type Props = {
  items: DashboardGroupItem[];
};

export const DashboardList = (props: Props) => {
  const { items } = props;

  return (
    <div
      id='itemsList'
      className='grid gap-x-2 gap-y-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 items-stretch'
    >
      {items.map((item: DashboardGroupItem) => {
        const { id, title, icon, link, description } = item;

        return (
          <Link
            key={id}
            to={link}
            className='w-full h-full'
          >
            <Card className='flex flex-col justify-between h-full text-white border-l-4 rounded-md border-blue-400 bg-blue-700 hover:border-blue-700 duration-75'>
              <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription className='text-white'>
                  {description}
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Icon
                  icon={icon}
                  width='24'
                  height='24'
                />
              </CardFooter>
            </Card>
          </Link>
        );
      })}
    </div>
  );
};
