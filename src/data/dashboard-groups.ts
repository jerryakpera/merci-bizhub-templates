export type DashboardGroupItem = {
  id: number;
  icon: string;
  link: string;
  title: string;
  description: string;
};

export type DashboardGroup = {
  groupId: number;
  groupName: string;
  groupIcon: string;
  groupColor: string;
  groupDescription: string;
  items: DashboardGroupItem[];
};

export const dashboardGroups = [
  {
    groupId: 1,
    groupName: 'Generate Documents',
    groupDescription: 'Generate court documents from templates',
    groupIcon: 'ph:files-light',
    groupColor: 'pink',
    items: [
      {
        id: 1,
        title: 'Wrong Transfer',
        icon: 'solar:dollar-bold',
        link: '/wrong-transfer',
        description:
          'Generates affidavit and/or court order for reversal of a wrong transfer.',
      },
      {
        id: 2,
        title: 'Affidavit',
        icon: 'octicon:law-24',
        link: '/affidavit',
        description: 'Generates court affidavit for different scenarios.',
      },
    ],
  },
  {
    groupId: 2,
    groupName: 'Book keeping',
    groupDescription: 'Manage sales records',
    groupIcon: 'ph:hand-coins-light',
    groupColor: 'blue',
    items: [
      {
        id: 3,
        title: 'Today',
        icon: 'ic:round-today',
        link: '/sales/today',
        description: 'Manage/View sales for today.',
      },
      {
        id: 5,
        title: 'View all sales',
        icon: 'vaadin:records',
        link: '/sales',
        description: 'View all purchase records.',
      },
      {
        id: 6,
        title: 'Outstanding Payments',
        icon: 'ic:baseline-plus-minus',
        link: '/outstanding-payments',
        description: 'View all outstanding payments.',
      },
    ],
  },
  {
    groupId: 3,
    groupName: 'Inventory Manavement',
    groupDescription: 'Manage inventory purchase records',
    groupIcon: 'mage:basket',
    groupColor: 'green',
    items: [
      {
        id: 7,
        title: 'View all',
        icon: 'material-symbols-light:inventory-rounded',
        link: '/inventory/records',
        description: 'View all inventory records.',
      },
      {
        id: 10,
        title: 'Add Purchase',
        icon: 'mdi:cart',
        link: '/inventory/add-purchase',
        description: 'Add a new purchase to the inventory records.',
      },
      {
        id: 8,
        title: 'Products Price List',
        icon: 'solar:tag-price-bold',
        link: '/products',
        description: 'View prices of all services/products.',
      },
      {
        id: 9,
        title: 'Inventory Price List',
        icon: 'lsicon:goods-outline',
        link: '/inventory/inventory-price-list',
        description: 'View the prices of inventory goods.',
      },
    ],
  },
];
