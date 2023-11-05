import React from "react";
import PrivateLayout from "../../../layout";
import { Card } from "../../../components";
import { FaUsers, FaUserGraduate } from "react-icons/fa";
import { useMembers } from "../Members/hooks";
import { useYouth } from "../Youth/hooks";

const Dashboard = () => {
  const members = useMembers();
  const youth = useYouth();

  function birthdaysInCurrentMonth(data) {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1; // JavaScript months are 0-based

    const filteredArray = data.filter((item) => {
      const birthDate = new Date(item.date);
      const birthMonth = birthDate.getMonth() + 1; // JavaScript months are 0-based

      return birthMonth === currentMonth;
    });

    return filteredArray;
  }

  const currentMonthBirthdays = birthdaysInCurrentMonth(members);
  console.log(currentMonthBirthdays, "members");

  return (
    <PrivateLayout name="Dashboard" pageTitle="Dashboard">
      <div className="cardFlex">
        <Card
          title="Total Members"
          count={members?.length}
          Icon={FaUsers}
          url="/"
          color="cyan"
        />
        <Card
          title="Total Zonal Youth"
          count={youth?.length}
          Icon={FaUserGraduate}
          url="/"
          color="crimson"
        />
        {/* <Card
          title="Total Categories"
          count={3}
          Icon={FaShapes}
          url="/"
          color="green"
        /> */}
      </div>
    </PrivateLayout>
  );
};

export default Dashboard;
