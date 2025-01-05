import { Icon } from '@iconify/react/dist/iconify.js';

import { DashboardList } from '@/components/DashboardList';
import { dashboardGroups } from '@/data/dashboard-groups';
import { AddSale } from '@/features/sales/components/AddSale';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export const Dashboard = () => {
  return (
    <div className='space-y-8'>
      {dashboardGroups.map((group) => {
        const { groupId, groupName, groupIcon, groupDescription, items } =
          group;

        return (
          <div
            className='pb-12 border-b border-gray-200 space-y-4'
            key={groupId}
          >
            <div className='space-y-2'>
              <div className='flex justify-between items-center'>
                <div className='flex items-center gap-x-2'>
                  <Icon
                    icon={groupIcon}
                    width='36'
                    height='36'
                  />
                  <div className='space-y-0 w-full'>
                    <h1 className='text-md font-black tracking-wide uppercase -mb-1'>
                      {groupName}
                    </h1>
                    <h4 className='text-sm'>{groupDescription}</h4>
                  </div>
                </div>

                {groupName == 'Book keeping' && <AddSale />}
                {groupName == 'Book keeping' && (
                  <Link to='/'>
                    <Button>Add Invoice</Button>
                  </Link>
                )}
              </div>
            </div>
            <section>
              <DashboardList items={items} />
            </section>
          </div>
        );
      })}
    </div>
  );
};
