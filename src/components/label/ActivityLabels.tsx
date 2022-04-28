import React from "react";
import { useGlobalContext } from "../../store/context";
import { ActivityLabel } from "../../types";

const ActivityLabels = () => {
  const { activityLabels, updateActivityLabels, toggleSidebar } =
    useGlobalContext();
  return (
    <div
      className={`grid  gap-3  transition-all duration-[0.1s] w-fit ${
        toggleSidebar
          ? "grid-cols-3"
          : "grid-cols-4 sm:flex flex-col md:grid md:grid-cols-3 lg:flex lg:flex-row xl:flex-col"
      }`}
    >
      {activityLabels.map(
        (activityLabel: ActivityLabel, activityLabelIndex: number) => (
          <div
            className="form-check border px-2 rounded-full transition-all duration-[0.1s] flex w-fit  items-center"
            key={activityLabelIndex}
          >
            {/* the check box */}
            <input
              checked={activityLabel.checked}
              onChange={() =>
                updateActivityLabels({
                  label: activityLabel.label,
                  checked: !activityLabel.checked,
                })
              }
              className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm  checked:bg-[#6969de] checked:border-[#6969de] focus:outline-none transition-all duration-200 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
              type="checkbox"
              value=""
              id="flexCheckChecked"
            />

            {/* the label */}
            <label className="form-check-label inline-block text-gray-800">
              {activityLabel.label}
            </label>
          </div>
        )
      )}
    </div>
  );
};

export default ActivityLabels;
