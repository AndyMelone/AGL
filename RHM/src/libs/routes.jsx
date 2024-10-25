import { createBrowserRouter } from "react-router-dom";

// Layouts
import HomeLayout from "../layouts/homelayout";
import EmployeLayout from "../layouts/EmployeLayout";
import RequireAuth from "../layouts/RequireAuth";
import NotRequireAuth from "../layouts/NotRequireAuth";

// Screens
import { Dashboard } from "../screens/Dashboard";
import { EmployeList } from "../screens/employe/Employe_list";
import CreateEmploye from "../screens/employe/Employe_create";

import ViewInformationEmploye from "../screens/employe/ViewInformationEmploye";
import { EmployeTeam } from "../screens/employe/Employe_team";
import { EmployeTask } from "../screens/employe/Employe_task";

import { CreateTeams } from "../screens/employe/CreateTeams";
import EmployeArchive from "../screens/employe/Employe_archive";
import { EmployeTools } from "../screens/employe/Employe_tools";
import { LeaveRequest } from "../screens/leave/LeaveRequest";
import { AbsenceCalendar } from "../screens/leave/AbsenceCalendar";
import { LeaveCalendar } from "../screens/leave/LeaveCalendar";
import { LeaveTracking } from "../screens/leave/LeaveTracking";
import { TimeTracking } from "../screens/time/TimeTracking";
import { Overtime } from "../screens/time/Overtime";
import { Schedule } from "../screens/time/Schedule";
import { Posts } from "../screens/entreprise/Posts";
import CreatePosts from "../screens/entreprise/CreatePosts";
import { Departments } from "../screens/departement/Departments";
import LoginPage from "../screens/auth/LoginPage";
import LoginCompany from "../screens/auth/LoginCompany";
import { PayrollHistory } from "../screens/payroll/PayrollHistory";
import { EmployeCounterLayout } from "../layouts/Employe_counterLayout";
import ListPresence from "../screens/employe/ListPresence";
import RegistrePointage from "../screens/employe/RegistrePointage";
import CounterHours from "../screens/employe/CounterHours";
import TeamLayout from "../layouts/TeamLayout";
import ArchiveLayout from "../layouts/ArchiveLayout";
import LeaveRequestLayout from "../layouts/LeaveRequestLayout";
import PaieFicheLayout from "../layouts/PaieFicheLayout";
import ViewOneEmploye from "../layouts/ViewOneEmploye";
import Not_found from "../screens/Not_found";

export const router = createBrowserRouter([
  {
    element: <NotRequireAuth />,
    children: [
      {
        path: "/auth",
        element: <LoginPage />,
      },
      {
        path: "/auth/company",
        element: <LoginCompany />,
      },
    ],
  },
  {
    element: <RequireAuth />,
    children: [
      {
        element: <HomeLayout />,
        children: [
          {
            path: "/",
            element: <Dashboard />,
          },
          {
            path: "employees/",
            element: <EmployeLayout />,
            children: [
              {
                path: "list",
                element: <EmployeList />,
              },
            ],
          },
          {
            path: "employees/create",
            element: <CreateEmploye />,
          },
          {
            element: <ViewOneEmploye />,
            children: [
              {
                path: "employees/:id",
                element: <ViewInformationEmploye />,
              },
            ],
          },

          {
            element: <TeamLayout />,
            children: [
              { path: "employees/team/create", element: <CreateTeams /> },
            ],
          },
          {
            path: "employees/team/:index",
            element: <EmployeTeam />,
          },
          {
            path: "employees/task",
            element: <EmployeTask />,
          },

          {
            path: "employees/counter",
            element: <EmployeCounterLayout />,
            children: [
              {
                path: "",
                element: <ListPresence />,
              },
              {
                path: "pointage",
                element: <RegistrePointage />,
              },
              {
                path: "compteur-heure",
                element: <CounterHours />,
              },
            ],
          },

          {
            element: <ArchiveLayout />,
            children: [
              {
                path: "employees/archive",
                element: <EmployeArchive />,
              },
            ],
          },
          {
            path: "employees/tools",
            element: <EmployeTools />,
          },
          {
            element: <LeaveRequestLayout />,
            children: [
              {
                path: "absences/leave-request",
                element: <LeaveRequest />,
              },
            ],
          },
          {
            path: "absences/absence-calendar",
            element: <AbsenceCalendar />,
          },
          {
            path: "absences/leave-calendar",
            element: <LeaveCalendar />,
          },
          {
            path: "absences/leave-tracking",
            element: <LeaveTracking />,
          },
          {
            path: "time-management/time-tracking",
            element: <TimeTracking />,
          },
          {
            path: "time-management/overtime",
            element: <Overtime />,
          },
          {
            path: "time-management/schedule",
            element: <Schedule />,
          },
          {
            element: <PaieFicheLayout />,
            children: [
              {
                path: "payroll/statement",
                element: <PayrollHistory />,
              },
            ],
          },
          {
            path: "payroll/benefits",
            element: <p>payrole/benefice</p>,
          },
          {
            path: "payroll/history",
            element: <p>payrole/history</p>,
          },
          {
            path: "company/posts",
            element: <Posts />,
          },
          {
            path: "company/posts/create",
            element: <CreatePosts />,
          },
          {
            path: "company/departments",
            element: <Departments />,
          },
          {
            path: "company/partner",
            element: <p>company/partner</p>,
          },
          {
            path: "company/partner/create",
            element: <p>company/partner/create</p>,
          },
          // other routes error
          {
            path: "*",
            element: <Not_found />,
          },
        ],
      },
    ],
  },
]);
