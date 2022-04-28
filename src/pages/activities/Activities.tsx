import React, { useEffect, useState } from "react";
import { HiPlusSm } from "react-icons/hi";
import ActivityLabels from "../../components/label/ActivityLabels";
import Modal from "../../components/modal/Modal";
import AddActivityModal from "../../components/modal/modalComponents/AddActivityModal";
import { useGlobalContext } from "../../store/context";
import { Activity } from "../../types";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import SingleActivity from "./SingleActivity";

const Activities = () => {
  const {
    showAddActivity,
    setShowAddActivity,
    filteredActivities,
    toggleSidebar,
    openCompleteActivities,
    setOpenCompleteActivities,
    completed,
    inCompleted,
  } = useGlobalContext();

  return (
    <div>
      <header className="flex justify-between items-center">
        <div className="flex flex-col">
          {/* title */}
          <div className="title">Activities</div>
          <span className="text-sm -mt-2 font-semibold">Get Organized</span>
        </div>

        {/* add btn */}
        <button
          onClick={() => setShowAddActivity(true)}
          className="border-2 border-dashed border-[#6969de] hover:border-solid  transition-all duration-[0.5s] flex  px-2 py-1 items-center  rounded-md gap-2 text-gray-900"
        >
          <div className="flex justify-center items-center rounded-md ">
            <HiPlusSm className=" text-lg w-6 h-6" />
          </div>
          <span className="text-lg ">New Activity</span>
        </button>

        {/* the modal */}
        <Modal
          component={<AddActivityModal />}
          modalState={showAddActivity}
          close={() => setShowAddActivity(false)}
          type=""
        />
      </header>

      {/* the body */}
      <div
        className={`mt-4  ${
          toggleSidebar
            ? "sm:flex flex-col"
            : "sm:flex flex-row md:flex-col xl:flex-row"
        }`}
      >
        {/* the tags */}
        <ActivityLabels />

        {/*the activities */}
        <div className=" mt-3 sm:ml-4 md:ml-0 lg:ml-4 flex-1">
          {/* number of activities available */}
          <span className="text-gray-900 text-lg font-bold">
            {inCompleted.length === 0
              ? "Activities"
              : "Activities - " + filteredActivities.length}
          </span>

          <div className="flex flex-col gap-3 divide-y-2 divide-dashed divide-[#6969de]">
            {/* incomplete activities */}
            <div className="h-[280px] flex flex-col gap-2 overflow-y-auto scrollbar-hide">
              {inCompleted.map(
                (filteredActivity: Activity, filteredActivityIndex: number) => (
                  <SingleActivity
                    key={filteredActivityIndex}
                    filteredActivity={filteredActivity}
                  />
                )
              )}
            </div>

            {/* complete activities */}
            <div className="mt-3 py-2">
              <div className="flex gap-3 items-center mb-2">
                <span className="text-gray-900 text-md font-bold">
                  Completed - {completed.length}
                </span>

                <div className="transition-all  duration-[0.5s] ease-linear">
                  {openCompleteActivities ? (
                    <FaAngleUp
                      className="text-[#6969de] w-5 h-5 cursor-pointer "
                      onClick={() => setOpenCompleteActivities(false)}
                    />
                  ) : (
                    <FaAngleDown
                      className="text-[#6969de] w-5 h-5 cursor-pointer"
                      onClick={() => setOpenCompleteActivities(true)}
                    />
                  )}
                </div>
              </div>

              {/* the  activities*/}
              <div
                className={`${
                  openCompleteActivities
                    ? "h-fit flex flex-col gap-2 "
                    : "hidden h-0"
                } transition-all  duration-[0.8s] ease-linear`}
              >
                {completed.map(
                  (
                    completedActivity: Activity,
                    completedActivityIndex: number
                  ) => (
                    <SingleActivity
                      key={completedActivityIndex}
                      filteredActivity={completedActivity}
                    />
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Activities;
