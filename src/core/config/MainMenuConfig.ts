const DocMenuConfig = [
  {
    pages: [
      {
        heading: "لوحة تحكم رصيد",
        route: "/dashboard",
        svgIcon: "media/icons/duotune/art/art002.svg",
        fontIcon: "bi-app-indicator",
      },
      {
        header: "معلومه الشركه",
        route: "/companies",
        svgIcon: "media/icons/duotune/finance/fin006.svg",
        fontIcon: "fa fa-industry",
      },
    ],
  },
  
   //companies
   {
    pages: [
      {
        heading: "الموظفين",
          route: "/Employees",
          fontIcon: "fas fa-user-circle 2x",
      },
      {
        heading: "بيانات الشركه",
        route: "/companies",
        fontIcon: "fa fa-industry",
      },
    
    ],
    },
  {
    route: "/branches",
    pages: [
      {
        sectionTitle: "فروع",
        route: "/branches",
        svgIcon: "media/icons/duotune/finance/fin006.svg",
        fontIcon: "fa fa-industry",

        sub: [
          {
            heading: "مفعله",
            route: "/branches/activated",
          },
          {
            heading: "غير مفعله",
            route: "/branches/deactivated",
          },
        ],
      },
    ],
  },
  {
    pages: [
      {
        heading: "حسابات نقاط البيع",
          route: "/PosUsers",
          fontIcon: "fa fa-users",
      },
    
    ],
    },

  {
    route: "/transactions",
    pages: [
      {
        sectionTitle: "المعاملات",
        route: "/transactions",
        svgIcon: "media/icons/duotune/finance/fin006.svg",
        fontIcon: "fas fa-exchange-alt",

        sub: [
          {
            heading: "المعاملات الناجحة",
            route: "/transactions/successful-transactions",
          },
          {
            heading: "المعاملات الفاشلة",
            route: "/transactions/failed-transactions",
          },
        ],
      },
    ],
  },
  
];

export default DocMenuConfig;
