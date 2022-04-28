import React from "react";
import TaskComplete from "../../components/assets/svgs/Task Complete.svg";
import TaskInProgress from "../../components/assets/svgs/Task In Progress.svg";
import ActivityChart from "../../components/charts/ActivityChart";
import { useGlobalContext } from "../../store/context";
import { Activity } from "../../types";
import SingleActivity from "../activities/SingleActivity";
import TaskCard from "./TaskCard";

const Dashboard = () => {
  const { completed, inCompleted, filteredActivities } = useGlobalContext();

  const completedState = {
    size: 50,
    progress:
      (completed.length * 100) / filteredActivities.length
        ? Math.floor((completed.length * 100) / filteredActivities.length)
        : 0,
    circleOneStroke: "#d9edfe",
    circleTwoStroke: "#1ec5b2",
    strokeWidth: 4,
  };

  const inProgressState = {
    size: 50,
    progress:
      (inCompleted.length * 100) / filteredActivities.length
        ? Math.floor((inCompleted.length * 100) / filteredActivities.length)
        : 0,
    circleOneStroke: "#d9edfe",
    circleTwoStroke: "#b2b1fe",
    strokeWidth: 4,
  };

  return (
    <div className="dashboard">
      {/* title */}
      <div className="title text-gray-900">Dashboard</div>

      {/* tasks cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1  lg:grid-cols-2 gap-2">
        {/* card one */}
        <TaskCard
          img={TaskComplete}
          noOfTasks={completed.length}
          type="Competed"
          state={completedState}
        />

        {/* card two */}
        <TaskCard
          img={TaskInProgress}
          noOfTasks={inCompleted.length}
          type="Progress"
          state={inProgressState}
        />
      </div>

      {/* activity chart */}
      <div className="w-auto xl:flex justify-center">
        <ActivityChart />
      </div>

      {/* incomplete activities */}
      <div className="mt-5 xl:flex flex-col items-center ">
        <span>Incomplete Activities - {inCompleted.length}</span>
        <div className="mt-2 xl:w-3/4">
          {inCompleted.map(
            (
              inCompletedActivity: Activity,
              inCompletedActivityIndex: number
            ) => (
              <SingleActivity
                key={inCompletedActivityIndex}
                filteredActivity={inCompletedActivity}
              />
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
