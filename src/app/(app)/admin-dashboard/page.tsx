"use client";

import React, { useState } from "react";
import STertiaryTabs, { ITabItem } from "@/design-components/STertiaryTabs";
import { faUsers, faBus, faMapMarkedAlt, faChartBar, faClock } from "@fortawesome/free-solid-svg-icons";
import UsersAdminPanel from "@/components/admin/UsersAdminPanel";
import VehiclesAdminPanel from "@/components/admin/VehiclesAdminPanel";
import LocationsRoutesAdminPanel from "@/components/admin/LocationsRoutesAdminPanel";
import StatisticsAdminPanel from "@/components/admin/StatisticsAdminPanel";
import TimetableAdminPanel from "@/components/admin/TimetableAdminPanel";

const AdminDashboard = () => {
  const [selectedTab, setSelectedTab] = useState<number>(0);

  const tabs: ITabItem[] = [
    { index: 0, text: "Users", icon: faUsers },
    { index: 1, text: "Vehicles", icon: faBus },
    { index: 2, text: "Locations & Routes", icon: faMapMarkedAlt },
    { index: 3, text: "Statistics", icon: faChartBar },
    { index: 4, text: "Timetable", icon: faClock },
  ];

  const renderContent = () => {
    switch (selectedTab) {
      case 0:
        return <UsersAdminPanel />;
      case 1:
        return <VehiclesAdminPanel />;
      case 2:
        return <LocationsRoutesAdminPanel />;
      case 3:
        return <StatisticsAdminPanel />;
      case 4:
        return <TimetableAdminPanel />;
      default:
        return null;
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

      {/* Admin Tabs */}
      <STertiaryTabs
        items={tabs}
        selected={selectedTab}
        setSelected={setSelectedTab}
        size="md"
        width="full"
      />

      {/* Dynamic Content Based on Selected Tab */}
      <div className="mt-6">{renderContent()}</div>
    </div>
  );
};

export default AdminDashboard;
