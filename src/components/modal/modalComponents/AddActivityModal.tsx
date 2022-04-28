import React, { useEffect, useState } from "react";
import { MdOutlineCheck } from "react-icons/md";
import { useGlobalContext } from "../../../store/context";
import Calender from "../../calender/Calender";
import ModalHeader from "../../headers/ModalHeader";
import { Activity } from "../../../types";
import dayjs from "dayjs";

const activityLabels: string[] = ["Personal", "School", "Work", "General"];
const AddActivityModal: React.FC = () => {
  const {
    setShowAddActivity,
    selectedDay,
    selectedActivity,
    dispatchCalActivities,
    setSelectedDay,
  } = useGlobalContext();

  // states
  const [title, setTitle] = useState<string>(
    selectedActivity ? selectedActivity?.title : ""
  );
  const [selectedLabel, setSelectedLabel] = useState<string | undefined>(
    activityLabels[0]
  );

  // setting the values of the selected
  useEffect(() => {
    if (selectedActivity) {
      setTitle(selectedActivity?.title);
      setSelectedDay(dayjs(selectedActivity.day));
      setSelectedLabel(
        activityLabels.find(
          (activityLabel: string) => activityLabel === selectedActivity.label
        )
      );
    } else {
      setTitle("");
      setSelectedDay(dayjs());
      setSelectedLabel(activityLabels[0]);
    }
  }, [selectedActivity, setSelectedDay]);

  // functions
  // add activity
  const addActivity = () => {
    // activity object
    const activity: Activity = {
      title,
      day: selectedDay.valueOf(),
      label: selectedLabel!,
      complete: false,
      id: selectedActivity ? selectedActivity.id : Date.now(),
    };

    // add the activity
    if (selectedActivity) {
      // update the selected the activity
      dispatchCalActivities({ type: "UPDATE", payload: activity });
    } else {
      dispatchCalActivities({
        type: "CREATE",
        payload: activity,
      });
    }

    // clean the states and close the modal
    setTitle("");
    setSelectedLabel(activityLabels[0]);
    setShowAddActivity(false);
  };

  return (
    <div>
      {/* header */}
      <ModalHeader close={() => setShowAddActivity(false)} title="Activity" />

      {/* body */}
      <div className="mx-5">
        <div className="">
          {/* the calender */}
          <div className="">
            <span className="text-lg text-gray-400">
              Choose the activity date
            </span>
            <Calender />
          </div>

          {/* the input fields */}

          {/* the activity title input */}
          <div className="ring-1 rounded flex-1 mt-2">
            <input
              type="text"
              placeholder="Enter activity title"
              className="form-control data__input"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              required
            />
          </div>

          {/* the activity tables */}
          <div className="flex gap-x-2 items-center  justify-center mt-2 py-4">
            {activityLabels.map((activityLabel, index) => (
              <div
                key={index}
                onClick={() => setSelectedLabel(activityLabel)}
                className="border flex items-center gap-2  px-3 rounded-full cursor-pointer transition-all duration-[0.5s] hover:border-blue-500 "
              >
                <span className="text-[#6969de]">{activityLabel}</span>
                {selectedLabel === activityLabel && (
                  <div className="border rounded-full bg-blue-100">
                    <MdOutlineCheck className="text-sm text-blue-500" />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* the add btn */}
          <div className="flex justify-center my-4">
            <button
              onClick={addActivity}
              className="ring-1 hover:ring-[#6969de] px-3 py-1 rounded text-gray-400"
            >
              Add Activity
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddActivityModal;
