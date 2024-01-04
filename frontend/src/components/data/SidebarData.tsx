import { AccountBalanceTwoTone, CurrencyExchangeTwoTone, DashboardCustomizeTwoTone, DashboardTwoTone, LogoutTwoTone, SettingsTwoTone, WorkHistoryTwoTone } from "@mui/icons-material";
import { dIcons } from "../sidebar/SidebarStyle";

export const sbList1 = [
   {
      logo: <DashboardTwoTone sx={dIcons} />,
      name: 'Dashboard'
   },
   {
      logo: <AccountBalanceTwoTone sx={dIcons} />,
      name: 'Income'
   },
   {
      logo: <CurrencyExchangeTwoTone sx={dIcons} />,
      name: 'Expenses'
   },
   {
      logo: <WorkHistoryTwoTone sx={dIcons} />,
      name: 'History'
   },
   {
      logo: <DashboardCustomizeTwoTone sx={dIcons} />,
      name: 'Categories'
   },
   {
      logo: <SettingsTwoTone sx={dIcons} />,
      name: 'Settings'
   },
   {
      logo: <LogoutTwoTone sx={dIcons} />,
      name: 'Logout'
   },
]


